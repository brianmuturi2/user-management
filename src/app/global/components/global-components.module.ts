import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table/table.component';
import {MaterialModule} from '../material/material.module';
import {AllPipesModule} from '../pipes/pipes/pipes.module';
import {ReplaceDashPipe} from '../pipes/replace-dash.pipe';
import { InputComponent } from './input/input.component';
import { SelectionCheckboxComponent } from './selection-checkbox/selection-checkbox.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TableComponent,
    InputComponent,
    SelectionCheckboxComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AllPipesModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent,
    InputComponent,
    SelectionCheckboxComponent
  ]
})
export class GlobalComponentsModule { }
