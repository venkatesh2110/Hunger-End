import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup , ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-food',
  templateUrl: './admin-add-food.component.html',
  styleUrls: ['./admin-add-food.component.css']
})
export class AdminAddFoodComponent implements OnInit {
  addRestuarants: FormGroup
  images: any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private snackbar: MatSnackBar, private router: Router) {
    this.addRestuarants = this.formBuilder.group({
      name: '',
      about:'',
      location:'',
      Items: this.formBuilder.array([]) ,
    });
   }

   backTorestaurants(){
     this.router.navigate(['/admin/restaurants'])
   }

   quantities() : FormArray {
    return this.addRestuarants.get("Items") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.formBuilder.group({
      foodName: '',
      price: '',
    })
  }
   
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }

  onFileUpload(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.images = file;
    }
  }

  
  async addItems(){
    let success = await this.http.post('restaurants',this.addRestuarants.value).subscribe();
      if(success){
        this.snackbar.open('Items Added Successfully', null, {duration: 2000});
        this.router.navigate(['/admin/restaurants']);
      }
  }

  ngOnInit(): void {
  }

}
