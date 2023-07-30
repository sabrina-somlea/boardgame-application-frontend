import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BoardGamesSessionsService {
  username: string = "";

  constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) {
  }


}
