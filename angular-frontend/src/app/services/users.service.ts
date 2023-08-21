import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, debounceTime, delay, map, Observable, of} from "rxjs";
import {User} from "../models/users.model";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenStorageService} from "./token-storage.service";
import {BoardGameSessionModel} from "../models/boardGameSession.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private jwtHelper: JwtHelperService;
  private userUrl = "http://localhost:8080/api/v1/auth/register"
  private welcomePage = "http://localhost:8080/api/v1/welcome"
  private userLoginUrl = "http://localhost:8080/api/v1/auth/authenticate"
  constructor(private httpClient:HttpClient, private tokenStorageService: TokenStorageService) { this.jwtHelper = new JwtHelperService();
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();}

  public get userValue() {
    return this.userSubject.value;
  }
  getUsers(): Observable<User[]>{
    return this.httpClient
      .get<Array<User>>(this.userUrl);
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(this.userUrl, user,   {
        // headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
        // reportProgress: true,
        // responseType: 'json',
      })

  }


  checkUser(username: string): Observable<{ usernameTaken: boolean } | null> {
    return this.httpClient.get<boolean>(`/check-username?username=${username}`).pipe(
      map(res => {
        // if res is true, username exists, return true
        console.log('usernameTaken')
        return res ? { usernameTaken: true } : null;
        // NB: Return null if there is no error
      })

    );
  };

  checkIfUsernameExists (username:string) :  Observable<boolean>{
    const url= `http://localhost:8080/api/v1/check-username?username=${username}`;
    // const params = new HttpParams().set('username', username);
    return this.httpClient.get<boolean>(url);
  }


  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map(res => {
          console.log(res + "raspuns");
          // if res is true, username exists, return true
          return res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }

  getWelcomeMessage():Observable<any>{
    return this.httpClient
      .get(this.welcomePage, { responseType: 'text' });
  }
  private decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
  private getUserData(): any {
    return JSON.parse(localStorage.getItem('sub')!);
  }

  getUsername(): string | undefined {
    const user = this.userValue;
    if (user) {
      return this.decodeToken(this.getUserData().token).sub;
    }
    return undefined;
  }
  getUserInfo (): Observable<User>{
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8080/api/v1/userLoggedIn`;
    return this.httpClient.get<User>(url,  { headers });
  }

  updateUserInfo (user: User): Observable<User> {
    const url = `http://localhost:8080/api/v1/users/`;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put<User>(`http://localhost:8080/api/v1/users/${user.username}`, user,  { headers })
  }

  updatePassword(userId: String, initialPassword: string, newPassword: string) {
    const body = { initialPassword, newPassword };
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put(`http://localhost:8080/api/v1/users/id=${userId}`, body, {headers});
  }

  getTopPlayedGames(username: String): Observable<any> {
    const url = `http://localhost:8080/api/v1/${username}/top-games`;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(url, {headers});
  }

  getBoardGameSessionsPlayed(userId: String | undefined): Observable<any> {
  const url = `http://localhost:8080/api/v1/${userId}/played-sessions-count`;
  const token = this.tokenStorageService.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.httpClient.get(url, {headers});
}

  getBoardGameSessionsWon(userId: String | undefined): Observable<any> {
    const url = `http://localhost:8080/api/v1/${userId}/won-sessions-count`;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(url, {headers});
  }

  getUserFriendsNumber(userId: String | undefined): Observable<any> {
    const url = `http://localhost:8080/api/v1/${userId}/friends-count`;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(url, {headers});
  }

  getUserBoardGamesNumber(userId: String | undefined): Observable<any> {
    const url = `http://localhost:8080/api/v1/${userId}/boardgames-count`;
    const token = this.tokenStorageService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(url, {headers});
  }
}

