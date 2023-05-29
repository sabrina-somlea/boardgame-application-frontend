import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {dateValidator} from "../user-registration/date-picker.validation";
import {UsersService} from "../users.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  loginUserData={}
  // get username() {
  //   return this.loginForm.get('username');
  // }
  // get password() {
  //   return this.loginForm.get('password');
  // }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }


  loginUser(){
      // this.authService.loginUser(this.loginForm.get('password')?.value, this.passwordz);
    }

  // loginForm: any = {
  //   username: null,
  //   password: null
  // };
  loginForm: any = this.fb.group({
    username: ['', [Validators.required ]],
    password: ['', [Validators.required]],
  });

  login(username:string, password:string): void {
    // const { username, password } = this.loginForm;

    this.authService.loginUser(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}

