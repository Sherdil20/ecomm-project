import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productsData: undefined | product;
  productQuantity:number=1;
  quantity:number=1;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}

  ngOnInit(): void {
    let productId=this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productsData=result;
    })

  }
handleQuantity(val:String){
  if(this.productQuantity<20 && val==='plus'){
    this.productQuantity+=1;
  }else if(this.productQuantity>1 && val==='min'){
    this.productQuantity-=1;
  }
}
AddToCart(){
  if(this.productsData){
this.productsData.quantity=this.productQuantity;
if(!localStorage.getItem('user')){
  console.warn(this.productsData);
  this.product.localAddToCart(this.productsData);

}
}
}
}
