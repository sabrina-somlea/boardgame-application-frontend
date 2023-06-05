import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  // public saveToken(token: string) {
  //   window.sessionStorage.removeItem(TOKEN_KEY);
  //   window.sessionStorage.setItem(TOKEN_KEY, token);
  // }
  public saveToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
    console.log('aici merge',jwtToken)
  }
  // public getToken(): string | null {
  //   return window.sessionStorage.getItem(TOKEN_KEY);
  // }
  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem('jwtToken');
  }

  // public saveUser(user: any): void {
  //   window.sessionStorage.removeItem(USER_KEY);
  //   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  // }
  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
