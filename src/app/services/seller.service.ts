import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
isSellerLoggedIn= new BehaviorSubject<boolean>(false)
isLoginError= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) {}
  usersignUp(user:signUp){
     this.http.post('http://localhost:3000/seller',
      user,
      {observe:'response'}).subscribe((result)=>{
       if(result){  
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
       }
      })
     }
    reloadSeller(){
      if(localStorage.getItem('seller')){
        this.isSellerLoggedIn.next(true)
        this.router.navigate(['seller-home'])
      }
    }
  UserLogin(data:Login){
      this.http
     .get<signUp[]>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{
      observe:'response'}).subscribe((result)=>{
    
        if(result && result.body?.length){
          this.isLoginError.emit(false)
          localStorage.setItem('seller',JSON.stringify(result.body[0]))
          this.router.navigate(['seller-home'])
        }else{
          this.isLoginError.emit(true)}
        })
      }
}

