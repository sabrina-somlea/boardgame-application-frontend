import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements  OnInit{
  ngOnInit(): void {
  }
  constructor(private router:Router) { }
  addNewUser(){
    this.router.navigate(['user-registration']);
  }
}
