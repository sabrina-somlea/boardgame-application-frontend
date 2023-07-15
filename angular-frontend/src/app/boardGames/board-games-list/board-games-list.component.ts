import {Component, OnInit} from '@angular/core';
import {User} from "../../models/users.model";
import {UsersService} from "../../services/users.service";
import {BoardGame} from "../../models/boardGames.model";
import {BoardGamesService} from "../../services/boardGames.service";
import {BoardGameApiModel} from "../../models/boardGameApi.model";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-board-games-list',
  templateUrl: './board-games-list.component.html',
  styleUrls: ['./board-games-list.component.css']
})
export class BoardGamesListComponent implements OnInit{

  boardGames: BoardGame[] = [];
  boardGameItem = {} as BoardGame;
  markedForDeletion: BoardGame | undefined;
  markedForUpdate: BoardGame | undefined;
  showGamesList: boolean = true;
  searchResults: BoardGame[] = []
  noResultsMessage: string = "";
 username: string='';
  constructor(private boardGamesService: BoardGamesService, private userService: UsersService,private tokenStorageService: TokenStorageService ) { }

  ngOnInit(): void {
    this.loadBoardGamesList();
    this.boardGamesService.getResults()
      .subscribe(results => {
        this.receiveSearchResults(results);
      });
    // const retrievedUsername = this.tokenStorageService.getUser();
    // console.log(retrievedUsername)
    // if (retrievedUsername) {
    //   this.username = retrievedUsername;
    //   console.log(this.username)
    // }
  }

  private loadBoardGamesList():void{
    this.boardGamesService.getBoardGames()
      .subscribe((data: BoardGame[])=> this.boardGames = data);
  }

  startDelete(boardGameItem: BoardGame): void {
    this.markedForDeletion = boardGameItem;
  }
  confirmDelete():void{
    if (this.markedForDeletion) {
      this.boardGamesService
        .deleteBoardGame(this.markedForDeletion.id!)
        .subscribe((data) => {
          alert('Board Game deleted successfully!');
          this.markedForDeletion = undefined;
          this.loadBoardGamesList();
          //notification
        });
    }
  }

  cancelDelete(): void {
    this.markedForDeletion = undefined;
  }

  startUpdate(boardGameT: BoardGame): void {
    this.markedForUpdate = boardGameT;
    this.boardGameItem = { ...boardGameT };

  }

  confirmUpdate():void{
    if (this.boardGameItem) {
      this.boardGamesService
        .updateBoardGame(this.boardGameItem)
        .subscribe((data: BoardGame) => {
          alert('Board Game updated successfully!');
          this.markedForUpdate = undefined;
          this.loadBoardGamesList();
          //notification
        });
    }
  }
  cancelUpdate(): void {
    this.markedForUpdate = undefined;
  }

  receiveSearchResults(results: BoardGame[]) {
    this.searchResults = results;
    this.showGamesList = false;
    this.boardGames = results;
    console.log('functia receive' +results)
    console.log(results.length)
    if (results.length === 0) {
      this.noResultsMessage = "This board game does not exist.";
    } else {
      this.noResultsMessage ="We have found " + results.length + " boardgames";
    }
  }
  get hasSearchResults(): boolean {
    return this.searchResults != null && this.searchResults.length > 0;
  }


  addGameToCollection(username: string, boardGame: BoardGame) {
    this.boardGamesService.addGameToCollection(this.tokenStorageService.getUser(), boardGame).subscribe(
      (response) => {
        console.log('Gamed added to users collection');
      },
      (error) => {
        console.log('Eroare. The game could not be added to user collect.');
        console.error(error);
      }
    );
  }
}

