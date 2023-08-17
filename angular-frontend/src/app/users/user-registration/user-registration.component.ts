import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import {PasswordValidator} from "./password.validator";
import {User} from "../../models/users.model";
import {UsersService} from "../../services/users.service";
import {dateValidator} from "./date-picker.validation";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})


export class UserRegistrationComponent {

  namePattern = "[a-zA-Z- ]*";
  userPattern = "[a-zA-Z0-9_ -.]*";
  profileImage: File | null = null;

  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get birthday() {
    return this.registrationForm.get('birthday');
  }
  get gender() {
    return this.registrationForm.get('gender');
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
  title = 'Registration';

  // registrationForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private usersService: UsersService, private http: HttpClient) {
  }

  registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100),Validators.pattern(this.namePattern)]  ],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100),Validators.pattern(this.namePattern)]],
    // birthday: ['', [Validators.required,[new Date(), dateValidator()]]],
    birthday: ['', [Validators.required, dateValidator()]],
    gender: ['', Validators.required, ],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.pattern(this.userPattern), Validators.maxLength(50)], [this.usersService.usernameValidator()] ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    profileImage: [null]

  }, {validator: PasswordValidator});


  onSave(firstName: string, lastName: string, birthday: string, gender: string, email: string, username: string, password: string) {
    // @ts-ignore
    const user: User = {firstName, lastName, birthday, gender, email, username, password};
    console.log("onSave: ", firstName, lastName, birthday, gender, email, username, password);
    this.usersService.saveUser(user)
      .subscribe(_ => {
        console.log("Ok");
      });
}
  ngOnInit() {
    this.futureDateDisable();
    this.pastDateDisable();
  }
maxDate:any;
  minDate:any;
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

  onFileSelected(event: any) {
      this.profileImage = event.target.files[0];

    // if (this.profileImage) {
    //   const reader = new FileReader();
    //
    //   // Înregistrăm un eveniment pentru când citirea fișierului s-a terminat
    //   reader.onload = (event) => {
    //     const result = reader.result as ArrayBuffer;
    //     const imageBytes = new Uint8Array(result);
    //     console.log('Imaginea convertită în bytes:', imageBytes);
    //     this.registrationForm.patchValue({
    //       profileImage: imageBytes
    //     });
    //     // Aici poți face orice altceva cu imaginea în bytes, de exemplu, o poți trimite către backend
    //   };
    //
    //   // Citim fișierul ca un șir de octeți (bytes array)
    //   reader.readAsArrayBuffer(this.profileImage);
    // }
    };


}






