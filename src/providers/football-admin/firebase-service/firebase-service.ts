import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { Observable } from 'rxjs/Observable';
import { Article } from '../interface/article';
import { FIREBASE_PATH, STATUS } from '../app-constant';
import { ProgressControllerProvider } from "../progress-controller/progress-controller";
import { Player } from '../interface/player';

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
    return this.getNewId("new");
  }

  getNewPlayerId() {
    return this.getNewId("player");
  }

  addDocument(collection: string, documentId: string, value: any): Promise<any> {
    console.log("firebase add document", collection, documentId);
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
        console.log("get document succsess", success.data());
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

  deleteDocument(path: string): Promise<any> {
    console.log("firebase delete document", path);
    this.progressController.add();
    return new Promise((resolve, reject) => {
      this.db.doc(path).delete().then(success => {
        console.log("delete succsess", success);
        resolve();
        this.progressController.subtract();
      }, error => {
        this.progressController.subtract();
        console.log("delete fail", error);
        reject();
      })
    })
  }


  getCollection(path: string) {
    console.log("firebase get collection", path);
    this.progressController.add();
    return new Promise((resolve, reject) => {
      this.db.collection(path).get().then(querySnapshot => {
        console.log("firebase get collection success", querySnapshot);
        let result = [];
        querySnapshot.forEach(doc => {
          let element = doc.data();
          element.id = doc.id;
          result.push(element);
        })
        this.progressController.subtract();
        resolve(result);
      }, error => {
        this.progressController.subtract();
        console.log("get collection fail", error);
        reject(error);
      })
    })
  }


  addArticle(article: Article): Promise<any> {
    console.log("fuck yeah");
    if (this.isUseFakeData) return Promise.resolve();
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

  deleteArticle(id: string): Promise<any> {
    return this.deleteDocument(FIREBASE_PATH.NEW + "/" + id);
  }

  getListArticle(): Promise<any> {
    if (this.isUseFakeData) return Promise.resolve([
      {
        id: "1",
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
        category: "hanoi-eleven-2017",
        league: "hanoi-eleven-2017"
      },

      {
        id: "2",
        title: "Thông báo khai mạc giải HanoiElevenCup 2016 - lần 1",
        image: "http://www.hanoielevencup.com/uploads/news/8/backdrop_hnelevencup.jpg",
        description: "Chiều ngày 11/12, giải bóng đá phong trao HanoiElvenCup 2016 - lần 1 sẽ chính thức được diễn ra tại.....",
        location: "Sân ABC - Mỹ Đình - Hà Nội",
        content: `<p style="text-align: center;">
        <strong>TH&Ocirc;NG B&Aacute;O KHAI MẠC GIẢI HANOIELVENCUP 2016 -LẦN 1</strong></p>
      <p style="text-align: justify;">
        Chiều ng&agrave;y 11/12, tại s&acirc;n b&oacute;ng ACB giải b&oacute;ng đ&aacute; phong tr&agrave;o HanoiElvenCup 2016 - lần 1 sẽ ch&iacute;nh thức được diễn.</p>
      <p style="text-align: justify;">
        Như vậy, sau bao nhi&ecirc;u ng&agrave;y mong ng&oacute;ng chờ đợi, s&acirc;n 11 b&oacute;ng đ&aacute; phong tr&agrave;o tại H&agrave; th&agrave;nh sẽ được khai mạc, khởi tranh phục vụ c&aacute;c t&iacute;n đồ t&uacute;c cầu s&acirc;n 11.</p>
      <p style="text-align: justify;">
        M&agrave;n khai mạc hứa hẹn với nhiều nội dung hấp dẫn từ việc tổ chức, sắp xếp c&aacute;c vũ đo&agrave;n m&uacute;a sẽ l&agrave;m cho kh&ocirc;ng khi ng&agrave;y khai mạc th&ecirc;m phần m&aacute;u lửa.</p>
      <p style="text-align: justify;">
        C&ugrave;ng với Ban tổ chức đ&oacute; l&agrave; hơn 200 vận động viện, hấu luyện vi&ecirc;n sẽ về g&oacute;p mặt lễ khai mạc c&ugrave;ng nhiều sắc m&agrave;u của c&aacute;c đội b&oacute;ng.</p>
      <p>
        &nbsp;</p>
      <p>
        Lễ khai mạc sẽ diễn ra v&agrave;o hồi: <strong>13h00 tại S&acirc;n ACB &ndash; Mỹ Đ&igrave;nh &ndash; H&agrave; Nội.</strong></p>
      `,
        time: new Date(),
        status: 1,
        category: "hanoi-eleven-2017",
        league: "hanoi-eleven-2017"
      },
      {
        id: "3",
        title: "Họp báo giải Hà nội Eleven Cup 2016",
        image: "http://www.hanoielevencup.com/images/news-1.jpg",
        description: "(Thế giới phủi) Với tinh thần cùng chơi, cùng trải nghiệm, BTC Eleven Cup 2016 đã không ngần ngại vượt khó để duy trì sân chơi 11 vốn ngày càng hiếm trên bình diện Thủ đô...",
        location: "Nhà hàng Long Viên",
        content: `<p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(102, 102, 102); font-family: 'Open Sans', sans-serif; font-size: 14px; text-align: justify;">
        <span style="box-sizing: border-box;">Để n&oacute;i về giải đấu n&agrave;y, những người t&acirc;m huyết như anh Ng&ocirc; Đức Chiểu (Vạn Xu&acirc;n), Đinh Cự Th&agrave;nh (Hải Anh), Ng&ocirc; Văn Phi (Ph&uacute; Đ&ocirc;), Vũ Hội (Men U) đều ấp ủ tạo ra s&acirc;n chơi thường ni&ecirc;n, li&ecirc;n tục cho những đội b&oacute;ng y&ecirc;u th&iacute;ch mặt s&acirc;n cổ điển 11 người.&nbsp;</span></p>
      <p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(102, 102, 102); font-family: 'Open Sans', sans-serif; font-size: 14px; text-align: justify;">
        <span style="box-sizing: border-box;">C&aacute;i kh&oacute; của s&acirc;n to (theo c&aacute;ch gọi d&acirc;n d&atilde;) l&agrave; kh&ocirc;ng phải đội n&agrave;o cũng đủ lực lượng để chơi. M&agrave; đủ lực lượng rồi th&igrave; lại phải x&eacute;t đến yếu tố chuy&ecirc;n m&ocirc;n ph&ugrave; hợp mới c&oacute; thể th&agrave;nh lập đội. Cuộc chơi như thế tự th&acirc;n đ&atilde; c&oacute; sự b&oacute; hẹp về phần đăng k&yacute;. Tuy nhi&ecirc;n, nếu một s&acirc;n chơi tử tế được th&agrave;nh lập, sức h&uacute;t v&agrave; sự rực rỡ của n&oacute; s&acirc;n 7 kh&ocirc;ng s&aacute;nh được. Bởi cơ bản, tr&ecirc;n thế giới v&agrave; b&igrave;nh diện quốc tế hiện nay vẫn chỉ thừa nhận s&acirc;n 11 v&agrave; s&acirc;n 5 trong hệ thống ch&iacute;nh thức của FIFA.&nbsp;</span></p>
      <p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(102, 102, 102); font-family: 'Open Sans', sans-serif; font-size: 14px; text-align: justify;">
        <span style="box-sizing: border-box;">Sau nhiều giải đấu tr&ocirc;i qua nhưng &iacute;t để lại dấu ấn, những người đam m&ecirc; khao kh&aacute;t tạo ra tiền đề từ năm nay để hướng đến một s&acirc;n chơi quy củ. Trao đổi với S&acirc;n cỏ 365, anh Ng&ocirc; Đức Chiểu - Trưởng BTC giải cho biết, năm nay thời gian kh&ocirc;ng nhiều, số đội chốt lại chơi chỉ l&agrave; 7 c&aacute;i t&ecirc;n, nhưng c&aacute;c anh em l&atilde;nh đội v&agrave; cầu thủ rất quyết t&acirc;m. Họ sẽ l&agrave;m nghi&ecirc;m t&uacute;c, c&oacute; b&agrave;i bản v&agrave; chiến lược để những giải năm tới c&oacute; thể tổ chức như Sudico 2015 hoặc xa hơn, l&agrave; một giải League trọn vẹn cho s&acirc;n 11 tr&ecirc;n địa b&agrave;n Thủ đ&ocirc;.</span></p>
      <p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(102, 102, 102); font-family: 'Open Sans', sans-serif; font-size: 14px; text-align: justify;">
        <span style="box-sizing: border-box;">Eleven Cup 2016 năm nay bao gồm những đội b&oacute;ng như B&igrave;nh Minh, Men U, B-gate, Vạn Xu&acirc;n, VLC, Ph&uacute; Đ&ocirc; tham dự. Đ&acirc;y phần lớn đều l&agrave; những đội b&oacute;ng c&oacute; nền tảng tốt tr&ecirc;n mặt cỏ 11 v&agrave; thường xuy&ecirc;n c&oacute; &quot;giờ bay&quot; ở khu vực Mỹ Đ&igrave;nh.&nbsp;</span></p>
      <p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(102, 102, 102); font-family: 'Open Sans', sans-serif; font-size: 14px; text-align: justify;">
        <span style="box-sizing: border-box;">Thể thức thi đấu được BTC lần n&agrave;y đưa ra kh&aacute; hợp l&yacute; với nhu cầu của c&aacute;c đội khi họ th&agrave;nh lập giải League. Theo đ&oacute;, 7 đội sẽ đ&aacute; v&ograve;ng tr&ograve;n 1 lượt t&iacute;nh điểm.&nbsp;</span></p>
      <p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(102, 102, 102); font-family: 'Open Sans', sans-serif; font-size: 14px; text-align: justify;">
        Giải đấu sẽ khai mạc v&agrave;o chủ nhật ng&agrave;y 11/12 nhưng bắt đầu đ&aacute; sớm một v&ograve;ng để kịp kết th&uacute;c trước Tết &acirc;m lịch.</p>
      `,
        time: new Date(),
        status: 1,
        category: "hanoi-eleven-2017",
        league: "hanoi-eleven-2017"
      },
      {
        id: "4",
        title: "Lịch sử hình thành FC B-Gate",
        image: "http://www.hanoielevencup.com/uploads/news/2/news-3.jpg",
        description: "FC B-Gate được thành lập từ 15/04/2012 với nòng cốt là nhân sự của B-Gate Corporation với hầu hết là các thành viên ...",
        location: "Hanoi Eleven Cup 2016",
        content: `<p align="center">
        <strong>LỊCH SỬ H&Igrave;NH TH&Agrave;NH FC B-GATE</strong></p>
      <p>
        &nbsp;</p>
      <p style="text-align: justify;">
        <strong>FC B-Gate</strong> được th&agrave;nh lập từ <strong>15/04/2012</strong>&nbsp;n&ograve;ng cốt l&agrave; nh&acirc;n sự của B-Gate Corporation với hầu hết l&agrave; sinh vi&ecirc;n Đại học B&aacute;ch Khoa đam m&ecirc; thể thao, nhất l&agrave; b&oacute;ng đ&aacute;.</p>
      <p style="text-align: justify;">
        Thời gian đầu FC B-Gate chỉ tập trung chơi s&acirc;n 7 với s&acirc;n 9, đ&atilde; oanh tạc tr&ecirc;n khắp c&aacute;c mặt s&acirc;n phủi ở H&agrave; Nội. Nhận thấy s&acirc;n 7 với s&acirc;n 9 chưa phải l&agrave; đ&iacute;ch tới n&ecirc;n Chủ tịch FC Lương Thanh B&igrave;nh đ&atilde; quyết định đưa đội ra biển lớn l&agrave; tham gia chơi s&acirc;n 11. Với kinh nghiệm c&ograve;n non trẻ, khi bước ra s&acirc;n 11 với nhiều bỡ ngỡ, kinh nghiệm thiếu hụt tưởng chừng như phải bỏ cuộc để về lại với s&acirc;n 7, s&acirc;n 9. Nhưng với quyết t&acirc;m cao của Chủ Tịch c&ugrave;ng to&agrave;n thể anh em trong đội, trải qua hơn một năm thi đấu s&acirc;n 11 giờ đ&acirc;y FC B-Gate đ&atilde; được cộng đồng s&acirc;n 11 h&agrave; nội ghi nhận l&agrave; đội c&oacute; sức trẻ, c&oacute; lối đ&aacute; kỹ thuật v&agrave; c&oacute; sự tiến bộ nhanh.</p>
      <p style="text-align: justify;">
        <br />
        Giờ đ&acirc;y c&aacute;c trận đấu gặp đ&agrave;n anh của m&igrave;nh (th&agrave;nh lập được 8-10 năm) B-Gate đ&atilde; tự tin chơi s&ograve;ng phẳng.</p>
      <p style="text-align: justify;">
        Với mục ti&ecirc;u lấy sức khoẻ l&agrave;m trọng, FC lu&ocirc;n hướng tới những trận đấu hay, đẹp mắt, giao lưu hơn giao đấu.</p>
      <p style="text-align: justify;">
        Th&agrave;nh t&iacute;ch s&acirc;n 11: <strong><em>Đoạt c&uacute;p &ldquo;M&ugrave;a xu&acirc;n 2016&rdquo;</em></strong></p>
      <p style="text-align: justify;">
        Với những g&igrave; đ&atilde; c&oacute; trong tay FC B-Gate&nbsp; hứa hẹn sẽ l&agrave; nh&acirc;n tố b&iacute; ẩn của HanoiElevenCup 2016, với đ&oacute; l&agrave; sự cống hiến c&aacute;c pha b&oacute;ng hay, đẹp v&agrave; đẳng cấp.</p>
      `,
        time: new Date(),
        status: 2,
        category: "hanoi-eleven-2017",
        league: "hanoi-eleven-2017"
      },
    ])
    return this.getCollection(FIREBASE_PATH.NEW);
  }

  getListTeam(): Promise<any> {
    if (this.isUseFakeData) {
      return Promise.resolve([
        {
          id: "1",
          logo: "https://seeklogo.com/images/M/manchester-united-logo-F14DA1FCCD-seeklogo.com.png",
          name: "Manchester United",
          slogan: "The red devil",
          players: []
        },
        {
          id: "2",
          logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
          name: "Manchester City",
          slogan: "The cityzen",
          players: []
        },
        {
          id: "3",
          logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1024px-Chelsea_FC.svg.png",
          name: "Chelsea",
          slogan: "The blue",
          players: []
        },
        {
          id: "4",
          logo: "https://seeklogo.com/images/A/arsenal-logo-B27C071FE1-seeklogo.com.png",
          name: "Arsenal",
          slogan: "The gunner",
          players: []
        },
      ])
    }

    return this.getCollection(FIREBASE_PATH.TEAM);
  }

  getTeamById(id: string): Promise<any> {
    if (this.isUseFakeData) {
      return Promise.resolve({
        id: "1",
        logo: "https://seeklogo.com/images/M/manchester-united-logo-F14DA1FCCD-seeklogo.com.png",
        name: "Manchester United",
        slogan: "The red devil",
        players: []
      })
    }
    return this.getDocument(FIREBASE_PATH.TEAM + "/" + id);
  }

  addPlayer(player: Player): Promise<any> {
    if (this.isUseFakeData) {
      return Promise.resolve();
    }
    let playerId = this.getNewPlayerId()
    return this.addDocument(FIREBASE_PATH.PLAYERS, playerId, {
      avatar: player.avatar,
      birth_day: player.birthDay,
      current_club: player.currentClub,
      name: player.name,
      phone: player.phone,
      position: player.position,
      province: player.province,
      shirt_number: player.shirtNumber,
      special_name: player.specialName
    }).then(() => {
      return playerId;
    });
  }

  updateTeamPlayers(teamId: string, players: Array<Player>): Promise<any> {
    if (this.isUseFakeData) return Promise.resolve();
    let dataUpdatePlayers = [];
    players.forEach(player => {
      dataUpdatePlayers.push({
        id: player.id,
        name: player.name,
        shirt_number: player.shirtNumber,
        special_name: player.specialName,
        avatar: player.avatar
      });
    });
    return this.updateDocument(FIREBASE_PATH.TEAM + "/" + teamId, {
      "players": dataUpdatePlayers
    });
  }
}
