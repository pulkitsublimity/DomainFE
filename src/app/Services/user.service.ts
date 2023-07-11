import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged:boolean = false
  constructor(private http: HttpClient, private httpBackend:HttpBackend, private jwthelper:JwtHelperService, private router:Router) {
    const curToken = localStorage.getItem('curToken')
    if (curToken) {
      this.isLogged = true;
    }
  }

  // Login Page Api
  domain(): Observable<any> {
    return this.http.get('http://localhost:3000/v1/domain');
  }
  
  userDomain(): Observable<any> {
    return this.http.get('http://localhost:3000/v1/userDomains');
  }
  
  createDomain(data: any) {
    return this.http.post('http://localhost:3000/v1/createDomain', data);
  }
  
  shareDomain(data: any) {
    return this.http.post('http://localhost:3000/v1/shareDomain', data);
  }
  
  changeDomain(data: any) {
    return this.http.post('http://localhost:3000/v1/changeDomain', data);
  }

  login(data: any): Observable<any> {
    this.isLogged = true;
    return this.http.post('http://localhost:3000/v1/login', data);
  }

  deleteDomain(data:any){
    return this.http.post('http://localhost:3000/v1/deleteDomain', data);
  }

  User(data:any) : Observable<any> {
    return this.http.get(`http://localhost:3000/v1/user?_id=${data}`)
  }

  UserList() : Observable<any> {
    return this.http.get(`http://localhost:3000/v1/userlist`)
  }

  ChangePass(data:any) : Observable<any> {
    return this.http.post('http://localhost:3000/v1/changePassword',data)
  }

  logout() {
    try {
       this.isLogged = false;
        localStorage.removeItem('curToken');
        localStorage.removeItem('curID');
        this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      alert('An error occurred during logout.');
    }
  }
   isAuthenticated(){
     let token = localStorage.getItem('curToken')?localStorage.getItem('curToken') as string:null;
     if(this.jwthelper.isTokenExpired(token))
     {return false;}
     else{
      return true;
     }
    }
}

