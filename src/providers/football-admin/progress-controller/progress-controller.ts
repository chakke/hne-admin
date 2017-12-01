import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ProgressControllerProvider {
  private loaderSubject = new Subject<string>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { 
    // setTimeout(() => {
    //   this.add();
    // }, 5000);

    // setTimeout(() => {
    //   this.add();
    // }, 6000)
    // setTimeout(() => {
    //   this.add();
    // }, 6500)
    // setTimeout(() => {
    //   this.add();
    // }, 7000)

    // setTimeout(() => {
    //   this.subtract();
    // }, 8000)

    // setTimeout(() => {
    //   this.subtract(); 
    // }, 8500)

  }

  add() { 
    this.loaderSubject.next("add");
  }
  subtract() {
    this.loaderSubject.next("subtract");
  } 
}

