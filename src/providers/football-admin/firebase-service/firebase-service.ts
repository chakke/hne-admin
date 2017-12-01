import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { Observable } from 'rxjs/Observable';
import { Article } from '../interface/article';
import { FIREBASE_PATH, STATUS } from '../app-constant';
import { ProgressControllerProvider } from "../progress-controller/progress-controller";

@Injectable()
export class FirebaseServiceProvider {
  db: firebase.firestore.Firestore;
  isUseFakeData = false;
  constructor(
    private progressController: ProgressControllerProvider
  ) {
    firebase.initializeApp({
      apiKey: "AIzaSyDS7GwPDhNMWc526MO6hpb76e1JQlwHA0w",
      authDomain: "hanoi-elevencup.firebaseapp.com",
      databaseURL: "https://hanoi-elevencup.firebaseio.com",
      projectId: "hanoi-elevencup",
      storageBucket: "hanoi-elevencup.appspot.com",
      messagingSenderId: "512334812593"
    });
    this.db = firebase.firestore();
  }

  getNewId(type: string): string {
    return type + Date.now();
  }

  getNewArticleId() {
    this.db.collection("").onSnapshot(observer => {

    })
    return this.getNewId("news");
  }

  addDocument(collection: string, documentId: string, value: any): Promise<any> {
    this.progressController.add();
    return this.db.collection(collection).doc(documentId).set(value).then(success => {
      this.progressController.subtract();
    }, error => {
      this.progressController.subtract();
    })
  }

  getDocument(path: string): Promise<any> {
    console.log("firebase get document", path);
    this.progressController.add();
    return new Promise((resolve, reject) => {
      this.db.doc(path).get().then(success => {
        console.log("get succsess", success);
        if (success.exists) {
          let result = success.data();
          result.id = success.id;
          resolve(result);
        } else {
          reject("Bản ghi không tồn tại");
        }
        this.progressController.subtract();
      }, error => {
        this.progressController.subtract();
        console.log("get fail", error);
        reject(error);
      })
    })
  }

  updateDocument(path: string, data: any): Promise<any> {
    console.log("firebase update document", path);
    this.progressController.add();
    return new Promise((resolve, reject) => {
      this.db.doc(path).update(data).then(success => {
        console.log("update succsess", success);
        resolve();
        this.progressController.subtract();
      }, error => {
        this.progressController.subtract();
        console.log("update fail", error);
        reject();
      })
    })
  }


  addArticle(article: Article): Promise<any> {
    return this.addDocument(FIREBASE_PATH.NEW, this.getNewArticleId(), {
      author: "admin tool",
      title: article.title,
      content: article.content,
      description: article.description,
      location: article.location,
      image: article.image,
      time: article.time,
      status: article.status.id,
      league: "hano-eleven-2017",
      category: "hano-eleven-2017"
    });
  }

  getArticle(id: string): Promise<any> {
    if (this.isUseFakeData) return Promise.resolve({
      id: 1,
      author: "admin tool",
      category: "hanoi-eleven-2017",
      title: "Cập nhật kết quả vòng 3 HanoiElevenCup 2016 - lần 1",
      image: "http://www.hanoielevencup.com/uploads/news/10/KetquaV3.jpg",
      description: "Vòng 3 của HanoiElevenCup 2016 chứng kiến những bất ngờ lớn của giải đấu. VLC FC, B-Gate FC được đánh giá là cửa dưới nhưng cả hai đều có những chiến thắng trước các đối thủ đàn anh Phú Đô FC và Bình Minh FC...",
      location: "Sân ACB Mỹ Đình - Hà Nội",
      content: `<p font-size:="" myriad="" pro="" style="box-sizing: border-box; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: " text-align:="">
      <span style="box-sizing: border-box; margin: 0px; padding: 0px; font-weight: 700;">CẬP NHẬT KẾT QU&Agrave; V&Ograve;NG 3 HANOIELEVENCUP 2016 - LẦN 1</span></p>
    <p font-size:="" myriad="" pro="" style="box-sizing: border-box; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: " text-align:="">
      &nbsp;</p>
    <p font-size:="" myriad="" pro="" style="box-sizing: border-box; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: " text-align:="">
      <span style="color:#ffa500;"><span style="box-sizing: border-box; margin: 0px; padding: 0px; font-weight: 700;"><span style="box-sizing: border-box; margin: 0px; padding: 0px;">B-GATE FC vs B&igrave;nh Minh FC (1-0</span></span></span></p>
    <p font-size:="" myriad="" pro="" style="box-sizing: border-box; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: " text-align:="">
      <span style="color:#ffa500;"><span style="box-sizing: border-box; margin: 0px; padding: 0px; font-weight: 700;"><span style="box-sizing: border-box; margin: 0px; padding: 0px;">Ph&uacute; Đ&ocirc; FC vs VLCC (0-2)</span></span></span></p>
    <p font-size:="" myriad="" pro="" style="box-sizing: border-box; margin: 0px 0px 10px; padding: 0px; color: rgb(51, 51, 51); font-family: " text-align:="">
      <span style="color:#ffa500;"><span style="box-sizing: border-box; margin: 0px; padding: 0px; font-weight: 700;"><span style="box-sizing: border-box; margin: 0px; padding: 0px;">Hải Anh FC vs MenU FC(1-0)</span></span></span></p>
    `,
      time: new Date(),
      status: 1,
      league: "hanoi-eleven-2017"
    })
    return this.getDocument(FIREBASE_PATH.NEW + "/" + id);
  }

  updateArticle(id: string, article: Article): Promise<any> {
    return this.updateDocument(FIREBASE_PATH.NEW + "/" + id, {
      title: article.title,
      author: "admin tool",
      category: article.category,
      content: article.content,
      description: article.description,
      image: article.image,
      league: article.league,
      location: article.location,
      status: article.status.id,
      time: article.time
    });
  }
}
