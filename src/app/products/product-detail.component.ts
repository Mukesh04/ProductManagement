import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
 pageTitle : string = "Product Detail ";
 id : number | undefined ;

 product : IProduct[] | undefined;

  sub: any;
  errorMessage: any;
  constructor(private route : ActivatedRoute, private router : Router, private productService : ProductService) { }

  ngOnInit(): void {
     this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `${this.id}`;

    this.sub = this.productService.getProduct().subscribe({
      next: product => {
        this.product = product;
        console.log("Product", this.product);
      },
      error: err => this.errorMessage = err
    });
  }
onBack(): void {
  this.router.navigate(['/products'])
}
}
