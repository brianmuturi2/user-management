import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../global/material/material.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import {GlobalComponentsModule} from '../global/components/global-components.module';
import { UsersListContainerComponent } from './containers/users-list-container/users-list-container.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    UsersListComponent,
    UsersListContainerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GlobalComponentsModule,
    HttpClientModule
  ],
  exports: [
    UsersListComponent,
    UsersListContainerComponent
  ]
})
export class UsersModule { }
