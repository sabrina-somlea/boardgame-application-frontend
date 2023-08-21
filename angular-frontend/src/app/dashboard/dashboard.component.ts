import { Component } from '@angular/core';
import {UsersService} from "../services/users.service";
import {TokenStorageService} from "../services/token-storage.service";
import {User} from "../models/users.model";
import * as moment from "moment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  topGames: any = {};
  currentUser: any;
  userId: String | undefined = '';
  userFirstname: String | undefined = '';
  noSessionsPlayed: number =0;
  noSessionsWon: number =0;
  friends: number =0;
  noOfBoardGames: number =0;
  constructor(private userService: UsersService, private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    const username = this.tokenStorageService.getUser()
    this.userService.getTopPlayedGames(username).subscribe(
      (data) => {
        this.topGames = data;
        console.log(this.topGames);
      },
      (error) => {
        console.error(error);
      }
    );
    this.getUserDetails();
    // this.getUserNumberOfSessionsPlayed();
  }
  getUserDetails(): void{
    this.userService.getUserInfo().subscribe(
      (user: User) => {
        this.currentUser = user;
        this.userId = user.id;
        this.userFirstname = user.firstName
        console.log(this.userId);
        this.getUserNumberOfSessionsPlayed();
        this.getUserNumberOfSessionsWon();
        this.getUserNumberOfFriends();
        this.getUserNumberOfBoardGames();
      },
      (error: any) => {
        console.error('Could not get user info', error);
      })
  }

  getUserNumberOfSessionsPlayed(): void{
    this.userService.getBoardGameSessionsPlayed(this.userId).subscribe(
      (data) => {
       this.noSessionsPlayed = data;
       console.log(this.noSessionsPlayed)
      },
      (error: any) => {
        console.error('Could not get no of sessions played', error);
      })
  }
  getUserNumberOfSessionsWon(): void{
    this.userService.getBoardGameSessionsWon(this.userId).subscribe(
      (data) => {
        this.noSessionsWon = data;

      },
      (error: any) => {
        console.error('Could not get no of sessions won', error);
      })
  }
  getUserNumberOfFriends(): void{
    this.userService.getUserFriendsNumber(this.userId).subscribe(
      (data) => {
        this.friends = data;

      },
      (error: any) => {
        console.error('Could not get no of friends', error);
      })
  }
  getUserNumberOfBoardGames(): void{
    this.userService.getUserBoardGamesNumber(this.userId).subscribe(
      (data) => {
        this.noOfBoardGames= data;

      },
      (error: any) => {
        console.error('Could not get no of board games', error);
      })
  }
}
