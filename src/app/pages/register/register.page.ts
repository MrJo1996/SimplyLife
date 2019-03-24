import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../providers/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  
  private nome: string;
  private cognome: string;
  private email: string;
  private password: string;
  private confermaPassword: string;


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    public alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

/////////////////////////////////////
  async signUp() {
   
    if (this.password == this.confermaPassword){
     
    this.apiService.registrazione(this.nome,this.cognome,this.email,this.password).then(
      (result) => { //nel caso in cui va a buon fine la chiamata
        console.log("UTENTE CREATO: " , this.nome , this.cognome);
      },
      (rej) => {//nel caso non vada a buon fine la chiamata
        console.log("UTENTE NON CREATO");
      } 
    );

     //DOPO 2000 MS RIPORTA L'UTENTE ALA LOGIN (PRIMA ERA HOME)
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });
    loader.present();
    loader.onWillDismiss().then(() => {
     this.goToLogin();
    });  
    }else{
      this.presentAlert();
      console.log('Passwords non coincidono');
      return;
    }

  }

  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }

  async presentAlert() { //Funzione per mostrare a video finestrina che specifica "l'errore"
    const alert = await this.alertController.create({
      header: 'Password non corrispondenti',
      message: 'Assicurarsi che i campi "Password" e "Conferma Password" coincidino per continuare.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
