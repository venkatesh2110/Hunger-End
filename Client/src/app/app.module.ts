import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { SignupcomponentComponent } from './signupcomponent/signupcomponent.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRestuarantDashboardComponent } from './admin-restuarant-dashboard/admin-restuarant-dashboard.component';
import { AdminAddFoodComponent } from './admin-add-food/admin-add-food.component';
import { AdminIndividualRestuarantComponent } from './admin-individual-restuarant/admin-individual-restuarant.component';
import { AdminUpdateFoodComponent } from './admin-update-food/admin-update-food.component';
import { IndividualRestuarantComponent } from './individual-restuarant/individual-restuarant.component';
import { CartComponent } from './cart/cart.component';
import { OtpDialogComponent } from './otp-dialog/otp-dialog.component';
import {AuthGuard} from './Guards/auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LogincomponentComponent,
    SignupcomponentComponent,
    routingComponents,
    AdminLoginComponent,
    AdminRestuarantDashboardComponent,
    AdminAddFoodComponent,
    AdminIndividualRestuarantComponent,
    AdminUpdateFoodComponent,
    IndividualRestuarantComponent,
    CartComponent,
    OtpDialogComponent,
  ],
  /*entryComponents: [LogincomponentComponent,
    SignupcomponentComponent],*/
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuard , {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
