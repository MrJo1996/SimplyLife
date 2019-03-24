import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../../providers/api.service';
import { Sessione } from 'src/app/session/sessione';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  public test;
  private nomeUtente: string; //variabile che prenderà il nome utente

  private email: string;
  private password: string;
  private check: number;

  private codiceUtenteLoggato;

public recuperoEmail: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    public session: Sessione
  ) { 

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }



  /////CONTINUARE A LAVORARE - RIUSCIRE A PRENDERE INPUT (VALUTARE SE CREARE UNA NUOVA PAGE) E FARE IN MODO CHE INVII DAVVERO LA MAIL
  async forgotPass() {
   
    const alert = await this.alertCtrl.create({
      header: 'Password dimenticata?',
      message: 'Inserisci la tua email e riceverai un link per reimpostare la password.',
      
      inputs: [
        {
          name: 'recuperoEmail',
          type: 'email',
          placeholder: 'Email'
        }
      ],

      buttons: [
        {
          text: 'Cancella',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operazione annullata');
          }
        }, {
          text: 'Conferma',
          handler: async () => {
            console.log("faccio la funzione di recupero:");
            console.log(this.recuperoEmail);
            this.apiService.recuperoPassword(this.recuperoEmail).then(
              (result) => { //nel caso in cui va a buon fine la chiamata
                console.log("RECUPERATO");
              },
              (rej) => {//nel caso non vada a buon fine la chiamata
                console.log("NON RECUP");
              } 
            );

            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email inviata con successo.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }

  goToHome() {
    if(this.check == 1){  //Settata a 1 in login() se data è diverso da null (fix del problema)
      this.navCtrl.navigateRoot('/home-results');
    }
  }

  //Funzione locale che richiama la f definita nel provider. funzione che viene attivata nel momento in cui si schiacci aun bottone
  /* getValue(){
  this.apiService.getNomeUtente(this.test).then(
    (result) => { //nel caso in cui va a buon fine la chiamata avvaloro la variabile locale (che stamperemo) con il risultato della chiamata
      this.nomeUtente = result['nome'];
      console.log(this.test);
    },
    (rej) => {//nel caso non vada a buon fine la chiamata
      this.nomeUtente = "no connection";
    } 
  );} */

///////////////////////////////////////////////
  login(){
    
    if((this.email==null) || (this.password==null)){
        console.log("COMPILA ETRAMBI I CAMPI")
        return; }

    this.apiService.login(this.email,this.password).then(
      (result) => { //nel caso in cui va a buon fine la chiamata

        console.log("email inserita: " , this.email);
        console.log("psw inserita: ", this.password);
       
        //controllo se le credenziali sono nel db:
          if(result){

             this.codiceUtenteLoggato=result[0].codice_utente;
            console.log(this.codiceUtenteLoggato, "   CODICE "); 
            
            this.session.setValue(this.codiceUtenteLoggato); //Salvo codice utente e nome in una "classe apposita" 
            
            this.check=1; //ACCESSO CONSENTITO
            console.log("Sono in data diverso da null, check = ", this.check);
         
          } else {
            this.check=0; //ACCESSO NEGATO
            console.log("Sono in data uguale a null, check = ", this.check);
          }

        this.goToHome(); //portalo alla home se esistono le credenziali, se check quindi è uguale a 1
      },
      (rej) => {//nel caso non vada a buon fine la chiamata
        console.log("NO ACCESS");
         this.check=0;
      } 
    );
  }

}
