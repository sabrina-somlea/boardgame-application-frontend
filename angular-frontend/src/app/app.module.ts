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
import { FriendsListComponent } from './user-friends/friends-list/friends-list.component';
import {UserFriendsService} from "./services/user-friends.service";
import { BoardGamesSessionsComponent } from './board-games-add-sessions/board-games-sessions.component';
import {BoardGamesSessionsService} from "./services/boardGamesSessions.service";
import { BoardGamesSessionsListComponent } from './board-games-sessions-list/board-games-sessions-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { FriendsProfileComponent } from './user-friends/friends-profile/friends-profile.component';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";


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
    FriendsListComponent,
    BoardGamesSessionsComponent,
    BoardGamesSessionsListComponent,
    UserProfileComponent,
    FriendsProfileComponent,
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
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule

  ],
  providers: [UsersService, BoardGamesService, UserFriendsService, BoardGamesSessionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
