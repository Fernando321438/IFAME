import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoiceLanguagePageRoutingModule } from './choice-language-routing.module';

import { ChoiceLanguagePage } from './choice-language.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoiceLanguagePageRoutingModule
  ],
  declarations: [ChoiceLanguagePage]
})
export class ChoiceLanguagePageModule {}
