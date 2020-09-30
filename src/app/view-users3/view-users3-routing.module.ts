 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUsers3Page } from './view-users3.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUsers3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUsers3PageRoutingModule {}
 