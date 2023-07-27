import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Observable} from "rxjs";
import {BoardGame} from "../models/boardGames.model";
import {User} from "../models/users.model";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class UserFriendsService {

  username: string = "";

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  viewUserFriends(username: string): Observable<User[]> {
    const token = this.tokenStorageService.getToken();
    username = this.tokenStorageService.getUser()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/${username}/user-friends-list`;
    return this.httpClient.get<User[]>(url, {headers});
  }

  searchFriends(searchQuery: string): Observable<User[]> {
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/searchUser?searchQuery=${searchQuery}`;
    return this.httpClient.get<User[]>(url, {headers});
  }
}
