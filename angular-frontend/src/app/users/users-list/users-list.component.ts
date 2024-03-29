import { Component } from '@angular/core';
import {User} from "../../models/users.model";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  users: User[] = [];
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(users => this.users = users);
  }
}
