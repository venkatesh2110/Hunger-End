import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestuarantService } from '../restuarant.service';

@Component({
  selector: 'app-otp-dialog',
  templateUrl: './otp-dialog.component.html',
  styleUrls: ['./otp-dialog.component.css']
})
export class OtpDialogComponent implements OnInit {
  otpForm: FormGroup;
  otpValidationForm: FormGroup;
  otp: Object;
  valueEntered:boolean = true;
  constructor(private FormBuilder: FormBuilder,private http: HttpClient,private dialog: MatDialog,private restuarantService : RestuarantService, private snackbar: MatSnackBar, private router:Router) {
    this.otpForm = this.FormBuilder.group({
      emailId:['',[Validators.required,Validators.email]]
    });
    this.otpValidationForm = this.FormBuilder.group({
      otpValue:['',Validators.required]
    });
   }

  ngOnInit(): void {
    
  }
  
  otpGeneration(){
    this.http.post('sendEmail',this.otpForm.value).subscribe(res=>{
      this.otp = res;
      this.valueEntered = false;
    },
)
  }
  async validateOtp(){
    if(this.otp==this.otpValidationForm.value.otpValue){
      const snackbarRef = this.snackbar.open('Your Order Placed Successfully',null,{duration:5000});
      
      await this.http.delete(`cart/${this.restuarantService.cartId}`).subscribe();
      
      this.dialog.closeAll();
      this.router.navigate(['/']);
    }
    else{
      const snackbarRef = this.snackbar.open('Incorrect OTP!!',null,{duration:5000});
    }
  }
}
