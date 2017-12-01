import { Component, ViewChild, ElementRef, transition } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { STATUS, FunctionButtonName } from '../../../providers/football-admin/app-constant';
import { AppControllerProvider } from '../../../providers/football-admin/app-controller/app-controller';
import { AlertControllerProvider } from '../../../providers/football-admin/alert-controller/alert-controller';
import { Team } from '../../../providers/football-admin/interface/team';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

declare var CKEDITOR: any;
declare var ClassicEditor: any;

@IonicPage(
  {
    segment: "fa-team-detail/:id",
    name: "fa-team-detail"
  }
)
@Component({
  selector: 'page-fa-team-detail',
  templateUrl: 'fa-team-detail.html',
})
export class FaTeamDetailPage {

  team: Team;
  isBlockedRequest: boolean = true;

  sloganEditor: any;
  @ViewChild("teamSlogan") teamSlogan: ElementRef;
  @ViewChild("articleContent") articleContent: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    public alertController: AlertControllerProvider,
    public modalController: ModalController
  ) {
    this.team = {
      id: "",
      name: "",
      logo: "",
      players: [],
      slogan: ""
    }

    if (this.navParams.get("id")) {
      this.appController.getTeamById(this.navParams.get("id")).then(data => {
        this.isBlockedRequest = false;
        this.team = data;
        console.log("this team", this.team);

        //Ckeditor
        setTimeout(() => {
          if (this.teamSlogan)
            ClassicEditor
              .create(this.teamSlogan.nativeElement)
              .then(editor => {
                this.sloganEditor = editor;
              })
              .catch(error => {
                console.error(error);
              });
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
      this.team.slogan = this.sloganEditor.getData();
      this.save();
    }
    if (button == FunctionButtonName.BUTTON_REMOVE) {
      this.gotoListTeamsPage();
    }
  }

  save() {
    console.log("save", this.team);
    if (this.isBlockedRequest) return;
    this.isBlockedRequest = true;
    // this.appController.updateArticle(this.article).then(() => {
    //   this.alertController.showAlert("success", "Chỉnh sửa bài viết thành công");
    // }, error => {
    //   this.alertController.showAlert("danger", "Chỉnh sửa bài viết thất bại");
    // });
  }

  imageChange(event) {
    this.team.logo = event;
    console.log("image change", this.team.logo);
  }

  gotoListTeamsPage() {
    this.appController.setRootPage("FaTeamsPage");
  }

  addPlayer() {
    if (this.isBlockedRequest) return;
    let modal = this.modalController.create("FaAddPlayerPage", { clubId: this.team.id });
    modal.present();
    modal.onDidDismiss(player => {
      if (player) {
        console.log("add player to team", player);
        this.team.players.push(player);
        this.appController.updateTeamPlayers(this.team.id, this.team.players).then(success => {
          this.alertController.showAlert("success", "Thêm cầu thủ thành công");
        }, error => {
          this.alertController.showAlert("fail", "Thêm cầu thủ thất bại. Vui lòng thử lại sau");
          console.log("error", error);
        });
      }
    })
  }
}
