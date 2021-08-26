import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestuarantService } from '../restuarant.service';


@Component({
  selector: 'app-admin-update-food',
  templateUrl: './admin-update-food.component.html',
  styleUrls: ['./admin-update-food.component.css']
})
export class AdminUpdateFoodComponent implements OnInit {
updateRestuarants: FormGroup
itemUpdateForm: FormGroup
addMoreItems:boolean = false;
  constructor(private formBuilder: FormBuilder, public restuarantService: RestuarantService, private http: HttpClient, private router: Router) { 
    this.updateRestuarants = this.formBuilder.group({
      Items: this.formBuilder.array([]) ,
    });
  
  this.itemUpdateForm = this.formBuilder.group({
    name: '',
    Items: this.formBuilder.array([])
  });
}

addMoreitems(){
  this.addMoreItems = true;
}

  quantities() : FormArray {
    return this.updateRestuarants.get("Items") as FormArray
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
  ngOnInit(): void {
    this.setValue();
  }

  get itemsArray()
  {
    return this.itemUpdateForm.get('Items') as FormArray
  }

  createGroupItem(data:any=null)
  {
    data=data || {foodName:'',price:0}
    return this.formBuilder.group({
      foodName:data.foodName,
      price:data.price
    })
  }

  setValue() {
    this.restuarantService.selectedProduct.Items.forEach(x=>this.itemsArray.push(this.createGroupItem()))
    this.itemUpdateForm.patchValue({
      name: this.restuarantService.selectedProduct.name,
      Items: this.restuarantService.selectedProduct.Items
    });
  }


  updateItems(){
    console.log(this.itemUpdateForm.value);
      this.http.put(`restaurants/${this.restuarantService.selectedProduct._id}`,this.itemUpdateForm.value).subscribe(
      res => {
          this.router.navigate(['/admin/restaurants',this.restuarantService.selectedProduct._id]);
        
      });
  }

  newUpdatedItems(){
    console.log(this.updateRestuarants.value);
    this.http.put(`restaurants/${this.restuarantService.selectedProduct._id}`,this.updateRestuarants.value).subscribe(
      res => {
          this.router.navigate(['/admin/restaurants',this.restuarantService.selectedProduct._id]);
        
      });
  }
}
