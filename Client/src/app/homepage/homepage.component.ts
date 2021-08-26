import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogincomponentComponent } from '../logincomponent/logincomponent.component';
import { SignupcomponentComponent } from '../signupcomponent/signupcomponent.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit { 
  constructor(public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

  openLogindialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(LogincomponentComponent, dialogConfig);
  }

  openSignupdialog(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    this.dialog.open(SignupcomponentComponent, dialogConfig);
  }
  redirectToAdmin(){
    this.router.navigate(['/admin/login']);
  }
}
