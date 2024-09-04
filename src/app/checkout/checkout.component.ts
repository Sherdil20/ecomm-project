import { Component, OnInit } from '@angular/core';
import { priceSummary } from '../data-type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  constructor(private route: ActivatedRoute) { }
total?: number=0;

ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {
    const paramValue = params.get('total');
    let val=  paramValue != null? +paramValue:0;
    this.total=val;
  });
}

}