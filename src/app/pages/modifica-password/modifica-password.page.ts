import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';

@Component({
  selector: 'app-modifica-password',
  templateUrl: './modifica-password.page.html',
  styleUrls: ['./modifica-password.page.scss'],
})
export class ModificaPasswordPage implements OnInit {
    
    private mail: string;
    private nuova_password: string;
    
    constructor(
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      public alertController: AlertController,
      private apiService: ApiService
      ) { }

    ngOnInit() {
    }

    sendData() {
      console.log(this.mail, this.nuova_password);
      this.apiService.modificaPassword(this.mail, this.nuova_password).then(
      (dati_modificati) => {
        console.log('Dati modificati');
        //aggiungere alert di avvenuta modifica, tornare alla home
        this.presentAlert();
      (rej) => {
        console.log('errore');
        this.presentAlertNegativo();
      }
      );
    }

    async presentAlert() { // Funzione per mostrare a video finestrina che specifica "l'errore"
    const alert = await this.alertController.create({
      header: 'Modifica Effetuata!',
      message: 'Password cambiata con successo.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertNegativo(){
    const alert = await this.alertController.create({
      header: 'Impossibile modificare la password.',
      message: 'Aggiornamento non avvenuto, riprovare.',
      buttons: ['OK']
    });
    await alert.present();
  }

  }





