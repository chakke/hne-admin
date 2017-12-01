
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Alert } from '../interface/alert';

@Injectable()
export class AlertControllerProvider {
  public alertSubject = new Subject<Alert>();
  public clearSubject = new Subject<any>();
  constructor() {
  }

  showAlert(type: string, message: string, isShowForever?: boolean, timeout?: number) {
    this.alertSubject.next({
      type: type,
      message: message,
      isShowForever: isShowForever,
      timeout: timeout
    });
  }

  clearAllAlert(){
    this.clearSubject.next("clear");
  }
}
