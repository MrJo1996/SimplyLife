import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Pages } from './interfaces/pages';

import { Sessione } from 'src/app/session/sessione';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    public session: Sessione
  ) {
    this.appPages = [
      {
        title: 'Home',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Visualizza scadenze',
        url: '/about',
        direct: 'forward',
        icon: 'eye'
      },

      {
        title: 'Inserisci scadenza',
        url: '/settings',
        direct: 'forward',
        icon: 'add-circle-outline'
      },
      {
        title: 'Supporto',
        url: '/edit-profile',
        direct: 'forward',
        icon: 'mail'
      },
      {
        title: 'Logout',
        url: '/',
        direct: 'root',
        icon: 'return-left'
      }
    
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {

    //FARE UN REFRESH AUTOMATICO 
this.session.setValue(-1);


    this.navCtrl.navigateRoot('/');
  }
}
