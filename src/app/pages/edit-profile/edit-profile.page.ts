import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  private SENDGRID_API_KEY = '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';

  private email: string;
  private oggetto: string;
  private messaggio: string;

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }


  async presentAlert() { // Funzione per mostrare a video finestrina che specifica "l'errore" o il funzionamento
    const alert = await this.alertController.create({
      header: 'Email inviata!',
      message: 'La mail è stata inviata con successo.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertNegativo() {
    const alert = await this.alertController.create({
      header: 'Email non inviata.',
      message: 'Invio non avvenuto, controllare i campi del form e riprovare.',
      buttons: ['OK']
    });
    await alert.present();
  }
  
}
