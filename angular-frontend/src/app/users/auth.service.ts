import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./users.model";
import {Observable, tap} from "rxjs";

const userLoginUrl = "http://localhost:8080/api/v1/auth/authenticate"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
  }
)

export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  loginUser(username: string, password: string): Observable<any>{
    return  this.httpClient.post(userLoginUrl, {username, password}, httpOptions)

  }

}
