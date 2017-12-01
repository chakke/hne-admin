import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertControllerProvider } from "../../../providers/football-admin/alert-controller/alert-controller";

@Component({
  selector: 'fa-alert',
  templateUrl: 'fa-alert.html'
})
export class FaAlertComponent {
  @ViewChild("alertContainer") alertContainer: ElementRef;
  constructor(private alertCtrl: AlertControllerProvider) {
    this.alertCtrl.alertSubject.asObservable().subscribe(alert => {
      this.addAlert(alert.type, alert.message, alert.isShowForever, alert.timeout);
    })
    this.alertCtrl.clearSubject.asObservable().subscribe(() => {
      this.clearAlert();
    })
  }
  ngAfterViewInit() {

  }

  addAlert(type: string, message: string, isShowForever?: boolean, timeout?: number) {
    let alert = document.createElement("div");
    alert.classList.add("alert", "alert-" + type, "alert-dismissible", "fade", "show");
    alert.innerHTML = `
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>`;
    (<HTMLElement>this.alertContainer.nativeElement).appendChild(alert);
    if (!isShowForever) {
      setTimeout(() => {
        try {
          (<HTMLElement>this.alertContainer.nativeElement).removeChild(alert);
        }
        catch (err) {

        }

      }, timeout ? timeout : 5000);
    }
  }

  clearAlert(){
    this.alertContainer.nativeElement.innerHTML = "";
  }

}
