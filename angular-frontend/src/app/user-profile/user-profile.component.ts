import {Component, ViewChild} from '@angular/core';
import {UsersService} from "../services/users.service";
import {User} from "../models/users.model";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import * as moment from "moment/moment";

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
  @ViewChild('userForm', { static: false }) userForm: NgForm | undefined;
  ngOnInit(): void {
    // this.currentUser$ = this.userService.getUserInfo();
   this.viewUserDetails()

  }

  viewUserDetails(): void{
    this.userService.getUserInfo().subscribe(
      (user: User) => {
        const date = moment(user.birthday).format('YYYY-MM-DD');
        user.birthday = date;
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
    this.editedUser = { ...this.currentUser };
  }

  saveChanges(): void {
    if (this.userForm?.valid) {
      this.userService.updateUserInfo(this.editedUser).subscribe(
        (user: User) => {
          this.currentUser = user;
          this.isEditing = false;
        },
        (error: any) => {
          console.error('Eroare la salvarea detaliilor utilizatorului:', error);
        }
      );
    }
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


