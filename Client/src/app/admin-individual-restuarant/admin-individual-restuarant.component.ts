import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {Product} from './../models/Product';

@Component({
  selector: 'app-admin-individual-restuarant',
  templateUrl: './admin-individual-restuarant.component.html',
  styleUrls: ['./admin-individual-restuarant.component.css']
})
export class AdminIndividualRestuarantComponent implements OnInit {
  productId: any;
  itemArray:Product[] = [];
  products: [string, any][];
  productArray: any;
  name: string;
  about: any;
  location: any;
  

  constructor(private http: HttpClient,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.productId = id;
    });
    this.getRestuarantbyId();
  }
  getRestuarantbyId(){
    this.http.get(`adminRestaurants/${this.productId}`).subscribe(
      res=>{
        this.products = Object.entries(res);
        this.productArray = this.products[0][1];
        this.name = this.productArray.name;
        this.about = this.productArray.about;
        this.location = this.productArray.location;
        this.productArray.Items.forEach(item => {
          const items = {
            _id : item._id,
            foodName : item.foodName,
            price : item.price
          };
          this.itemArray.push(items);
        })
      });
  }
  backTorestuarants(){
    this.router.navigate(['/admin/restaurants']);
  }

 
}
