import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/users.model";
import {map, Observable, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

const userLoginUrl = "http://localhost:8080/api/v1/auth/authenticate"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
  }
)

export class AuthService {

  helper = new JwtHelperService();
  username: string ="";
  constructor(private httpClient: HttpClient) {
  }

  loginUser(username: string, password: string): Observable<any>{
    return  this.httpClient.post(userLoginUrl, {username, password}, httpOptions)
      // .pipe(
      // map((response:any) => {
      //   const decodedToken = this.helper.decodeToken(response.token);
      //   this.username = response.username;
      //   localStorage.setItem('token', response.token);
      //   return username;
      //   console.log(username)
      }

  }


