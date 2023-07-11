import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})

export class JwtInterceptorService implements HttpInterceptor {
  constructor(private router:Router, private userService:UserService){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const curToken = localStorage.getItem('curToken');
    if (curToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${curToken}`
        }
      });
    }
    return next.handle(request);
  }
}
