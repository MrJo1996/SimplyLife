import { Injectable } from '@angular/core';
import { ApiService } from '../providers/api.service';

@Injectable({
  providedIn: 'root'
})
export class Sessione {
  static setValue(codiceUtenteLoggato: any): any {
    throw new Error("Method not implemented.");
  }
  public codiceUtente;
  public nomeUtente: string;
  public codScadenzaTemp; //variabile appoggio per passaggio valori

  constructor(
    public apiService: ApiService
  ) { }

  // // //

  public setValue(x: number) {
    this.codiceUtente = x;
  }

  public setCodScadenzaTemp(x: number) {
    this.codScadenzaTemp = x;
  }


  public setNome() {
    this.apiService.getNomeUtente(this.codiceUtente).then(
      (result) => { //nel caso in cui va a buon fine la chiamata avvaloro la variabile locale (che stamperemo) con il risultato della chiamata
        this.nomeUtente = result['nome'];
      },
      (rej) => {//nel caso non vada a buon fine la chiamata
        this.nomeUtente = "no connection";
      }
    );
  }

}
