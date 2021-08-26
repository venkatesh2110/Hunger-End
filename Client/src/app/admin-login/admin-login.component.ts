import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminLogin: FormGroup
  constructor(private formBuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router) { 
    this.adminLogin = this.formBuilder.group({
      emailId:[''],
      password:['']
    });
  }

  ngOnInit(): void {
  }

  adminLoginBtn(){
    if(this.adminLogin.value.emailId == 'admin@gmail.com' && this.adminLogin.value.password == 'admin123'){
      this.snackbar.open('Login Successfully',null, {duration:3000});
      this.router.navigate(['/admin/restaurants'])
    }
    else{
      this.snackbar.open('Invalid Login',null, {duration:3000})
    }
  }
}
