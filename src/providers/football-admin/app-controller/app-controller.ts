import { Injectable } from '@angular/core';

import { ResourceLoader } from '../../resource-loader/resource-loader';
import { ProvinceControllerProvider } from '../province-controller/province-controller';
import { FootballAdminHttpServiceProvider } from "../football-admin-http-service/football-admin-http-service";
import { FirebaseServiceProvider } from "../firebase-service/firebase-service";

import { AssetsUrl, STATUS } from '../app-constant';

import { Config } from '../classes/config';

import { Toast, ToastController, App } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Article } from '../interface/article';
import { Status } from '../interface/status';
@Injectable()
export class AppControllerProvider {

  private toast: Toast;
  private resourceLoader: ResourceLoader;
  private menuItemChangeHandler: any;
  private menuItems = [];
  private config: Config;

  constructor(
    private toastCtrl: ToastController,
    private app: App,
    private provinceController: ProvinceControllerProvider,
    private httpService: FootballAdminHttpServiceProvider,
    private firebaseService: FirebaseServiceProvider) {
    this.resourceLoader = new ResourceLoader();
    this.config = new Config();
    this.loadConfig().then(() => {
      this.menuItems = this.config.getData(["menu-items"]);
      if (this.menuItemChangeHandler) {
        this.menuItemChangeHandler(this.menuItems);
      }
      this.loadProvince();
    });
  }

  loadConfig() {
    return new Promise((resolve, reject) => {
      if (this.config.hasData()) {
        resolve();
      } else {
        this.httpService.requestGet(AssetsUrl.CONFIG, "").then(
          data => {
            this.config.onResponseConfig(data);
            resolve();
          }
        );
      }
    });
  }

  getAppConfig() {
    return this.config;
  }

  getMenuItems() {
    return this.menuItems;
  }

  onMenuItemChange(handler) {
    this.menuItemChangeHandler = handler;
  }

  setRootPage(page: any, param?: any) {
    if (page && page != "") {
      let activeIndex = this.menuItems.findIndex(elm => {
        return elm.active;
      })
      if (activeIndex > -1) {
        if (this.menuItems[activeIndex].page == page) {
          return;
        } else {
          this.menuItems[activeIndex].active = false;
        }
      }
      this.app.getActiveNav().setRoot(page, param);
      for (let item of this.menuItems) {
        if (item.page == page) item.active = true;
      }

    }
  }

  pushPage(page: any, param?: any) {
    if (page && page != "") {
      this.app.getActiveNav().push(page, param);
      for (let item of this.menuItems) {
        item.active = false;
        if (item.page == page) item.active = true;
      }
    }
  }

  setActivePage(page: any) {
    if (page && page != "") {
      let activeIndex = this.menuItems.findIndex(elm => {
        return elm.active;
      })
      if (activeIndex > -1) {
        if (this.menuItems[activeIndex].page == page || this.menuItems[activeIndex].link == page) {
          return;
        } else {
          this.menuItems[activeIndex].active = false;
        }
      }
      for (let item of this.menuItems) {
        if (item.page == page || item.link == page) {
          item.active = true;
        }
      }
    }
  }

  loadProvince() {
    this.httpService.getProvince().then(data => {
      if (data && data.content)
        this.provinceController.updateData(data.content);
    })
  }

  getProvincecontroller() {
    return this.provinceController;
  }

  getStatusById(id: number): Status {
    Object.keys(STATUS)
    for (let i = 0; i < Object.keys(STATUS).length; i++) {
      let key = Object.keys(STATUS)[i];
      if (STATUS.hasOwnProperty(key) && STATUS[key].id == id)
        return STATUS[key];
    }
  }

  addArticle(article: Article): Promise<any> {
    return this.firebaseService.addArticle(article);
  }


  getArticleById(id: string): Promise<Article> {
    return this.firebaseService.getArticle(id).then(res => {
      console.log("res", res);
      return {
        id: res.id,
        title: res.title,
        image: res.image,
        description: `${res.description}`,
        content: `${res.content}`,
        time: res.time,
        location: res.location,
        status: this.getStatusById(res.status),
        league: res.league,
        category: res.category
      }
    })
  }

  updateArticle(article: Article): Promise<any>{
    return this.firebaseService.updateArticle(article.id, article);
  }
}
