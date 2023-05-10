import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./users.model";

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

  // checkUser(username: string){
  //   return this.httpClient
  //     .get(`${this.userUrl}/check-username?username=${username}`);
  // }


  }
