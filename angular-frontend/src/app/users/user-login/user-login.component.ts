import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {dateValidator} from "../user-registration/date-picker.validation";
import {UsersService} from "../../services/users.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import { TokenStorageService } from '../../services/token-storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginUserData={}
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  username:string="";
  constructor(private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) {
  }
  //
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard'])
    }
  }

  loginForm: any = this.fb.group({
    username: ['', [Validators.required ]],
    password: ['', [Validators.required]],
  });

  login(username:string, password:string): void {

    this.authService.loginUser(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        console.log(data.token)
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log(data.accessToken)
        // this.reloadPage();
        this.router.navigate(['/dashboard']);
      },
      err => {
        if (err.status === 403) {
          this.errorMessage = "Access denied: Invalid username or password!";
        } else {
          this.errorMessage = "An error occurred. Please try again later.";
        }
        this.isLoginFailed = true;
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

  public logout(){
    this.tokenStorage.signOut();
    // this.router.navigate(['/']);
    this.reloadPage();
  }

  addNewUser(){
  this.router.navigate(['/user-registration']);
   }
}

