import { Injectable, Output, EventEmitter } from "@angular/core";
import { AlertController } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";


@Injectable()
export class ConfirmAlertService {

    @Output() public okPressed = new EventEmitter<void>();
    @Output() public cancelPressed = new EventEmitter<void>();

    constructor( private alertCtrl: AlertController,
      private translate: TranslateService ){

    }

    presentConfirm(title: string, message: string) {
      let yes: string;
      let cancel: string;
      this.translate.get('cancel').subscribe(res => {
        cancel = res;
        
      })
      this.translate.get('yes').subscribe(res => {
        yes = res;
        
      })
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: cancel,
              role: 'cancel',
              handler: () => {
                this.cancelPressed.emit();
              }
            },
            {
              text: yes,
              handler: () => {
                this.okPressed.emit();
              }
            }
          ]
        });
        alert.present();
      }
}