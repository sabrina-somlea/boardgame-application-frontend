import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {BoardGame} from "../models/boardGames.model";
import {Observable} from "rxjs";
import {BoardGameSessionModel} from "../models/boardGameSession.model";
import {User} from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class BoardGamesSessionsService {
  username: string = "";
  private boardGameSessionUrl = "http://localhost:8080/api/v1/addBoardGamesSessions"

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  addBoardGameSession(boardGameSession: BoardGameSessionModel): Observable<BoardGameSessionModel>{
    const token = this.tokenStorageService.getToken();
    console.log(token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .post<BoardGameSessionModel>(this.boardGameSessionUrl, boardGameSession, { headers });
  }
  getBoardGamesSessionsByUsername (username: string) : Observable<BoardGameSessionModel[]>{
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/${username}/viewBoardGamesSessions`;
    return this.httpClient.get<BoardGameSessionModel[]>(url, {headers});
  }

  updateBoardGameSession (boardGameSession: BoardGameSessionModel): Observable<BoardGameSessionModel> {
    const url = `http://localhost:8080/api/v1/session/`;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<BoardGameSessionModel>(`http://localhost:8080/api/v1/session/${boardGameSession.id}`, boardGameSession,  { headers })
  }

}
