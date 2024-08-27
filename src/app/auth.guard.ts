import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SellerService } from './services/seller.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private sellerService: SellerService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean | UrlTree> {
    
      if (localStorage.getItem('seller')) {
      return of (true);
      }

      return this.sellerService.isSellerLoggedIn;
  }  
} 
