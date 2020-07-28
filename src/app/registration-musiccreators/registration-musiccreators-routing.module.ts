import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationMusiccreatorsPage } from './registration-musiccreators.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationMusiccreatorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationMusiccreatorsPageRoutingModule {}
