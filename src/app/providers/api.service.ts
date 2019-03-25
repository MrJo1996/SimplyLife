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
      this.http.post('http://localhost/simplylifebackend/public/visualizzanomeutente', body).subscribe(
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
      this.http.get('http://localhost/simplylifebackend/public/visualizzacategoria').subscribe(
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
      this.http.post('http://localhost/simplylifebackend/public/visualizzaimporto', body).subscribe(
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
      this.http.post('http://localhost/simplylifebackend/public/visualizzaperiodo', body).subscribe(
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
      this.http.post('http://localhost/simplylifebackend/public/modificascadenza', body).subscribe(
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

  getScadenzePerCategoria(nome_categoria: String) {
    const body = {
      nome_categoria,
    };

    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/simplylifebackend/public/visualizzascadenzepercategoria', body).subscribe(
        (data) => {
          let scadenze = data['scadenze'].data;
          console.log('scadenze: ', scadenze);
          resolve(scadenze);
        },
        (err) => {
          reject();
        }
      );
    });
  }

  getPagamento(codice_scadenza: Number) {
    const body = {
      codice_scadenza
    };
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost/simplylifebackend/public/visualizzapagamento', body).subscribe(
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
      this.http.post('http://localhost/simplylifebackend/public/inserisciscadenza', body).subscribe(
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
      this.http.post('http://localhost/simplylifebackend/public/visualizzascadenzeperdata', body).subscribe(
        (data) => {
          let scadenzeData = data['scadenze: '];
          console.log('scadenze per data: ', data);
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
      this.http.post('http://localhost/simplylifebackend/public/confermapagamento', body).subscribe(
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
      this.http.post('http://localhost/simplylifebackend/public/login', body).subscribe(
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
    this.http.post('http://localhost/simplylifebackend/public/registrazione', body).subscribe(
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
        this.http.post('http://localhost/simplylifebackend/public/recupero', body).subscribe(
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
      this.http.post('http://localhost/simplylifebackend/public/annullapagamento', body).subscribe(
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
      this.http.post('http://localhost/SimplyLifeBack-End/public/modificapassword', body).subscribe(
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
