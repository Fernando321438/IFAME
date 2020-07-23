import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyfilesPage } from './myfiles.page';

const routes: Routes = [
  {
    path: '',
    component: MyfilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyfilesPageRoutingModule {}
