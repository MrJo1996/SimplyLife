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

  /*async sendMail() {
    console.log("Ho inviatooooo");
//SE NON VA E DA ERRORE CONTROLLARE CORS DISABILITATO IN BROWSER E FARE SWITCH TRA I COMMENTI NEL SETTER
    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey( /!* process.env.SENDGRID_API_KEY *!/  this.SENDGRID_API_KEY );
    const msg = {
      to: 'simplylife19@gmail.com',
      from: this.email,
      subject: this.oggetto,
      text: this.messaggio,
      /!* html: '<strong> </strong>', *!/
    };
    if (this.email == null || this.oggetto == null || this.messaggio == null) {
      this.presentAlertNegativo();
    } else {
      sgMail.send(msg);
      this.presentAlert();
      this.navCtrl.navigateRoot('/home-results');
    }
  }*/

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
