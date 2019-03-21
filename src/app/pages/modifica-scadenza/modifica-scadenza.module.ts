import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModificaScadenzaPage } from './modifica-scadenza.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaScadenzaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModificaScadenzaPage]
})
export class ModificaScadenzaPageModule {}
