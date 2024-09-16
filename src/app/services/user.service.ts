import { EventEmitter, Injectable } from '@angular/core';
import { Login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isuserLoggedIn= new BehaviorSubject<boolean>(false)
  inValidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(user:signUp){
    this.http.post('http://localhost:3000/users',user,{observe:'response'})
.subscribe((result)=>{
  if (result){
    localStorage.setItem('user',JSON.stringify(result.body));
    this.router.navigate(['/'])
  }
  
})    
  }
  userLogin(data:Login){
this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{
  observe:'response'
}).subscribe((result)=>{
  if(result && result.body?.length){
    localStorage.setItem('user',JSON.stringify(result.body[0]));
    this.router.navigate(['/'])
    this.inValidUserAuth.emit(false) 
  }else{
    this.inValidUserAuth.emit(true)}
  
})
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
} 
  