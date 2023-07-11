import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGaurdService {

  constructor(private userService:UserService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot):boolean
  {
    if(this.userService.isLogged && this.userService.isAuthenticated())
    {
       return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
