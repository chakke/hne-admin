import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Article } from '../../../providers/football-admin/interface/article';
import { STATUS, FunctionButtonName } from '../../../providers/football-admin/app-constant';
import { AppControllerProvider } from '../../../providers/football-admin/app-controller/app-controller';
import { AlertControllerProvider } from '../../../providers/football-admin/alert-controller/alert-controller';


declare var CKEDITOR: any;
declare var ClassicEditor: any;
@IonicPage()
@Component({
  selector: 'page-fa-add-new',
  templateUrl: 'fa-add-new.html',
})
export class FaAddNewPage {

  statusData = [];
  article: Article;
  selectedStatus: any;
  descriptionEditor: any;
  isBlockedRequest: boolean = false;

  @ViewChild("articleDesc") articleDesc: ElementRef;
  @ViewChild("articleContent") articleContent: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private alertController: AlertControllerProvider) {
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
        const element = STATUS[key];
        this.statusData.push({ key: key, value: STATUS[key].title });
      }
    }
    if (this.statusData.length > 0)
      this.selectedStatus = this.statusData[0].key;
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    if (this.articleDesc)
      ClassicEditor
        .create(this.articleDesc.nativeElement)
        .then(editor => {
          this.descriptionEditor = editor;
        })
        .catch(error => {
          console.error(error);
        });
    if (this.articleContent)
      CKEDITOR.replace(this.articleContent.nativeElement, {
        filebrowserBrowseUrl: 'assets/test.html',
        filebrowserWindowWidth: 800,
        filebrowserWindowHeight: 500
      });
  }

  ionViewWillLeave(){
    this.alertController.clearAllAlert();
  }

  functionButtonClick(button: string) {
    if (button == FunctionButtonName.BUTTON_CHECK) {
      this.article.description = this.descriptionEditor.getData();
      this.article.content = CKEDITOR.instances["article-content"].getData();
      this.save();
    }
    if(button ==  FunctionButtonName.BUTTON_REMOVE){
      this.appController.setRootPage("FaNewsPage");
    }
  }

  save() {
    if (this.isBlockedRequest) return;
    this.isBlockedRequest = true;
    this.appController.addArticle(this.article).then(success => {
      this.alertController.showAlert("success", "Thêm bài viết thành công", true);
      this.isBlockedRequest = false;
    }, error => {
      this.alertController.showAlert("danger", "Thêm bài viết thất bại, vui lòng thử lại sau", true);
      this.isBlockedRequest = false;
    });
  }

  imageChange(event) {
    this.article.image = event;
  }

  statusChange(event) {
    this.article.status = STATUS[this.selectedStatus];
  }

}
