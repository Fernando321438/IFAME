import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoiceAccountPage } from './choice-account.page';

const routes: Routes = [
  {
    path: '',
    component: ChoiceAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoiceAccountPageRoutingModule {}
