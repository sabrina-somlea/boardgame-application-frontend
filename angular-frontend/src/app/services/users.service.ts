import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, debounceTime, delay, map, Observable, of} from "rxjs";
import {User} from "../models/users.model";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {JwtHelperService} from "@auth0/angular-jwt";

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
  constructor(private httpClient:HttpClient) { this.jwtHelper = new JwtHelperService();
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
      .post<User>(this.userUrl, user)

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

}

