import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modifica-password',
  templateUrl: './modifica-password.page.html',
  styleUrls: ['./modifica-password.page.scss'],
})
export class ModificaPasswordPage implements OnInit {

    constructor(
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController
      ) { }

    ngOnInit() {
    }

    async sendData() {
      const loader = await this.loadingCtrl.create({
        duration: 2000
      });

      loader.present();
      loader.onWillDismiss().then(async l => {
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          cssClass: 'bg-profile',
          message: 'Dati modificati!',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
        this.navCtrl.navigateForward('/home-results');
      });
    }

  }





