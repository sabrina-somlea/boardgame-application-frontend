import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {BoardGame} from "../models/boardGames.model";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {TokenStorageService} from "./token-storage.service";

// @Injectable({
//     providedIn: 'root'
//   }
// )
@Injectable()

export class BoardGamesService {


  private boardGamesUrl = "http://localhost:8080/api/v1/boardgames"
  private boardGamesSearchUrl = "http://localhost:8080/api/v1/boardgames/search"
  private removeBoardGameUrl = "http://localhost:8080/api/v1";
  private searchResults: Subject<BoardGame[]> = new Subject<BoardGame[]>();
  username: string ="";
  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  getBoardGames(): Observable<BoardGame[]>{
    const token = this.tokenStorageService.getToken();
    console.log('token ok',token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<BoardGame[]>(this.boardGamesUrl, { headers });
  }

  addBoardGames(boardGame: BoardGame): Observable<BoardGame>{
    const token = this.tokenStorageService.getToken();
    console.log(token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .post<BoardGame>(this.boardGamesUrl, boardGame, { headers });
  }
  updateBoardGame(boardGameItem: BoardGame): Observable<BoardGame> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<BoardGame>(`${this.boardGamesUrl}/${boardGameItem.id}`,boardGameItem, {headers} )

  }

  deleteBoardGame(id: String): Observable<BoardGame> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<BoardGame>(`${this.boardGamesUrl}/${id}`, {headers});
  }
  searchBoardGame (name: string) : Observable<BoardGame[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get<BoardGame[]>(this.boardGamesSearchUrl + '?name='+ name, { headers });
  }
  setResults(results: BoardGame[]) {
    this.searchResults.next(results);
  }

  getResults() {
    return this.searchResults.asObservable();
  }

  addGameToCollection(username: string, boardGame: BoardGame) {
    const token = this.tokenStorageService.getToken();
    console.log('token ok',token)
     username = this.tokenStorageService.getUser()
    console.log('citeste' + username)
    console.log(boardGame)
    // boardGame.username = username;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/${username}/addToCollection`;
    return this.httpClient.post<string>(url, boardGame, { headers });
  }

  viewUserCollection (username: string): Observable<BoardGame[]>{
    const token = this.tokenStorageService.getToken();
    username = this.tokenStorageService.getUser()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/${username}/viewCollection`;
    return this.httpClient.get<BoardGame[]>(url,  { headers });
  }
  removeBoardGameFromUserCollection(username: String, boardgame_id: String): Observable<BoardGame> {
    const token = this.tokenStorageService.getToken();
    const usernameL = this.tokenStorageService.getUser()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete<BoardGame>(`${this.removeBoardGameUrl}/users/${username}/boardgames/${boardgame_id}`, {headers});
  }
}
