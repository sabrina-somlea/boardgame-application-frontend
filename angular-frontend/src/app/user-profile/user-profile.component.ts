import { Component } from '@angular/core';
import {UsersService} from "../services/users.service";
import {User} from "../models/users.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  currentUser: any;
  // currentUser$: Observable<User>;
  isEditing = false;
  editedUser: any;
  oldPassword: string = ''
  newPassword: string = ''
  showNotification: boolean = false
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    // this.currentUser$ = this.userService.getUserInfo();
   this.viewUserDetails()

  }

  viewUserDetails(): void{
    this.userService.getUserInfo().subscribe(
      (user: User) => {
        this.currentUser = user;
        this.editedUser = { ...user };
        console.log(this.currentUser)
        console.log(this.editedUser)
  },
      (error: any) => {
        console.error('Could not get user info', error);
      })
}

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.editedUser = { ...this.currentUser }; // copiem datele utilizatorului pentru a le edita separat
  }

  saveChanges(): void {
    this.userService.updateUserInfo(this.editedUser).subscribe(
      (user: User) => {
        this.currentUser = user; // Actualizăm currentUser cu datele utilizatorului actualizat din server
        this.isEditing = false;
      },
      (error: any) => {
        console.error('Eroare la salvarea detaliilor utilizatorului:', error);
      });
  }

  updatePassword() {
    const userId = this.currentUser.id
    console.log(userId);
        this.userService.updatePassword(userId, this.oldPassword, this.newPassword).subscribe(
          response => {
            console.log('Password updated successfully');
            this.showNotification = true;
          });
      }

  closeNotification() {
    this.showNotification = false;
  }
  }


