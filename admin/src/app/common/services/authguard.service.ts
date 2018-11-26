import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '.././../../environments/environment';
@Injectable()
export class AlwaysAuthGuard implements CanActivate {
  private apiUrl = environment.API_ENDPOINT;
  constructor(private httpClient :HttpClient, private router : Router) {
  }
  canActivate() {

  //  this.checkauth().subscribe(res=>{
  //   console.log(res)
  //   if(res.code == 200){
  //     return true;
  //   }
  //   return false;
  //   })
  //   return false;
   
   
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      this.router.navigate(["login"]);
    }
  }
  checkauth():Observable<any>{
    return this.httpClient.get(this.apiUrl + "users/checkauth");
  }
 
}