import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {RouterOutlet, Routes} from "@angular/router";
import { UsersListComponent } from './users/users-list/users-list.component';
import {UsersService} from "./services/users.service";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { UserRegistrationComponent } from './users/user-registration/user-registration.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { UserLoginComponent } from './users/user-login/user-login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoardGamesListComponent } from './boardGames/board-games-list/board-games-list.component'
import {BoardGamesService} from "./services/boardGames.service";
import { BoardGamesAddComponent } from './boardGames/board-games-add/board-games-add.component';
import { BoardGamesSearchComponent } from './boardGames/board-games-search/board-games-search.component';
import {JwtHelperService} from "@auth0/angular-jwt";
import { BoardGamesUserCollectionComponent } from './boardGames/board-games-list/board-games-user-collection/board-games-user-collection.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    HeaderComponent,
    DashboardComponent,
    BoardGamesListComponent,
    BoardGamesAddComponent,
    BoardGamesSearchComponent,
    BoardGamesUserCollectionComponent,
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
        NoopAnimationsModule,
        FontAwesomeModule,
        FormsModule,

    ],
  providers: [UsersService, BoardGamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
