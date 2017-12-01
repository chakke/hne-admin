import { Component, ViewChild, ElementRef, transition } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Article } from '../../../providers/football-admin/interface/article';
import { STATUS, FunctionButtonName } from '../../../providers/football-admin/app-constant';
import { AppControllerProvider } from '../../../providers/football-admin/app-controller/app-controller';
import { AlertControllerProvider } from '../../../providers/football-admin/alert-controller/alert-controller';

declare var CKEDITOR: any;
declare var ClassicEditor: any;

@IonicPage({
  segment: "fa-new-detail/:id",
  name: "fa-new-detail"
})
@Component({
  selector: 'page-fa-new-detail',
  templateUrl: 'fa-new-detail.html',
})
export class FaNewDetailPage {
  article: Article;
  selectedStatus = 1;
  isBlockedRequest: boolean = true;
  statusData = [];

  contentEditor: any;
  descriptionEditor: any;
  @ViewChild("articleDesc") articleDesc: ElementRef;
  @ViewChild("articleContent") articleContent: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    public alertController: AlertControllerProvider,
  ) {
    this.article = {
      id: "",
      title: "",
      image: "",
      description: "",
      location: "",
      content: ``,
      time: new Date(),
      status: STATUS.ACTIVE,
      category: "hanoi-eleven-2017",
      league: "hanoi-eleven-2017"
    }

    for (const key in STATUS) {
      if (STATUS.hasOwnProperty(key)) {
        this.statusData.push(STATUS[key]);
      }
    }
    if (this.statusData.length > 0)
      this.selectedStatus = this.statusData[0].id;

    if (this.navParams.get("id")) {
      this.appController.getArticleById(this.navParams.get("id")).then(data => {
        this.isBlockedRequest = false;
        this.article = data;
        this.selectedStatus = this.article.status.id;
        console.log("this article", this.article);

        //Ckeditor
        setTimeout(() => {
          if (this.articleDesc)
            ClassicEditor
              .create(this.articleDesc.nativeElement)
              .then(editor => {
                this.descriptionEditor = editor;
              })
              .catch(error => {
                console.error(error);
              });

          if (this.articleContent) {
            this.contentEditor = CKEDITOR.replace(this.articleContent.nativeElement, {
              filebrowserBrowseUrl: 'assets/test.html',
              filebrowserWindowWidth: 800,
              filebrowserWindowHeight: 500
            });
          }
        }, 100)

      }, error => {
        console.log(error);
        this.isBlockedRequest = true;
        this.alertController.showAlert("danger", "Không tìm thấy bài viết. Vui lòng thử lại sau!", true);
      });
    } else {
      console.log("Không tìm thấy id");
      this.isBlockedRequest = true;
      this.alertController.showAlert("danger", "Không tìm thấy bài viết. Vui lòng thử lại sau!", true);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaNewDetailPage');
  }

  ionViewDidEnter() {

  }


  functionButtonClick(button: string) {
    if (button == FunctionButtonName.BUTTON_CHECK) {
      this.article.description = this.descriptionEditor.getData();
      this.article.content = this.contentEditor.getData();
      this.save();
    }
    if (button == FunctionButtonName.BUTTON_REMOVE) {
      this.gotoListNewsPage();
    }
  }

  save() {
    console.log("save", this.article);
    if (this.isBlockedRequest) return;
    this.isBlockedRequest = true;
    this.appController.updateArticle(this.article).then(() => {
      this.alertController.showAlert("success", "Chỉnh sửa bài viết thành công");
    }, error => {
      this.alertController.showAlert("danger", "Chỉnh sửa bài viết thất bại");
    });
  }

  imageChange(event) {
    this.article.image = event;
    console.log("image change", this.article.image);
  }

  gotoListNewsPage() {
    this.appController.setRootPage("FaNewsPage");
  }

  statusChange() {
    this.article.status = this.appController.getStatusById(this.selectedStatus);
  }
}
