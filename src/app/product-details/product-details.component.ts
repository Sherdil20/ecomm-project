import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productsData: undefined | product;
  productQuantity:number=1;
  quantity:number=1;
  removeCart=false;
  constructor(private activeRoute:ActivatedRoute, private product:ProductService){}

  ngOnInit(): void {
    let productId=this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result)=>{
      this.productsData=result;
      let cartData= localStorage.getItem('localCart');
      if(productId && cartData){
        let items= JSON.parse(cartData);
        items= items.filter((item:product)=>productId== item.id.toString())
        if(items.length){
          this.removeCart=true
        }else{
          this.removeCart=false
        }
      }
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
  this.product.localAddToCart(this.productsData);
  this.removeCart=true
  
}else{
  let user=localStorage.getItem('user');
  let userId=user && JSON.parse(user).id
  let cartData:cart={
    ...this.productsData,
    userId,
    productId:this.productsData.id,
  
  }
  delete cartData.id;
  console.warn(cartData);
  this.product.addToCart(cartData).subscribe((result: any)=>{
    if(result){
      alert('Product is added in Cart')
    }
    
  })
  

}
}
}
removeFromCart(productId:any){
this.product.removeItemFromCart(productId)
this.removeCart=false;
}
}
