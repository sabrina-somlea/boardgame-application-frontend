import { Component } from '@angular/core';
import {BoardGame} from "../../models/boardGames.model";
import {User} from "../../models/users.model";
import {BoardGamesService} from "../../services/boardGames.service";
import {UsersService} from "../../services/users.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {UserFriendsService} from "../../services/user-friends.service";

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {
  friendsList: User[] = [];
  userList: User [] = [];
  username: string='';
  searchQuery: any;
  isSearching = false;

  constructor(private userFriendsService: UserFriendsService, private userService: UsersService,private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    const username = this.tokenStorageService.getUser()
    this.getFriendsList(username);
  }
 getFriendsList(username: string):void {
    this.userFriendsService.viewUserFriends(this.tokenStorageService.getUser())
      .subscribe((data: User[])=> { this.friendsList = data});
    this.isSearching=false;
  }

  getTotalFriendsCount(): number {
    return this.friendsList.length;
  }

 searchFriends(searchQuery: string):void {
    this.userFriendsService.searchFriends(searchQuery)
      .subscribe((data: User[])=> { this.userList = data});
   this.isSearching = true;
    console.log(this.userList)
  }

}
