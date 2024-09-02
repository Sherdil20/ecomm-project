import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Login, signUp } from '../data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  login(data: Login) {
    this.user.userLogin(data)
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }
}