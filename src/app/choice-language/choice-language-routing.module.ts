import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoiceLanguagePage } from './choice-language.page';

const routes: Routes = [
  {
    path: '',
    component: ChoiceLanguagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoiceLanguagePageRoutingModule {}
