import { Injectable, Output, EventEmitter } from "@angular/core";
import { AlertController } from "ionic-angular";


@Injectable()
export class ConfirmAlertService {

    @Output() public okPressed = new EventEmitter<void>();

    constructor( private alertCtrl: AlertController ){

    }

    presentConfirm(title: string, message: string) {
        let alert = this.alertCtrl.create({
          title: title,
          message: message,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Ok',
              handler: () => {
                this.okPressed.emit();
              }
            }
          ]
        });
        alert.present();
      }
}