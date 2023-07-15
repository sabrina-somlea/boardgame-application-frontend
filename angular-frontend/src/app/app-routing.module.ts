import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import{User} from "./models/users.model";
import {UsersComponent} from "./users/users.component";
import {UsersListComponent} from "./users/users-list/users-list.component";
import {UserRegistrationComponent} from "./users/user-registration/user-registration.component";
import {UserLoginComponent} from "./users/user-login/user-login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BoardGamesListComponent} from "./boardGames/board-games-list/board-games-list.component";
import {BoardGamesAddComponent} from "./boardGames/board-games-add/board-games-add.component";
import {
  BoardGamesUserCollectionComponent
} from "./boardGames/board-games-list/board-games-user-collection/board-games-user-collection.component";

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  { path: 'user-registration', component: UserRegistrationComponent },
  {path: '', component: UserLoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'boardgames', component: BoardGamesListComponent},
  {path: 'boardgames/add', component: BoardGamesAddComponent},
  {path: 'collection', component: BoardGamesUserCollectionComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
