import { Component } from '@angular/core';
import {BoardGame} from "../../../models/boardGames.model";
import {BoardGamesService} from "../../../services/boardGames.service";
import {UsersService} from "../../../services/users.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import {Router} from "@angular/router";

@Component({
  selector: 'app-board-games-user-collection',
  templateUrl: './board-games-user-collection.component.html',
  styleUrls: ['./board-games-user-collection.component.css']
})
export class BoardGamesUserCollectionComponent {
  boardGames: BoardGame[] = [];
  username: string = '';
  boardGameItem = {} as BoardGame;
  markedForDeletion: BoardGame | undefined;
  markedForDescription: BoardGame | undefined;
  searchResults: BoardGame[] = []
  noResultsMessage: string = "";
  showGamesList: boolean = true;
  sortedData: BoardGame[] | undefined
  pageSize = 10; // Numărul de elemente afișate pe o pagină
  totalItems = 0; // Numărul total de elemente disponibile
  currentPage = 0; // Pagina curentă
  pageSizeOptions = [5, 10, 25, 50];

  constructor(private boardGamesService: BoardGamesService, private userService: UsersService, private tokenStorageService: TokenStorageService, private router: Router) {

  }

  ngOnInit(): void {
    const username = this.tokenStorageService.getUser()
    this.loadUserCollection(username);
    this.boardGamesService.getResults()
      .subscribe(results => {
        this.receiveSearchResults(results);
      });
    // this.sortedData = this.boardGames.slice()
  }

 loadUserCollection(username: string): void {
    this.boardGamesService.viewUserCollection(this.tokenStorageService.getUser())
      .subscribe((data: BoardGame[]) => {
        this.boardGames = data
        this.totalItems = data.length;
      });
  }

  startDelete(boardGameItem: BoardGame): void {
    console.log('s-a accesat startDelete')
    this.markedForDeletion = boardGameItem;
  }

  confirmDelete(): void {
    if (this.markedForDeletion) {
      console.log('a intrat in if confirmdelete')
      this.boardGamesService
        .removeBoardGameFromUserCollection(this.tokenStorageService.getUser(), this.markedForDeletion.id!)

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

  receiveSearchResults(results: BoardGame[]) {
    this.searchResults = results;
    this.showGamesList = false;
    // this.boardGames = results;
    console.log('functia receive' + results)
    console.log(results.length)
    if (results.length === 0) {
      this.noResultsMessage = "This board game does not exist.";
    } else {
      this.noResultsMessage = "We have found " + results.length + " boardgames";
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

  addedAlreadyToCollection(newBoardGame: any): boolean {
    console.log('s-a apelat already added to collection');
    console.log(this.boardGames)
    console.log(this.searchResults)
    return this.boardGames.some(boardGame => newBoardGame.name == boardGame.name);

  }


  showModalGame: any;

  showModal(game: any) {
    this.showModalGame = game;
  }

  closeModal() {
    this.showModalGame = undefined;
  }
  sortData(sort: Sort) {
    const data = this.boardGames.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      console.log(this.sortedData)
      return;
    }

    this.boardGames = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Name':

          return compare(a.name, b.name, isAsc);
        case 'Year Published':
          return compare(a.year_published, b.year_published, isAsc);
        case 'Minimum Players':
          return compare(a.min_players, b.min_players, isAsc);
        case 'Maximum Players':
          return compare(a.max_players, b.max_players, isAsc);
        case 'Minimum Play Time':
          return compare(a.min_playtime, b.min_playtime, isAsc);
        case 'Maximum Play Time':
          return compare(a.max_playtime, b.max_playtime, isAsc);
        default:
          return 0;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  goBackToCollection():void{
    // this.boardGamesService.viewUserCollection(this.tokenStorageService.getUser())
    //   .subscribe((data: BoardGame[]) => {
    //     this.boardGames = data
    //     this.totalItems = data.length;
    //   });
    this.showGamesList = true
    this.router.navigate(['/collection']);
    const username = this.tokenStorageService.getUser()
    this.loadUserCollection(username);
  }


}

function compare(a: String | number, b: String | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

