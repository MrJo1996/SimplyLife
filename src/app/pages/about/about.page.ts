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
  private scadenze = [];
  constructor(
    public navCtrl: NavController,
    public apiService: ApiService,
    public session: Sessione
  ) { }

  ngOnInit() {
  }

  goToVisualizzaCategorie() {
  }



  visualizzaScadenzePerData() {
    this.apiService.getScadenzePerData(this.session.codiceUtente).then(
      (scadenzeData) => {
        this.scadenze = scadenzeData,
        console.log('visualizzato.');
      },
      (rej) => {
        this.scadenze = [],
        console.log('REJECT');
      }
    );
    }
}
