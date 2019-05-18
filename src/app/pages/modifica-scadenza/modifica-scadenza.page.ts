import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { Sessione } from 'src/app/session/sessione';

@Component({
  selector: 'app-modifica-scadenza',
  templateUrl: './modifica-scadenza.page.html',
  styleUrls: ['./modifica-scadenza.page.scss'],
})
export class ModificaScadenzaPage implements OnInit {

  private scadenza = []; //array che conterrà dati della scadenza con quel det. codice
  private categorie = [];
  private codicePassato: number;//codice scadenza passato dalla sessione

  private nome: string;
  private categoria: number;
  private importo: number;
  private data_ricezione: Date;
  private data_scadenza: Date;
  private periodo: number;

  constructor
    (
      public navCtrl: NavController,
      public apiService: ApiService,
      public alertController: AlertController,
      public session: Sessione
    ) {
    this.codicePassato = this.session.codScadenzaTemp;
    console.log("Codice passato:", this.session.codScadenzaTemp);

    //prende le categorie da visualizzare per permettere la modifica
    this.apiService.getCategorie().then(
      (categorie) => {
        this.categorie = categorie;
      },
      (rej) => {
        this.categorie = [];
      }
    );

    //prende la scadenza cliccata dall'user
    this.apiService.getScadenzePerData(this.session.codiceUtente).then(
      (scadenzeData) => {
        this.scadenza = scadenzeData['data'];
        console.log('impostata scad temp.');
      },
      (rej) => {
        this.scadenza = [],
          console.log('REJECT');
      }
    );
  }

  ngOnInit() { }


  goToVisualizzaScadenze() {
    this.navCtrl.navigateRoot('/about');
  }

  modify(){

    this.apiService.modificaScadenza(this.codicePassato,this.nome, this.data_ricezione, this.data_scadenza, this.periodo,this.importo).then(
        (result) => { // nel caso in cui va a buon fine la chiamata
          this.presentAlert();
          this.goToVisualizzaScadenze();
          console.log('scadenza inserita: ', this.nome, this.categoria);
        },
        (rej) => {// nel caso non vada a buon fine la chiamata
          console.log('scadenza non inserita');
          this.goToVisualizzaScadenze();
          this.presentAlertNegativo();
        }
      );

  }

  async presentAlert() { // Funzione per mostrare a video finestrina che specifica "l'errore"
    const alert = await this.alertController.create({
      header: 'Scadenza aggiornata',
      message: 'Scadenza aggiornata con successo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertNegativo(){
    const alert = await this.alertController.create({
      header: 'Impossibile aggiornare scadenza',
      message: 'Aggiornamento scadenza non avvenuto, riprovare.',
      buttons: ['OK']
    });
    await alert.present();
  }

}
