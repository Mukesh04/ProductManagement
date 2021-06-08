import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { IProduct } from './product';

import { ProductService } from "./product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  pageTitle: string ="Products List";
  StarRating : string = '';
  product : IProduct[] = [];
  postProduct : IProduct[] = [];
  filterProduct: IProduct[] = [];
  AddRow: IProduct[] = [];
  sub: any;
  post1 : any;
  errorMessage: any;
  showImage: boolean = false;
  showItem: boolean = false;

  private ListOfFilter: string ='';


  get ListOfFilterM(): string{
    return this.ListOfFilter;
  }

  set ListOfFilterM(value: string){
    this.ListOfFilter = value;
    this.filterProduct = this.performFilter(value);
  }
  //services

  constructor(private productService : ProductService){

  }

  ngOnInit(): void {

    this.sub = this.productService.getProduct().subscribe({
      next: product => {
        this.product = product;
        this.filterProduct = this.product;
      },
      error: err => this.errorMessage = err
    });



  }

  onRatingClicked(message: string): void{
    this.StarRating =  message;
  }

  toggleImage(): void{
    this.showImage = !this.showImage;
  }

  performFilter(value : string):IProduct []{
    value = value.toLocaleLowerCase();
    let valuee = this.product.filter((product : IProduct) => product.productName.toLocaleLowerCase().includes(value));
    return valuee;
  }

  addRow(): void{
    this.showItem = !this.showItem;
  }
  onSubmit(value: IProduct){

    this.post1 = this.productService.postProduct(value).subscribe({

      next : data => {
        this.postProduct = data;
        console.log("this.postProduct", this.postProduct);
      },
      error: err => {
        this.errorMessage = err.message;
        console.log("Error Message By On Submit", err);
      }
    })

  }


}
