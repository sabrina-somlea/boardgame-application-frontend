import {Component, OnInit} from '@angular/core';
import {User} from "../../models/users.model";
import {UsersService} from "../../services/users.service";
import {BoardGame} from "../../models/boardGames.model";
import {BoardGamesService} from "../../services/boardGames.service";

@Component({
  selector: 'app-board-games-list',
  templateUrl: './board-games-list.component.html',
  styleUrls: ['./board-games-list.component.css']
})
export class BoardGamesListComponent implements OnInit{

  boardGames: BoardGame[] = [];

  constructor(private boardGamesService: BoardGamesService) { }

  ngOnInit(): void {
    console.log(this.loadBoardGamesList())
  }

  private loadBoardGamesList():void{
    this.boardGamesService.getBoardGames()
      .subscribe((data: BoardGame[])=> this.boardGames = data);
  }
}
