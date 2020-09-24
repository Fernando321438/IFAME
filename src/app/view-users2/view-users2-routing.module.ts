import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUsers2Page } from './view-users2.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUsers2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUsers2PageRoutingModule {}
