import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../Services/user.service';
import { AlertService } from '../Services/alert.service';
@Injectable({
  providedIn: 'root'
})
export class ErrorService  implements HttpInterceptor {

  constructor(private alert:AlertService,private router:Router,private userData:UserService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      (event:HttpEvent<any>)=>{
      },
      (error:any)=>{
        if(error instanceof HttpErrorResponse)
        {
          if(error.status == 401){
            this.alert.alert('You are Unauthorized',1000,'danger');
          }
          if(error.status == 500){
            this.userData.isLogged = false;
            localStorage.removeItem('curToken');    
            this.alert.alert('Internal Server Error. Please Come Back Later',1500,'danger');
            this.router.navigate(['login']);
           
          }
        }
      }
    ))
  }
}
