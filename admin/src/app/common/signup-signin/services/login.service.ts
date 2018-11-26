import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable()
export class LoginService
{
    private apiUrl = environment.API_ENDPOINT;
    constructor(private httpClient :HttpClient){}
    login(loginData): Observable<any> 
    {  
       return this.httpClient.post(this.apiUrl +"users/login",loginData);
    }
    forgetpassword(data): Observable<any> 
    {  
       return this.httpClient.post(this.apiUrl +"users/forget-password",data);
    }
    logout(): Observable<any> 
    {  
       return this.httpClient.get(this.apiUrl +"users/logout");
    }
    ResetPassword(data): Observable<any> 
    {  
       return this.httpClient.post(this.apiUrl +"users/reset-password",data);
    }
}