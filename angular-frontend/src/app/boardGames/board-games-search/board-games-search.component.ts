import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BoardGamesService} from "../../services/boardGames.service";

@Component({
  selector: 'app-board-games-search',
  templateUrl: './board-games-search.component.html',
  styleUrls: ['./board-games-search.component.css']
})
export class BoardGamesSearchComponent {
  @Output() searchCompleted: EventEmitter<any[]> = new EventEmitter<any[]>();

  showResults: boolean = false;
  searchResults: any[] | undefined;
  searchTerm: any;
  noResultsMessage: string = "";

  constructor(private http: HttpClient, private boardGamesService: BoardGamesService) {}

  search(searchTerm: string) {
    this.boardGamesService.searchBoardGame(searchTerm)
      .subscribe(
        response => {
          this.searchResults = response;
          this.showResults = true;
          this.boardGamesService.setResults(response);
          console.log('ok, functia merge');
          console.log(response);
        },
        error => {

          console.error(error);
        }
      );
  }
}
