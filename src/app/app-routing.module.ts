import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { CanActivateGaurdService } from './Services/can-activate-gaurd.service';

const routes: Routes = [
  {path:"",redirectTo: "login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:DashboardComponent, canActivate:[CanActivateGaurdService]},
  {path:"**",redirectTo: "dashboard",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
