import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {RouterOutlet} from "@angular/router";
import { UsersListComponent } from './users/users-list/users-list.component';
import {UsersService} from "./users/users.service";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";




@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    UserRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
   MatNativeDateModule,
    NoopAnimationsModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
