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
  userFriendsRequests: User [] = [];
  userFriendsRequestsSent: User [] = [];
  username: string='';
  searchQuery: any;
  isSearching = false;
  onFriendsRequests = false;
  onFriendsRequestsSent = false;
  markedForDeletion: User | undefined;
  markedForAccept: User | undefined;
  markedForFriendRequest: User | undefined;
  constructor(private userFriendsService: UserFriendsService, private userService: UsersService,private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    const username = this.tokenStorageService.getUser()
    this.getFriendsList(username);
    this.getFriendsRequestsSentByUsername(username)
  }
 getFriendsList(username: string):void {
    this.userFriendsService.viewUserFriends(this.tokenStorageService.getUser())
      .subscribe((data: User[])=> { this.friendsList = data});
    this.isSearching=false;
    this.onFriendsRequests=false;
   this.onFriendsRequestsSent = false;
    console.log(this.friendsList)
  }

  getTotalFriendsCount(): number {
    return this.friendsList.length;
  }

 searchFriends(username: string):void {
    this.userFriendsService.searchFriends(username)
      .subscribe((data: User[])=> { this.userList = data});
   this.isSearching = true;
    console.log(this.userList)
  }

  getFriendsRequests(username: string):void {
    this.userFriendsService.getFriendsRequests(this.tokenStorageService.getUser())
      .subscribe((data: User[])=> { this.userFriendsRequests = data});
    this.onFriendsRequests = true;
    console.log(this.userFriendsRequests)
  }

  startDelete(deniedUser: User): void {
    console.log('s-a accesat startDelete')
    this.markedForDeletion = deniedUser;
  }
  confirmDeleteFriendRequest():void{
    if (this.markedForDeletion) {
      console.log('a intrat in if confirmdelete')
      this.userFriendsService.declineFriendRequest(this.tokenStorageService.getUser(),this.markedForDeletion.id!)

        .subscribe((data) => {
          alert('Friend request deleted successfully!');
          this.markedForDeletion = undefined;
          const username = this.tokenStorageService.getUser()
          this.getFriendsList(username);
          //notification
        });
    }
  }
  confirmDeleteFriendRequestSent():void{
    if (this.markedForDeletion) {
      console.log('a intrat in if confirmdelete')
      this.userFriendsService.removeFriendRequest(this.markedForDeletion.id!, this.tokenStorageService.getUser())

        .subscribe((data) => {
          alert('Friend request deleted successfully!');
          this.markedForDeletion = undefined;
          const username = this.tokenStorageService.getUser()
          this.getFriendsList(username);
          this.getFriendsRequestsSentByUsername(username)
          //notification
        });
    }
  }

  confirmDeleteFriend():void{
    if (this.markedForDeletion) {
      console.log('a intrat in if confirmdelete')
      this.userFriendsService.deleteFriend(this.tokenStorageService.getUser(),this.markedForDeletion.id!)
        .subscribe((data) => {
          alert('Friend  deleted successfully!');
          this.markedForDeletion = undefined;
          const username = this.tokenStorageService.getUser()
          this.getFriendsList(username);
          //notification
        });
    }
  }

  cancelDelete(): void {
    this.markedForDeletion = undefined;
  }

  isFriend(user: any): boolean {
    console.log('s-a apelat is friend');
    return this.friendsList.some(friend => friend.id == user.id);
  }

  hasSentRequest(user: any): boolean {
    return this.userFriendsRequestsSent.some(friend => user.id == friend.id);
  }


  isCurrentUser(user: any): boolean {
    console.log('s-a apelat current user');
    const currentUser = this.tokenStorageService.getUser();
    console.log('user-ul este' + currentUser);
    return currentUser === user.username;
  }

  acceptFriendRequest(acceptedUser: User): void{
    this.markedForAccept = acceptedUser;
    console.log('fucntia accept driend' + this.markedForAccept)
    if (this.markedForAccept) {
      console.log('a intrat in if accept friend')
      this.userFriendsService.acceptFriendRequest(this.tokenStorageService.getUser(),this.markedForAccept.id!)
        .subscribe((data) => {
          alert('Request accepted!');
          this.markedForAccept = undefined;
          const username = this.tokenStorageService.getUser()
          this.getFriendsRequests(username);

  });

}
  }

  sendFriendRequest(requestedUser: User): void{
    this.markedForFriendRequest = requestedUser;
    if (this.markedForFriendRequest) {
      this.userFriendsService.sendFriendRequest(this.tokenStorageService.getUser(),this.markedForFriendRequest.id!)
        .subscribe((data) => {
          alert('Request sent!');
          this.markedForFriendRequest = undefined;
          const username = this.tokenStorageService.getUser()
          this.getFriendsRequestsSentByUsername(username);

        });

    }
  }

  getFriendsRequestsSentByUsername(username: string):void {
    this.userFriendsService.getFriendsRequestsSent(this.tokenStorageService.getUser())
      .subscribe((data: User[])=> { this.userFriendsRequestsSent = data});
    this.onFriendsRequestsSent = true;
    console.log(this.userFriendsRequestsSent)
  }
}
