import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Article } from '../../../providers/football-admin/interface/article';
import { STATUS, PAGE_CLASS, FunctionButtonName } from '../../../providers/football-admin/app-constant';
import { AppControllerProvider } from '../../../providers/football-admin/app-controller/app-controller';
import { AlertControllerProvider } from '../../../providers/football-admin/alert-controller/alert-controller';


@IonicPage()
@Component({
  selector: 'page-fa-news',
  templateUrl: 'fa-news.html',
})
export class FaNewsPage {

  articles: Array<Article>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    private alertController: AlertControllerProvider,
    private ionicAlert: AlertController) {
    this.appController.getListArticle().then(data => {
      this.articles = data;
      console.log(this.articles);
    }, error => {
      this.alertController.showAlert("danger", "Không thể lấy dữ liệu, vui lòng thử lại sau");
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaNewsPage');
  }

  delete(article: Article) {
    let alert = this.ionicAlert.create({
      message: "Bạn có chắc chắn muốn xóa bài viết? Hành động này không thể khôi phục. Nếu muốn ẩn bài viết bạn có thể chuyển trạng thái về Khóa.",
      buttons: [{
        text: "Cancel",
        role: "cancel"
      },
      {
        text: "Xóa",
        handler: () => {
          this.appController.deleteArticle(article.id).then((success) => {
            this.alertController.showAlert("success", "Xóa bài viết thành công");
            let index = this.articles.findIndex(elm => {
              return elm.id == article.id;
            })
            if (index > -1) {
              this.articles.splice(index, 1);
            }
          }, (error) => {
            this.alertController.showAlert("fail", "Xóa bài viết thất bại. Vui lòng thử lại sau");
          });
        }
      }]
    })
    alert.present();
  }

  gotoNewDetail(id: string) {
    this.appController.pushPage(PAGE_CLASS.ARTICLE_DETAIL, { id: id });
  }

  functionButtonClick(button: string) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("FaAddNewPage");
    }
  }

}
