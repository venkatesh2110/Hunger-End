import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestuarantComponent } from './restuarant/restuarant.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRestuarantDashboardComponent } from './admin-restuarant-dashboard/admin-restuarant-dashboard.component';
import { AdminAddFoodComponent } from './admin-add-food/admin-add-food.component';
import { AdminIndividualRestuarantComponent } from './admin-individual-restuarant/admin-individual-restuarant.component';
import { AdminUpdateFoodComponent } from './admin-update-food/admin-update-food.component';
import { IndividualRestuarantComponent } from './individual-restuarant/individual-restuarant.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'restaurants', component: RestuarantComponent , 
  //  canActivate:[AuthGuard]
},
  {path: 'restaurants/:id', component: IndividualRestuarantComponent, canActivate:[AuthGuard]},
  {path: 'cart/:id',component: CartComponent, canActivate:[AuthGuard]},
  {path:'admin',
      children:[
        {path:'login', component: AdminLoginComponent},
        {path:'restaurants', component: AdminRestuarantDashboardComponent},
        {path:'addRestaurants', component: AdminAddFoodComponent},
        {path:'restaurants/:id', component: AdminIndividualRestuarantComponent},
        {path:'updateRestaurants', component: AdminUpdateFoodComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RestuarantComponent];
