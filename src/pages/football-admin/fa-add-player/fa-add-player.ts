import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { STATUS, FunctionButtonName } from '../../../providers/football-admin/app-constant';
import { AppControllerProvider } from '../../../providers/football-admin/app-controller/app-controller';
import { AlertControllerProvider } from '../../../providers/football-admin/alert-controller/alert-controller';
import { Player } from '../../../providers/football-admin/interface/player';

@IonicPage()
@Component({
  selector: 'page-fa-add-player',
  templateUrl: 'fa-add-player.html',
})

export class FaAddPlayerPage {
  player: Player;
  selectedStatus: any;
  descriptionEditor: any;
  isBlockedRequest: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private appController: AppControllerProvider,
    private alertController: AlertControllerProvider,
    private viewController: ViewController) {
    this.player = {
      id: "",
      avatar: "",
      birthDay: new Date(),
      name: "",
      phone: "",
      position: "",
      province: "",
      shirtNumber: "",
      specialName: "",
      currentClub: ""
    }
    if (this.navParams.get("clubId")) {
      this.player.currentClub = this.navParams.get("clubId");
    } else {
      this.isBlockedRequest = true;
      this.alertController.showAlert('danger', "Đã có lỗi xảy ra. Vui lòng thử lại sau");
    }
  }

  ionViewDidLoad() {
  }


  ionViewWillLeave() {
    this.alertController.clearAllAlert();
  }

  functionButtonClick(button: string) {
    if (button == FunctionButtonName.BUTTON_CHECK) {
      this.save();
    }
    if (button == FunctionButtonName.BUTTON_REMOVE) {
      this.viewController.dismiss();
    }
  }

  save() {
    if (this.isBlockedRequest) return;
    this.isBlockedRequest = true;
    console.log("save", this.player);
    this.appController.addPlayer(this.player).then(playerId => { 
      this.isBlockedRequest = false;
      this.viewController.dismiss({
        id: playerId,
        avatar: this.player.avatar,
        name: this.player.name,
        shirtNumber: this.player.shirtNumber,
        specialName: this.player.specialName
      })
    }, error => {
      this.alertController.showAlert("danger", "Thêm cầu thủ thất bại, vui lòng thử lại sau", true);
      this.isBlockedRequest = false;
    });
  }

  imageChange(event) {
    this.player.avatar = event;
  }

}
