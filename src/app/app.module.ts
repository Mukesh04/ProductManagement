import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { StartComponentComponent } from './shared/start-component.component';
import { ProductGuard } from './products/product.guard';
import { ProductService } from './products/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    WelcomeComponent,
    ProductDetailComponent,
    StartComponentComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,
    RouterModule.forRoot([
      {path: 'welcome', component:WelcomeComponent},
      {path: 'products', component:ProductsComponent},
      {
        path:'products/:id',
        canActivate: [ProductGuard],
         component:ProductDetailComponent
        },
      {path: '', redirectTo: 'welcome', pathMatch:'full'},
      {path: '**', redirectTo: 'welcome', pathMatch:'full'}
    ])
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
