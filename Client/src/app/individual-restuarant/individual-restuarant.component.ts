import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Product } from '../models/Product';
import { RestuarantService } from '../restuarant.service';

@Component({
  selector: 'app-individual-restuarant',
  templateUrl: './individual-restuarant.component.html',
  styleUrls: ['./individual-restuarant.component.css']
})
export class IndividualRestuarantComponent implements OnInit {
  productId: string;
  itemArray:Product[] = [];
  products: [string, any][];
  productArray: any;
  name: string;
  about: any;
  location: any;
  count = 0;
  countZero: boolean = false;
  cartArray=[];
  items: any;
  datas: any;
  individualAmount: number = 0;
  totalAmount: number = 0;
 
  constructor(private http: HttpClient, private route: ActivatedRoute, public restuarantService: RestuarantService, private router: Router, public authService: AuthService) { }

  async ngOnInit(): Promise<any> {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.productId = id;
      this.restuarantService.productId = this.productId;
    });
    await this.getRestuarantbyId();
    await this.restuarantService.getUserid();
  }

  redirectTocart(){
    this.router.navigate(['/cart',this.restuarantService.userId]);
  }
  getRestuarantbyId(){
    this.http.get(`restaurants/${this.productId}`).subscribe(
      res=>{
        this.products = Object.entries(res);
        this.productArray = this.products[0][1];
        this.name = this.productArray.name;
        
        this.about = this.productArray.about;
        this.location = this.productArray.location;
        this.productArray.Items.forEach(item => {
          const items = {
            id : item._id,
            foodName : item.foodName,
            price : item.price,
            count : this.count,
            amount:this.individualAmount
          };
          this.itemArray.push(items);
          
        })
      },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401 ){
            this.router.navigate(['/']);
          }
        }
      });
  }

  decrementQuantity(item){
    this.individualAmount = 0;
    this.count = this.count-1;
    if(item.count==1){
      this.countZero = true;
    }
    item.count = item.count-1;
    item.amount = item.price*item.count;
    this.totalAmount = this.totalAmount-item.price;
    this.cartArray.push(item);
  }

  incrementQuantity(item){
    this.individualAmount = 0;
    this.count = this.count+1;
    if(item.count>1){
      this.countZero = false;
    }
    item.count = item.count+1;
    item.amount = item.price*item.count;
    this.totalAmount = this.totalAmount+item.price;
    this.cartArray.push(item);
  }

  async addTocart(){
    let ids = this.cartArray.map(o => o.id)
    let uniqueItems = this.cartArray.filter(({id}, index) => !ids.includes(id, index+1))
    this.restuarantService.cartItems = (uniqueItems.filter(item => item.count));
    const obj = {
      userId:this.restuarantService.userId,
      name:this.name,
      array:this.restuarantService.cartItems,
      totalAmount:this.totalAmount
    }
    const success = await this.http.post('cart',obj).toPromise();
    if(success){
      this.router.navigate(['/cart',this.restuarantService.userId]);
    }
  }
}
