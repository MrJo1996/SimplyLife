import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/providers/api.service';

@Component({
  selector: 'app-modifica-password',
  templateUrl: './modifica-password.page.html',
  styleUrls: ['./modifica-password.page.scss'],
})
export class ModificaPasswordPage implements OnInit {
    
    private mail: string;
    private nuova_password: string;
    
    constructor(
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      private apiService: ApiService
      ) { }

    ngOnInit() {
    }

    sendData() {
      console.log(this.mail, this.nuova_password);
      this.apiService.modificaPassword(this.mail, this.nuova_password).then(
      (dati_modificati) => {
        console.log('dati modificati');
        //aggiungere alert di avvenuta modifica, tornare alla home
      },
      (rej) => {
        console.log('erroreee');
      }
      );
    }

  }





