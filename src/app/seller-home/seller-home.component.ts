import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList:undefined | product[];
  productMessage:undefined|string;
  icon=faTrash;
  iconup=faEdit;
  constructor(private product:ProductService){}

  ngOnInit():void{
    this.list();
  
}
deleteProduct(id:string){
  this.product.deleteProduct(id).subscribe((result)=>{
    if(result){
      this.productMessage="Product is deleted";
      this.list();

    }
  })
  setTimeout(()=>{
    this.productMessage=undefined}, 3000);
}
list(){
  this.product.productList().subscribe((result)=>{
    this.productList=result
  })
}
}