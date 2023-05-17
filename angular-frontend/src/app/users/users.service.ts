import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {debounceTime, delay, map, Observable, of} from "rxjs";
import {User} from "./users.model";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userUrl = "http://localhost:8080/users"
  constructor(private httpClient:HttpClient) { }
  getUsers(): Observable<User[]>{
    return this.httpClient
      .get<Array<User>>(this.userUrl);
  }

  saveUser(user: User): Observable<User> {
    return this.httpClient
      .post<User>(this.userUrl, user);
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
    const url= `http://localhost:8080/check-username?username=${username}`;
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
}

