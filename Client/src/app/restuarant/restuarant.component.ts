import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RestuarantService } from '../restuarant.service';

@Component({
  selector: 'app-restuarant',
  templateUrl: './restuarant.component.html',
  styleUrls: ['./restuarant.component.css']
})
export class RestuarantComponent implements OnInit {
  itemArray: any;
  constructor(private http:HttpClient, private router: Router, private restuarantService: RestuarantService, public authService : AuthService) { }

  async ngOnInit(): Promise<void> {
    await this.restuarantService.getUserid();
    await this.getRestuarant();
  }
  redirectTocart(){
    this.router.navigate(['/cart',this.restuarantService.userId]);
  }

  getRestuarant(){
    this.http.get('restaurants').subscribe( 
    res => {      
      this.itemArray = res;
    },
    err=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.router.navigate(['/']);
        }
      }
    });    
  }
  individualRestuarant(item){
    this.router.navigate(['/restaurants',item._id]);
  }
  
}
