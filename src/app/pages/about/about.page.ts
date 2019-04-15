import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';
import { Sessione } from 'src/app/session/sessione';
import { createElement } from '@angular/core/src/view/element';



@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  private scadenze_data = []; //array che conterrà dati delle prossime X scadenze da stampare
  private categorie = [];
  private categoria: number;

  constructor(
    public navCtrl: NavController,
    public apiService: ApiService,
    public session: Sessione
  ) {
    this.apiService.getCategorie().then(
      (categorie) => {
        this.categorie = categorie;
      },
      (rej) => {
        this.categorie = [];
      }
    );
  }

  ngOnInit() {
    this.visualizzaScadenzePerData();
  }




  /////

  goToVisualizzaCategorie() {

  }



  visualizzaScadenzePerData() {
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
}
