import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';



@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }



goToModificaScadenza() {
  this.navCtrl.navigateRoot('\modifica-scadenza');
}
}
