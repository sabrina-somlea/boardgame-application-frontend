import { Component } from '@angular/core';
import {BoardGame} from "../../models/boardGames.model";
import {BoardGamesService} from "../../services/boardGames.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {dateValidator} from "../../users/user-registration/date-picker.validation";

@Component({
  selector: 'app-board-games-add',
  templateUrl: './board-games-add.component.html',
  styleUrls: ['./board-games-add.component.css']
})
export class BoardGamesAddComponent {
  actionMessage: string =''
  showActionConfirmation: boolean = false;
  boardGame= {
    name: '',
    description: '',
    year_published:0,
    min_players: 0,
    max_players: 0,
    min_playtime: 0,
    max_playtime: 0
  } as BoardGame;
  constructor(private boardGameService: BoardGamesService,
              private router: Router,private fb: FormBuilder ) { }

  boardGameForm = this.fb.group({
    name: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    YearPublished: ['', [Validators.required]],
    MinPlayers: ['', [Validators.required]],
    MaxPlayers: ['', [Validators.required]],
    MinPlayTime: ['', [Validators.required]],
    MaxPlayTime: ['', [Validators.required]]

  })

  get newBoardGame(): BoardGame {
    const formValue = this.boardGameForm.value;
    return <BoardGame><unknown>{
      description: formValue.Description,
      max_players: formValue.MaxPlayers,
      max_playtime: formValue.MaxPlayTime,
      min_players: formValue.MinPlayers,
      min_playtime: formValue.MinPlayTime,
      year_published: formValue.YearPublished, ...formValue
    };
  }
  addBoardGame() {

    const boardGame = this.newBoardGame;
    console.log('vector board game' + boardGame)
    this.boardGameService
      .addBoardGames(boardGame)
      .subscribe((data:BoardGame) => {
        // alert("New item added successfully!");
        this.showActionConfirmation = true;

        this.actionMessage = "Board game added successfully!"
      })
  }

  cancel(): void {
    this.router.navigate(['/collection']);
  }

  cancelActionModal(): void {
    this.showActionConfirmation = false;
    this.router.navigate(['/collection']);
  }
}
