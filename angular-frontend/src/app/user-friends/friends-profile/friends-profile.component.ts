import { Component } from '@angular/core';
import {UsersComponent} from "../../users/users.component";
import {User} from "../../models/users.model";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-friends-profile',
  templateUrl: './friends-profile.component.html',
  styleUrls: ['./friends-profile.component.css']
})
export class FriendsProfileComponent {
  memberId: String | undefined;
memberInfo?: User;
  userFirstname: String | undefined = '';
  noSessionsPlayed: number =0;
  noSessionsWon: number =0;
  friends: number =0;
  noOfBoardGames: number =0;
  topGames: any = {};
  constructor(private userService: UsersService,private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.memberId = params['id'];
    });
  }

  ngOnInit(): void {

    this.userService.getBoardGameSessionsPlayed(this.memberId).subscribe(
      (data) => {
        this.noSessionsPlayed = data;
        console.log(this.noSessionsPlayed)
      },
      (error: any) => {
        console.error('Could not get no of sessions played', error);
      })
    console.log();
    //
    this.userService.getBoardGameSessionsWon(this.memberId).subscribe(
      (data) => {
        this.noSessionsWon = data;

      },
      (error: any) => {
        console.error('Could not get no of sessions won', error);
      });
    //
    this.userService.getUserFriendsNumber(this.memberId).subscribe(
      (data) => {
        this.friends = data;

      },
      (error: any) => {
        console.error('Could not get no of friends', error);
      });
    //
    this.userService.getUserBoardGamesNumber(this.memberId).subscribe(
      (data) => {
        this.noOfBoardGames= data;

      },
      (error: any) => {
        console.error('Could not get no of board games', error);
      })
  }
}
