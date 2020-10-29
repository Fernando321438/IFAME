import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUsersPage } from './view-users.page';

const routes: Routes = [
  {
    path: '',
    component: ViewUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUsersPageRoutingModule {}
