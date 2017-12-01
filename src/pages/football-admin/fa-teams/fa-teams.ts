import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FunctionButtonName } from '../../../providers/football-admin/app-constant';
import { AppControllerProvider } from '../../../providers/football-admin/app-controller/app-controller';
import { Team } from '../../../providers/football-admin/interface/team';
import { AlertControllerProvider } from '../../../providers/football-admin/alert-controller/alert-controller';

@IonicPage()
@Component({
  selector: 'page-fa-teams',
  templateUrl: 'fa-teams.html',
})
export class FaTeamsPage {
  teams: Array<Team>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appController: AppControllerProvider,
    public alertController: AlertControllerProvider) {
    this.appController.getListTeam().then(data => {
      this.teams = data;
    }, error => {
      this.alertController.showAlert("danger", "Không lấy được dữ liệu, vui lòng thử lại sau");
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaTeamsPage');
  }


  functionButtonClick(button: string) {
    if (button == FunctionButtonName.BUTTON_ADD) {
      this.appController.pushPage("FaAddNewPage");
    }
  }

}
