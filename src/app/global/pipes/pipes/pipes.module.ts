import { NgModule } from '@angular/core';
import {
  AsyncPipe,
  CommonModule, CurrencyPipe, DatePipe, DecimalPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe,
  LowerCasePipe,
  PercentPipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';
import {ReplaceDashPipe} from '../replace-dash.pipe';
import {ReplaceUnderscorePipe} from '../replace-underscore.pipe';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ]
})
export class AllPipesModule { }
