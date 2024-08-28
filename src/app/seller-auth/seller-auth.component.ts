import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService, private router:Router
  ){}
  showLogin=true

ngOnInit():void{
  this.seller.reloadSeller()
}
  signUp(data:SignUp):void{
    console.warn(data);
    this.seller.userSignUp(data)
  }
  login(data:SignUp):void{
    console.warn(data);
  }
  openLogin() {
this.showLogin=true
  }
  openSignUp(){
    this.showLogin=false
  }
}
