import { Component } from '@angular/core';
import {TokenStorageService} from "../services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private tokenStorageService: TokenStorageService, private router:Router ) {
  }
  public logout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['/']);
  }
}
