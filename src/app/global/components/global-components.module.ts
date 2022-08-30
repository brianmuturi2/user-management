import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table/table.component';
import {MaterialModule} from '../material/material.module';
import {AllPipesModule} from '../pipes/pipes/pipes.module';
import {ReplaceDashPipe} from '../pipes/replace-dash.pipe';


@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AllPipesModule
  ],
  exports: [
    TableComponent
  ]
})
export class GlobalComponentsModule { }
