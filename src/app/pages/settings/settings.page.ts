import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { Sessione } from 'src/app/session/sessione';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private categorie = [];

  private nome: string;
  private categoria: number;
  private importo: number;
  private data_ricezione: Date;
  private data_scadenza: Date;
  private periodo: number;

  private loadingCtrl: LoadingController;

  constructor(public navCtrl: NavController, 
              public apiService: ApiService, public session: Sessione,
              public alertController: AlertController) {

    this.apiService.getCategorie().then(
      (categorie) => {
        this.categorie=categorie['data'];
      },
      (rej) => {
        this.categorie = [];
      }
    );
  }

  ngOnInit() {
  }

  async sendData() {

    this.apiService.inserisciScadenza(this.nome, this.data_ricezione, this.data_scadenza, this.periodo,
      this.categoria, this.session.codiceUtente, this.importo).then(
        (result) => { // nel caso in cui va a buon fine la chiamata
          this.presentAlert();
          this.goToHome();
          console.log('scadenza inserita: ', this.nome, this.categoria);
        },
        (rej) => {// nel caso non vada a buon fine la chiamata
          console.log('scadenza non inserita');
          this.goToHome();
          this.presentAlertNegativo();
        }
      );
   
  }

  goToHome() {
    //this.navCtrl.navigateForward('home-results');
    this.navCtrl.navigateRoot('/home-results');
  }

  async presentAlert() { // Funzione per mostrare a video finestrina che specifica "l'errore"
    const alert = await this.alertController.create({
      header: 'Scadenza inserita',
      message: 'Inserimento avvenuto con successo.',
      buttons: ['OK']
    });

    await alert.present();
  }
//
  async presentAlertNegativo(){
    const alert = await this.alertController.create({
      header: 'Scadenza non inserita',
      message: 'Inserimento non avvenuto, riprovare.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
