import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product, cart } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data) => {
      this.popularProducts = data;
    });

    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    });
  }

  AddToCart(productId: string): void {
    this.productService.getProduct(productId).subscribe((productData: product) => {
      if (productData) {
        if(productData.quantity == undefined) productData.quantity=0
        productData.quantity += 1; // Default quantity; adjust if needed
  
        if (!localStorage.getItem('user')) {
          // If user is not logged in, add to local cart
          this.productService.localAddToCart(productData);
        } else {
          // If user is logged in, add to server cart
          const user = localStorage.getItem('user');
          const userId = user ? JSON.parse(user).id : null;
  
          if (userId) {
            const cartData: cart = {
              ...productData,
              productId: productData.id,
              userId,
            };
            delete cartData.id;
  
            this.productService.updateCart(cartData,productId,userId).subscribe((result) => {
              if (result) {
                this.productService.getCartList(userId); // Update cart list
              }
            });
          }
        }
      }
    });
  }
  
}
