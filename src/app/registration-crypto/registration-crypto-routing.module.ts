import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationCryptoPage } from './registration-crypto.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationCryptoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationCryptoPageRoutingModule {}
