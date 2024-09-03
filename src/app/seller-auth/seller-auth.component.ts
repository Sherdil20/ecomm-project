import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, signUp } from '../data-type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  showLogin=true;
  authError:string='';
  constructor(private seller:SellerService, private router:Router){}
  
ngOnInit():void{
  this.seller.reloadSeller()
}
  signUp(data:signUp):void{
    this.seller.usersignUp(data)
    }
  
  login(data:Login):void{
    this.seller.UserLogin(data)
    this.seller.isLoginError.subscribe((result)=>{
      if(result){
        this.authError="Enter Correct Details" 
    }
  })
  }
  openLogin() {
    this.showLogin=true
  }
  opensignUp(){
    this.showLogin=false
  }
}
