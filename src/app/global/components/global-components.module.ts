import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table/table.component';
import {MaterialModule} from '../material/material.module';
import {AllPipesModule} from '../pipes/pipes/pipes.module';
import {ReplaceDashPipe} from '../pipes/replace-dash.pipe';
import { InputComponent } from './input/input.component';


@NgModule({
  declarations: [
    TableComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AllPipesModule
  ],
  exports: [
    TableComponent,
    InputComponent
  ]
})
export class GlobalComponentsModule { }
