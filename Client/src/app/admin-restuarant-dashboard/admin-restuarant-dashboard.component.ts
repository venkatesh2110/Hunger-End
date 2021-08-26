import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurants } from '../models/Restaurants';
import {RestuarantService} from './../restuarant.service';

@Component({
  selector: 'app-admin-restuarant-dashboard',
  templateUrl: './admin-restuarant-dashboard.component.html',
  styleUrls: ['./admin-restuarant-dashboard.component.css']
})
export class AdminRestuarantDashboardComponent implements OnInit {
  itemArray : any=[];
  products: [string, unknown][];
  constructor(private router: Router, private http: HttpClient, private restuarantService: RestuarantService) { }

  ngOnInit(): void {
    this.getRestuarant();
  }
  addRestuarants(){
    this.router.navigate(['/admin/addRestaurants']);
  }

  getRestuarant(){
    this.http.get('adminRestaurants').subscribe( 
    res => {      
      this.itemArray = res;
    });    
  }

  individualRestuaratnt(item){
    this.router.navigate(['/admin/restaurants',item._id]);
  }

  async deleteRestuarant(item){
    await this.http.delete(`restaurants/${item._id}`).subscribe(res=>{
      this.getRestuarant();
    })
  }
  editItems(item:Restaurants){
    this.restuarantService.selectedProduct = item;    
    this.router.navigate(['/admin/updateRestaurants']);
  }
}
