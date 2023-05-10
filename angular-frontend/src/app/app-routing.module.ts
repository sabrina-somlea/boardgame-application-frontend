import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import{User} from "./users/users.model";
import {UsersComponent} from "./users/users.component";
import {UsersListComponent} from "./users/users-list/users-list.component";
import {UserRegistrationComponent} from "./users/user-registration/user-registration.component";

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  { path: 'user-registration', component: UserRegistrationComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
