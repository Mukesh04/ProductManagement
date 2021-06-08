import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanActivate {
product : IProduct | undefined;

constructor(private router : Router){}
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
   const id = Number(route.paramMap.get('id'));
   if(isNaN(id) || id < 1 ){
     alert('invalid Product Id');
     this.router.navigate(['/product']);
     return false;
   }
   return true;
  }


}
