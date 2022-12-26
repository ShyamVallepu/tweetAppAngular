import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
 
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
  
    constructor(private authService: AuthService) { }
  
    public authToken :string = '';
    public token :string="";
    public strlen:number=0;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      this.token = this.authService.getToken()
      
       //this.strlen=this.authToken.length;
      //this.authToken=this.authToken.slice(10,this.strlen-2);
      if (this.token) {
        this.strlen= this.token.length;
      this.token= this.token.slice(10,this.strlen-2)
      this.authToken ='Bearer'+' '+ this.token;
        request = request.clone({
          setHeaders: {
            Authorization: this.authToken
          }
        });
      }
  
      return next.handle(request);
  
    }
  }
  