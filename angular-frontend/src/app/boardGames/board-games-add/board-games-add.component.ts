import { Component } from '@angular/core';
import {BoardGame} from "../../models/boardGames.model";
import {BoardGamesService} from "../../services/boardGames.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-games-add',
  templateUrl: './board-games-add.component.html',
  styleUrls: ['./board-games-add.component.css']
})
export class BoardGamesAddComponent {
  boardGame= {
    name: '',
    description: '',
    yearPublished:0,
    minPlayers: 0,
    maxPlayers: 0,
    minPlayTime: 0,
    maxPlayTime: 0
  } as BoardGame;
  constructor(private boardGameService: BoardGamesService,
              private router: Router) { }

  addBoardGame() {
    this.boardGameService
      .addBoardGames(this.boardGame)
      .subscribe((data:BoardGame) => {
        alert("New item added successfully!");
        this.router.navigate(['/boardgames']);
      })
  }

  cancel(): void {
    this.router.navigate(['/boardgames']);
  }
}