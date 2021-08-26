import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Restaurants} from './models/Restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestuarantService {
userId;
selectedProduct:Restaurants;
productId:string;
cartItems = [];
cartId;
  constructor(private authService: AuthService,private http: HttpClient) { }

  async getUserid(){
    let token = this.authService.getToken();
    const success = await this.http.get(`userDetails/${token}`).toPromise();
    if(success){
      this.userId = success;
    }
  }
}
