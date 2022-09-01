import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from './table/table.component';
import {MaterialModule} from '../material/material.module';
import {AllPipesModule} from '../pipes/pipes/pipes.module';
import { InputComponent } from './input/input.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { SelectComponent } from './select/select.component';


@NgModule({
  declarations: [
    TableComponent,
    InputComponent,
    MultiSelectComponent,
    SelectComponent,
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
    MultiSelectComponent,
    SelectComponent,
  ]
})
export class GlobalComponentsModule { }
