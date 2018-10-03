import { Injectable, Output, EventEmitter } from "@angular/core";
import { ToastController } from "ionic-angular";


@Injectable()
export class ToastService {

    @Output() public toastDismiss = new EventEmitter<void>();

    constructor( private toastCtrl: ToastController ){

    }

    presentToast(str:string) {
        let toast = this.toastCtrl.create({
          message: str,
          duration: 3000,
          position: 'bot'
        });
      
        toast.onDidDismiss(() => {
          this.toastDismiss.emit();
          console.log('Dismissed toast');
        });
      
        toast.present();
      }

}