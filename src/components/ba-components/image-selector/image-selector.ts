import { Component, Output, EventEmitter, Input } from '@angular/core';  


@Component({
  selector: 'image-selector',
  templateUrl: 'image-selector.html'
})
export class ImageSelectorComponent {
  defaultImage: string = "";
  imageName: string = "Chưa chọn ảnh nào";
  
  @Input() image: string = "";
  @Output() onImageChange = new EventEmitter<string>();
  constructor() {
    (<any>window).fileCallBack = (url)=>{
      if(url){
        this.image = url;
        this.imageName = "";
        this.onImageChange.next(url);
      }
    }
  }

  removeLogo() {
    this.image = "";
    this.imageName = "Chưa chọn ảnh nào";
  }

  chooseFile(){
    window.open('assets/test.html', "Chọn file", "height=900,width=700");
  }
}
