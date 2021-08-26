import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupcomponentComponent } from '../signupcomponent/signupcomponent.component';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestuarantService } from '../restuarant.service';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css']
})
export class LogincomponentComponent implements OnInit {
  loginForm: FormGroup;
  public redirectingTo;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private restuarantService: RestuarantService, private route: Router, private http: HttpClient, private snackbar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password : ['' , [Validators.required, Validators.pattern('^.{8,15}$')]]
    });
   }
  ngOnInit(): void {
  }
  openSignupdialog(): void {
    this.dialog.open(SignupcomponentComponent, {width: '50%'});
  }

  async redirectTorestuarantPage(action) {
    if (this.loginForm.valid) {
    await this.http.post('login',this.loginForm.value).subscribe(
     res => {
       const response = Object.entries(res);
       this.restuarantService.userId = response[0][1];
       localStorage.setItem('token',response[1][1]);
        this.route.navigate(['/restaurants']);
        this.dialog.closeAll();
      
      },
      err => {      
      if(err.error == "Invalid Email"){
        const snackbarRef = this.snackbar.open('The E-mail Id is not registered', action, {duration: 8000});
        this.dialog.closeAll();
        snackbarRef.onAction().subscribe(() => {
          this.dialog.open(SignupcomponentComponent, {width: '50%'});
        })      
        
      }
      else if(err.error == "Invalid Password"){
        const snackbarRef = this.snackbar.open('Incorrect Password', null, {duration: 2000});
      }
    }
    );      
     }
    }

  get loginDetails() {
    return this.loginForm.controls;
    
  }
}
