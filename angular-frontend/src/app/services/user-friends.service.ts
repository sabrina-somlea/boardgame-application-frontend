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

  getFriendsRequests (username: string) : Observable<User[]>{
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/${username}/user-friend-requests`;
    return this.httpClient.get<User[]>(url, {headers});
  }

  declineFriendRequest (username: string, deniedUserId: String) : Observable<User> {
    const token = this.tokenStorageService.getToken();
    username = this.tokenStorageService.getUser()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/decline-friend-request${username}/${deniedUserId}`;

    return this.httpClient.delete<User>(url, {headers});
  }

  removeFriendRequest (deniedUserId: String,username: string,) : Observable<User> {
    const token = this.tokenStorageService.getToken();
    username = this.tokenStorageService.getUser()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/remove-friend-request/${deniedUserId}/${username}`;

    return this.httpClient.delete<User>(url, {headers});
  }
  deleteFriend (username: string, deniedUserId: String) : Observable<User> {
    const token = this.tokenStorageService.getToken();
    username = this.tokenStorageService.getUser()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/delete-friend/${username}/${deniedUserId}`;

    return this.httpClient.delete<User>(url, {headers});
  }

  acceptFriendRequest (username: string, acceptedUserId: String){
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/accept-friend-request/${username}/${acceptedUserId}`;
    return this.httpClient.post(url,{headers}, {headers});
  }

  sendFriendRequest (username: string, requestedUserId: String){
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/send-friend-request/${username}/${requestedUserId}`;
    return this.httpClient.post(url,{headers}, {headers});
  }
  getFriendsRequestsSent (username: string) : Observable<User[]>{
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/${username}/user-friend-requests-sent`;
    return this.httpClient.get<User[]>(url, {headers});
  }
}
