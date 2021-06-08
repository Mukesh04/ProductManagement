import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IProduct } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'assets/product.json';

  postProducts: string | undefined;

  constructor(private http : HttpClient) { }

  getProduct() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => JSON.stringify(data)),
      catchError(this.handelError)
    );
  }

  postProduct(value: IProduct) : Observable<IProduct[]> {
    const body = value;
    return this.http.post<IProduct[]>(this.productUrl, body).pipe(
      tap(data => {
       this.postProducts = JSON.stringify(data),
       console.log("value", );
      }
      ),
      catchError(this.handelError)
    );
  }
  private handelError(err: HttpErrorResponse) {
    let errorMessage = '';
    if(err.error instanceof ErrorEvent){
      errorMessage = `An error Occured : ${err.error.message}`
    }
    else{
      errorMessage = `Server Return Code : ${err.status},  Error Message is : ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
