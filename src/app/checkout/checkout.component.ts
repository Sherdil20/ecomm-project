import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result: any) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item: { quantity: number; price: number; }) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      });
      this.totalPrice = price + (price / 10) - (price / 10) + 300;
    });
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      };

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Your order has been placed";
          this.clearCart(); // Call the method to clear cart data
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders']);
          }, 4000);
        }
      });
    }
  }

  clearCart() {
    this.cartData?.forEach((item: any) => {
      setTimeout(() => {
        item.id && this.product.deleteCartItems(item.id);
      }, 500);
    });
  }
}
