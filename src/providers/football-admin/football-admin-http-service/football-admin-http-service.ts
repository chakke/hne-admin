import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpService, ParamBuilder } from '../../http-service';
import { ToastController, Toast } from 'ionic-angular';
import { AssetsUrl, FakeAPIUrl, APIUrl, ResponseCode, ParamsKey } from '../app-constant';
import 'rxjs/Rx';
@Injectable()
export class FootballAdminHttpServiceProvider {
  serviceUrl = "http://125.212.192.94:8080/bistro_app/ws";
  toast: Toast = null;
  isUseFakeData = true;
  constructor(public httpService: HttpService) {
    console.log('Hello FootballAdminHttpServiceProvider Provider');
  }

  requestGet(url: string, param: string) {
    return this.httpService.requestGet(url, param).catch(error => {
      console.log("Error in http request GET " + url, error.status);
      // if (error.status == 0) {
      //   if (!this.toast) {
      //     this.toast = this.toastCtrl.create({
      //       message: "No internet connection!",
      //       position: "top"
      //     })
      //     this.toast.present();
      //     setTimeout(() => {
      //       if (this.toast)
      //         this.toast.dismiss();
      //       this.toast = null;
      //     }, 2000)
      //   }
      // }
    });
  }

  requestPost(url: string, param: string) {
    return this.httpService.requestPost(url, param).catch(error => {
      console.log("Error in http request POST " + url, error.status);
      // if (error.status == 0) {
      //   if (!this.toast) {
      //     this.toast = this.toastCtrl.create({
      //       message: "No internet connection!",
      //       position: "top"
      //     })
      //     this.toast.present();
      //     setTimeout(() => {
      //       if (this.toast)
      //         this.toast.dismiss();
      //       this.toast = null;
      //     }, 2000)
      //   }
      // }
    });;
  }

  //Lấy danh sách các tỉnh trong cả nước
  getProvince() {
    if (this.isUseFakeData) return this.requestGet(AssetsUrl.BASE_URL + FakeAPIUrl.PROVINCE, "");
    return this.requestGet(this.serviceUrl + APIUrl.PROVINCE, "");
  }

}
