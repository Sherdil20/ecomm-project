import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  sellername: string = '';
  searchResult: undefined | product[];
  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore= localStorage.getItem('seller');
          let sellerData= sellerStore && JSON.parse(sellerStore);
          this.sellername= sellerData.name;
          this.menuType= "seller";
      } else {
        this.menuType = 'default';
      }
    } 
  });
}
logout(){
  localStorage.removeItem('seller');
  this.route.navigate(['/'])
}
searchProduct(query: KeyboardEvent){
  if (query){
    const element= query.target as HTMLInputElement;
    this.product.searchProduct(element.value).subscribe((result) => {
      if (result.length>3){
        result.length = length;
      }
      this.searchResult = result;
    })
  }
}
hideSearch(){
  this.searchResult = undefined
}
redirectToDetails(id:string){
  this.route.navigate(['/details/'+id])
}
submitSearch(val: string){
  this.route.navigate([`search/${val}`])
}
}
