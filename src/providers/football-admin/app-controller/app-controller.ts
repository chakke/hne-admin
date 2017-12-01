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
import { Team } from '../interface/team';
import { Player } from '../interface/player';
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

  updateArticle(article: Article): Promise<any> {
    return this.firebaseService.updateArticle(article.id, article);
  }

  deleteArticle(id: string): Promise<any> {
    return this.firebaseService.deleteArticle(id);
  }

  getListArticle(): Promise<Array<Article>> {
    return this.firebaseService.getListArticle().then(data => {
      let result = [];
      data.forEach(element => {
        let article: Article = {
          id: element.id,
          title: element.title,
          description: element.description,
          time: element.time,
          image: element.image,
          status: this.getStatusById(element.status),
          category: element.category,
          league: element.league,
          content: element.content,
          location: element.location
        }
        result.push(article);
      });
      return result;
    })
  }
  getListTeam(): Promise<Array<Team>> {
    return this.firebaseService.getListTeam();
  }

  getTeamById(id: string): Promise<Team> {
    return this.firebaseService.getTeamById(id).then(data => {
      let players = [];
      if (data.players) {
        data.players.forEach(element => {
          let player: Player = {
            id: element.id,
            avatar: element.avatar,
            birthDay: undefined,
            name: element.name,
            phone: undefined,
            position: undefined,
            province: undefined,
            currentClub: data.id,
            shirtNumber: element.shirt_number,
            specialName: element.special_name
          }
          players.push(player);
        });
      }
      return {
        id: data.id,
        name: data.name,
        logo: data.logo,
        slogan: data.slogan,
        players: players
      }
    });
  }

  addPlayer(player: Player):Promise<any>{
    return this.firebaseService.addPlayer(player);
  }

  updateTeamPlayers(teamId: string, players:Array<Player>):Promise<any>{
    return this.firebaseService.updateTeamPlayers(teamId, players);
  }
}
