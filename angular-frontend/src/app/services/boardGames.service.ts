import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
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
}
