import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getNomeUtente(codice_utente: Number) {
    return new  Promise ((resolve, reject) => {
      const body = {codice_utente};
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/visualizzanomeutente', body).subscribe(
        (data) => {
          let utente = data['Utente'].data[0];
          console.log('utente: ', utente.nome);
          resolve ( utente );
        },
        (err) => {
          reject();
        }
      );
    });
  }

  getCategorie() {
    return new  Promise ((resolve, reject) => {
      this.http.get('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/visualizzacategoria').subscribe(
        (data) => {
          let categorie = data['Categorie'].data;
          console.log('categorie: ', categorie);
          resolve ( categorie );
        },
        (err) => {
          reject();

        }
      );
    });
  }

  getImporto(codice_scadenza: Number) {
    const body = {codice_scadenza};
    return new  Promise ((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/visualizzaimporto', body).subscribe(
        (data) => {
          let importo = data['Importo'].data[0];
          console.log('importo: ', importo.importo);
          resolve ( importo );
        },
        (err) => {
          reject();

        }
      );
    });
  }

  getPeriodo(codice_scadenza: Number) {
    const body = {codice_scadenza};
    return new  Promise ((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/visualizzaperiodo', body).subscribe(
        (data) => {
          let periodo = data['Periodo'].data[0];
          console.log('periodo: ', periodo.periodo);
          resolve ( periodo );
        },
        (err) => {
          reject();

        }
      );
    });
  }

  modificaScadenza(codice_scadenza: Number, nome: String, data_ricezione: Date, data_scadenza: Date, periodo: Number, importo: Number) {
    const body = {
      codice_scadenza,
      nome,
      data_ricezione,
      data_scadenza,
      periodo,
      importo
    };

    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/modificascadenza', body).subscribe(
        (data) => {
          let modifica = data;
          console.log('modifica: ', data['message']);
          resolve(modifica);
        },
        (err) => {
          reject();
        }
      );
    });
  }

  getScadenzePerCategoria(cod_categoria: number, cod_utente: number) {
    const body = {
      cod_categoria,
      cod_utente
    };
    console.log(cod_categoria, cod_utente);
    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/visualizzascadenzepercategoria', body).subscribe(
        (data) => {
          let scadenze = data['scadenze'];
          console.log('scadenze: ', scadenze);
          resolve(scadenze);
        },
        (err) => {
          reject();
          console.log('NO QUERY');
        }
      );
    });
  }

  getPagamento(codice_scadenza: Number) {
    const body = {
      codice_scadenza
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/visualizzapagamento', body).subscribe(
        (data) => {
          let pagamento = data['confermato'].data[0];
          console.log('pagamento: ', pagamento);
          resolve(pagamento);
        },
        (err) => {
          reject();
        }
      );
    });
  }

  inserisciScadenza(nome: String, data_ricezione: Date, data_scadenza: Date, periodo: Number,
    cod_categoria: Number, cod_utente: Number, importo: Number) {
    const body = {
      nome,
      data_ricezione,
      data_scadenza,
      periodo,
      cod_categoria,
      cod_utente,
      importo
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/inserisciscadenza', body).subscribe(
        (data) => {
          let inserimento = data;
          console.log('inserimento: ', data['message']);
          resolve(inserimento);
        },
        (err) => {
          reject();
        }
      );
    });
  }

  getScadenzePerData(cod_utente: Number) {
    const body = {
      cod_utente
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/visualizzascadenzeperdata', body).subscribe(
        (data) => {
          let scadenzeData = data['scadenze'];
          //console.log('scadenze per data: ', data);
          resolve(scadenzeData);
        },
        (err) => {
          console.log('ho fatto una reject da api');
          reject();
        }
      );
    });
  }

  confermaPagamento(codice_scadenza: Number) {
    const body = {
      codice_scadenza
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/confermapagamento', body).subscribe(
        (data) => {
          let conferma = data;
          console.log('conferma: ', data['message']);
          resolve (conferma);
        },
        (err) => {
          reject();
        }
      );
    });
  }

  login(email: String, password: String) {
    const body = {
      email,
      password
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/login', body).subscribe(
        (data) => {
          let login = data['data'];
          console.log('login: ', login);
          resolve(login);
        },
        (err) => {
          reject();
        }
      );
    });
  }

  registrazione(nome: String, cognome: String, email: String, password: String) {
    const body = {
      email,
      password,
      nome,
      cognome
    };
    return new Promise((resolve, reject) => {
    this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/registrazione', body).subscribe(
      (data) => {
        let signup = data['data'];
        console.log('registrato: ', signup);
        resolve(signup);
      },
      (err) => {
        reject();
      }
    );
  });
}

recuperoPassword(email: string) {
  const body = {
        email
      };
      return new Promise((resolve, reject) => {
        this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/recupero', body).subscribe(
          (data) => {
            let recupero = data['data'];
            console.log('rec: ', recupero);
            resolve(recupero);
          },
          (err) => {
            reject();
          }
        );
      });
  }

  annullaPagamento(codice_scadenza: Number) {
    const body = {
      codice_scadenza
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/annullapagamento', body).subscribe(
        (data) => {
          let annullato = data['message'];
          console.log('annullato: ', annullato);
          resolve(annullato);
        },
        (err) => {
          reject();
        }
      );
    });
  }

  modificaPassword(email: string, password: string) {
    const body = {
      email,
      password
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://simplylifee.altervista.org/logic/SimplyLifeBack-End-master/public/index.php/modificapassword', body).subscribe(
        data => {
          let password_modificata = data['message'];
          console.log('password modificata: ', password_modificata);
          resolve(password_modificata);
        },
        (err) => {
          reject();
        }
      );
    });
  }
}
