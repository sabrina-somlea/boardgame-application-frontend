import { Component } from '@angular/core';
import {BoardGame} from "../../../models/boardGames.model";
import {BoardGamesService} from "../../../services/boardGames.service";
import {UsersService} from "../../../services/users.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-board-games-user-collection',
  templateUrl: './board-games-user-collection.component.html',
  styleUrls: ['./board-games-user-collection.component.css']
})
export class BoardGamesUserCollectionComponent {
  boardGames: BoardGame[] = [];
  username: string='';
  boardGameItem = {} as BoardGame;
  markedForDeletion: BoardGame | undefined;
  constructor(private boardGamesService: BoardGamesService, private userService: UsersService,private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    const username = this.tokenStorageService.getUser()
    this.loadUserCollection(username);
  }
 private loadUserCollection(username: string):void {
    this.boardGamesService.viewUserCollection(this.tokenStorageService.getUser())
      .subscribe((data: BoardGame[])=> { this.boardGames = data});
}

  startDelete(boardGameItem: BoardGame): void {
    console.log('s-a accesat startDelete')
    this.markedForDeletion = boardGameItem;
  }
  confirmDelete():void{
    if (this.markedForDeletion) {
      console.log('a intrat in if confirmdelete')
      this.boardGamesService
        .removeBoardGameFromUserCollection(this.tokenStorageService.getUser(),this.markedForDeletion.id!)

        .subscribe((data) => {
          alert('Board Game removed successfully!');
          this.markedForDeletion = undefined;
          const username = this.tokenStorageService.getUser()
          this.loadUserCollection(username);
          //notification
        });
    }
  }

  cancelDelete(): void {
    this.markedForDeletion = undefined;
  }
}
