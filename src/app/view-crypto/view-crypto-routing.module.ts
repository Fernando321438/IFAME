import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCryptoPage } from './view-crypto.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCryptoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCryptoPageRoutingModule {}
