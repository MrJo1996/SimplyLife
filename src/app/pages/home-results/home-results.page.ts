import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController
} from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import { Sessione } from 'src/app/session/sessione';
import { ApiService } from 'src/app/providers/api.service';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage {
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  nomeUtente: string;

  private scadenze_data = []; //array che conterrà dati delle prossime X scadenze da stampare

  private proxScad = [1]; //array per la stampa delle prossime scad, per risolvere il problema del for

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public session: Sessione,
    public apiService: ApiService
  ) {

    this.getValue(); //Stampa nome Utente loggato

    this.getNextDeadLine(); //Stampa prossime x scadenze
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }


  // // // // // // //

  //Funzione locale che richiama la f definita nel provider. funzione che viene attivata nel momento in cui si schiaccia un bottone
  getValue() {
    this.apiService.getNomeUtente(this.session.codiceUtente).then(
      (result) => { //nel caso in cui va a buon fine la chiamata avvaloro la variabile locale (che stamperemo) con il risultato della chiamata
        this.nomeUtente = result['nome'];
        console.log("NOME UTENTE HOME: ", this.nomeUtente);
        console.log("CODICE UTENTE PASSATO: ", this.session.codiceUtente);
      },
      (rej) => {//nel caso non vada a buon fine la chiamata
        console.log("CODICE UTENTE PASSATO: ", this.session.codiceUtente);
        this.nomeUtente = "no connection";
      }
    );
  }

  getNextDeadLine() {
    this.apiService.getScadenzePerData(this.session.codiceUtente).then(
      (scadenzeData) => {
        this.scadenze_data = scadenzeData

        if (this.scadenze_data[0] =! null) {
          this.proxScad[0] = this.scadenze_data['data']['0'];
          console.log(this.proxScad[0]);

        }
        
        if (this.scadenze_data[1] =! null) {
          this.proxScad[1] = this.scadenze_data['data']['1'];
          console.log(this.proxScad[1]);
        }

      },
      (rej) => {
        this.scadenze_data = []
        console.log('REJECT');
        console.log('in deadLine: ', this.session.codiceUtente);
      }
    );
  }
}
