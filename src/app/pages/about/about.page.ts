import { Component, OnInit } from '@angular/core';
import {  NavController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { Sessione } from 'src/app/session/sessione';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  private scadenze_data = []; //array che conterrà dati delle prossime X scadenze da stampare
  private categorie = [];
  private scadenze_categoria = [];
  private cod_categoria: number;
  private btn_visualizzaPerData: boolean;
  private btn_visualizzaCategorie: boolean;
  private btn_visualizza: boolean;
  private cod_scadenza: number; //PREnderà valore

  constructor(
    public navCtrl: NavController,
    public apiService: ApiService,
    public alertController: AlertController,
    public session: Sessione
  ) {}
//
  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      event.target.complete();
      this.refresh(); //ADD - RISCARICA DATI PER AGGIORNARE DOPO IL PULL LA VIEW
    }, 2000); //2000 MS DI TIMEOUT PER FARE IN MODO CHE RIESCA A RISCARICARE I DATI
}
ionPull(event){
  //Emitted while the user is pulling down the content and exposing the refresher.
  console.log('ionPull Event Triggered!');
}
ionStart(event){
  //Emitted when the user begins to start pulling down.
  console.log('ionStart Event Triggered!');
}

  ngOnInit() {
    this.btn_visualizzaCategorie = false;
    this.btn_visualizzaPerData = false;
    this.btn_visualizza = false;
  
  }

  VisualizzaCategorie() {
    this.btn_visualizzaPerData = false;
    this.btn_visualizza = false;
    this.btn_visualizzaCategorie = true;
    this.apiService.getCategorie().then(
      (categorie) => {
        this.categorie = categorie;
      },
      (rej) => {
        this.categorie = [];
      }
    );
  }

  visualizzaScadenzePerData() {
    this.btn_visualizzaCategorie = false;
    this.btn_visualizza = false;
    this.btn_visualizzaPerData = true;
    this.apiService.getScadenzePerData(this.session.codiceUtente).then(
      (scadenzeData) => {
        this.scadenze_data = scadenzeData['data'],
          console.log('visualizzato.');
      },
      (rej) => {
        this.scadenze_data = [],
          console.log('REJECT');
      }
    );
  }

refresh(){
  this.apiService.getScadenzePerCategoria(this.cod_categoria, this.session.codiceUtente).then(
    (scadenzeCategoria) => {
      this.scadenze_categoria = scadenzeCategoria;
      console.log('scadenze cat', this.scadenze_categoria);
    },
    (rej) =>{
      this.scadenze_categoria = [],
      console.log('error');
    }
  );

  this.apiService.getScadenzePerData(this.session.codiceUtente).then(
    (scadenzeData) => {
      this.scadenze_data = scadenzeData['data'],
        console.log('visualizzato.');
    },
    (rej) => {
      this.scadenze_data = [],
        console.log('REJECT');
    }
  );
  console.log("REFRESH FATTO");
}

  visualizzaScadenzePerCategoria(){
    this.btn_visualizzaCategorie = false;
    this.btn_visualizzaPerData = false;
    this.btn_visualizza = true;
    this.apiService.getScadenzePerCategoria(this.cod_categoria, this.session.codiceUtente).then(
      (scadenzeCategoria) => {
        this.scadenze_categoria = scadenzeCategoria;
        console.log('scadenze cat', this.scadenze_categoria);
      },
      (rej) =>{
        this.scadenze_categoria = [],
        console.log('erroreeeeeee');
      }
    );
  }

  modificaApprofondita(codice_scadenza:number){
    this.cod_scadenza = codice_scadenza;
    this.session.setCodScadenzaTemp(this.cod_scadenza);
    this.navCtrl.navigateRoot('/modifica-scadenza');
    

    console.log(this.cod_scadenza);
    
  }

  confermaPagamento(codice: number){
    this.cod_scadenza = codice;
    this.apiService.confermaPagamento(this.cod_scadenza).then(
      (result) => {
        this.presentAlert();
        console.log("CONFERMATO", this.cod_scadenza);
      },
      (rej) => {
        this.presentAlertNegativo();
        console.log("NON VA IL CONFERMA",this.cod_scadenza);
      }
    );
  }

  annullaPagamento(codice_scad: number){
    this.cod_scadenza = codice_scad;
    this.apiService.annullaPagamento(this.cod_scadenza).then(
      (result) => {
        this.presentAlert();
        console.log("ANNULLATO",this.cod_scadenza);
      },
      (rej) => {
        this.presentAlertNegativo();
        console.log("NON VA L' ANNULLATO",this.cod_scadenza);
      }
    );
  }

  async presentAlert() { // Funzione per mostrare a video finestrina che specifica "l'errore"
    const alert = await this.alertController.create({
      header: 'Modifica Effetuata!',
      message: 'Stato pagamento cambiato, aggiorna la view per mostrare i cambiamenti.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertNegativo(){
    const alert = await this.alertController.create({
      header: 'Impossibile aggiornare lo stato del pagamento',
      message: 'Aggiornamento non avvenuto, riprovare.',
      buttons: ['OK']
    });
    await alert.present();
  }

}