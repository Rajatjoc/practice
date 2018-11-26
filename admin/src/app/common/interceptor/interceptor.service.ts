import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    public token: any;
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.setUser();

        if (this.token) {
            let req_with_token = request.clone({
                setHeaders: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.token}`
                }
            });
            return next.handle(req_with_token)
        }
        else {

            return next.handle(request);
        }
    }
    setUser() {
        this.token = localStorage.getItem('token');
    }
}