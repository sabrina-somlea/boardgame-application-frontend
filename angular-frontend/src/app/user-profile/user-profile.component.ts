import {Component, ViewChild} from '@angular/core';
import {UsersService} from "../services/users.service";
import {User} from "../models/users.model";
import {Observable} from "rxjs";
import {FormBuilder, NgForm, Validators} from "@angular/forms";
import * as moment from "moment/moment";
import { dateValidator } from '../users/user-registration/date-picker.validation';
import {PasswordValidator} from "../users/user-registration/password.validator";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  dateValidator = dateValidator;
  currentUser: any;
  // currentUser$: Observable<User>;
  isEditing = false;
  editedUser: any;
  oldPassword: string = ''
  password: string = ''
  confirmPassword: string = ''
  showNotification: boolean = false
  showErrorNotification: boolean = false
  maxDate:any;
  minDate:any;
  errorMessage = '';
  constructor(private userService: UsersService, private fb: FormBuilder) { }
  @ViewChild('userForm', { static: false }) userForm: NgForm | undefined;
  ngOnInit(): void {
    // this.currentUser$ = this.userService.getUserInfo();
   this.viewUserDetails()
    this.futureDateDisable();
    this.pastDateDisable();
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
    const formData = this.changePasswordForm.value;
    console.log(userId);
        this.userService.updatePassword(userId, formData.oldPassword, formData.password).subscribe(
          response => {
            console.log('Password updated successfully');
            this.showNotification = true;
          },
          err => {
            if (err.status === 403) {
              this.showErrorNotification = true;
            } else {
              this.errorMessage = "An error occurred. Please try again later.";
            }

          });
      }

  closeNotification() {
    this.showNotification = false;
    this.showErrorNotification = false;
  }

  futureDateDisable(){
    let date:any = new Date();
    let todayDate:any= date.getDate();
    let month:any=date.getMonth() + 1;
    let year:any =date.getFullYear();

    if(todayDate < 10){
      todayDate = "0" + todayDate;
    }
    if(month < 10){
      month = "0" + month;
    }
    this.maxDate = year + "-" + month + "-" + todayDate;
    console.log(this.maxDate);
  }

  pastDateDisable(){
    let date:any = new Date();
    let todayDate:any= date.getDate();
    let month:any=date.getMonth() + 1;
    let year:any =date.getFullYear() -150;

    if(todayDate < 10){
      todayDate = "0" + todayDate;
    }
    if(month < 10){
      month = "0" + month;
    }
    this.minDate = year + "-" + month + "-" + todayDate;
    console.log(this.maxDate);
  }

  changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],

  }, {validator: PasswordValidator});

  }


