import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyFilesPage } from './my-files.page';

const routes: Routes = [
  {
    path: '',
    component: MyFilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyFilesPageRoutingModule {}
