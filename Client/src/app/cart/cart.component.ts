import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestuarantService } from '../restuarant.service';
import {Cart} from '../models/Cart';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OtpDialogComponent } from '../otp-dialog/otp-dialog.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:Cart[]= [];
  products: [string, any][];
  productArray: any;
  name: any;
  userId: any;
  totalAmount: number;
  empty: boolean = true;
  errorMessage: string;
  count: number = 0;
  countZero: boolean = false;
  itemsArray = [];
  cartId: any;
  constructor(public restuarantService: RestuarantService,private router: Router,private http: HttpClient, private dialog:MatDialog,public authService:AuthService) { }

  async ngOnInit(): Promise<any> {
    await this.restuarantService.getUserid();
    await this.getCartItems();
  }
  backTorestuarants(){
    this.router.navigate(['/restaurants',this.restuarantService.productId]);
  }

  redirectToRestuarants(){
    this.router.navigate(['/restaurants']);
  }

 
  

  async getCartItems(){
    await this.http.get(`cart/${this.restuarantService.userId}`).subscribe(
      res => {
        this.products = Object.entries(res);
        this.productArray = this.products[0][1];
        this.cartId = this.productArray._id;
        this.restuarantService.cartId = this.cartId;
        this.name = this.productArray.name;
        this.userId = this.productArray.userId;
        this.totalAmount = this.productArray.totalAmount;
        this.productArray.array.forEach(item => {
          const items = {
            id : item._id,
            foodName : item.foodName,
            price : item.price,
            count : item.count,
            amount:item.amount
          };
          this.count = this.count+item.count;
          this.cartItems.push(items);
        })
      },
      err=>{
        this.empty = false;
        this.errorMessage = err.error;
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/']);
          }
        }
      }
      );
  }


  decrementQuantity(item){
    
    //item.individualAmount = 0;
    this.count = this.count-1;
    if(item.count==1){
      this.countZero = true;
    }
    item.count = item.count-1;
    item.amount = item.price*item.count;
    this.totalAmount = this.totalAmount-item.price;
    this.cartItems.push(item);
    this.updateCart(this.cartItems);
  }

  incrementQuantity(item){
    
    //this.individualAmount = 0;
    this.count = this.count+1;
    if(item.count>1){
      this.countZero = false;
    }
    item.count = item.count+1;
    item.amount = item.price*item.count;
    this.totalAmount = this.totalAmount+item.price;
    this.cartItems.push(item);
    
    this.updateCart(this.cartItems);
  }

  updateCart(items){
    let ids = items.map(o => o.id)
    let uniqueItems = items.filter(({id}, index) => !ids.includes(id, index+1))
    this.cartItems = (uniqueItems.filter(item => item.count));
    const obj = {
      userId:this.userId,
      name:this.name,
      array:this.cartItems,
      totalAmount:this.totalAmount
    }
    this.http.put(`cart/${this.cartId}`,obj).subscribe();
  }

  removeCart(){
    this.http.delete(`cart/${this.cartId}`).subscribe(
      res=>{
        this.empty = true;
        this.getCartItems();
      }
    );
  }
  placeOrder(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    const dialogRef = this.dialog.open(OtpDialogComponent,dialogConfig);
  }
}
