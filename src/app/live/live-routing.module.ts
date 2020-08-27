import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivePage } from './live.page';

const routes: Routes = [
  {
    path: '',
    component: LivePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivePageRoutingModule {}
