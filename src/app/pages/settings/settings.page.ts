import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { Data } from '@angular/router';
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
  loadingCtrl: LoadingController;
  lang: any;
  enableNotifications: any;
  paymentMethod: any;
  currency: any;
  enablePromo: any;
  enableHistory: any;

  languages: any = ['English', 'Portuguese', 'French'];
  paymentMethods: any = ['Paypal', 'Credit Card'];
  currencies: any = ['USD', 'BRL', 'EUR'];

  constructor(public navCtrl: NavController, public apiService: ApiService, public session: Sessione) { 
    this.apiService.getCategorie().then(
      (categorie) => {
        this.categorie = categorie;
      },
      (rej) => {
        this.categorie = [];
      }
    );}

  ngOnInit() {
  }

  async sendData() {
      console.log(this.nome, this.importo, this.periodo, this.categoria, this.data_ricezione, this.data_scadenza, this.session.codiceUtente);
      this.apiService.inserisciScadenza(this.nome, this.data_ricezione, this.data_scadenza, this.periodo,
        this.categoria, this.session.codiceUtente, this.importo).then(
        (result) => { // nel caso in cui va a buon fine la chiamata
          console.log('scadenza inserita: ' , this.nome , this.categoria);
        },
        (rej) => {// nel caso non vada a buon fine la chiamata
          console.log('scadenza non inserita');
        }
      );
      /*  // DOPO 2000 MS RIPORTA L'UTENTE ALA LOGIN (PRIMA ERA HOME)
      const loader = await this.loadingCtrl.create({
        duration: 2000
      });
      loader.present();
      loader.onWillDismiss().then(() => {
       this.goToHome();
      }); */
    // this.navCtrl.navigateForward('edit-profile');
  }

/*   logout() {
    this.navCtrl.navigateRoot('/');
  } */
  goToHome() {
    this.navCtrl.navigateForward('home-results');
  }

}
