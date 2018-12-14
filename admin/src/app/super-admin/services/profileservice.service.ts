import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '.././../../environments/environment';
import { Subject } from "rxjs/Subject";
@Injectable({
  providedIn: 'root'
})

export class ProfileserviceService {
  newHeaders:any
  private setImage = new Subject<any>();
  private setName = new Subject<any>();
  setHeaders:any
  private apiUrl = environment.API_ENDPOINT;
  constructor(private httpClient: HttpClient) {
    this.newHeaders = {
      'Accept': 'application/json'
    }
  }
  getProfile(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "users/getProfile");
  }
  // setProfileImage(profileImage) {
  //   console.log(">>>>>>>>>> himani///////", profileImage)
  //   // this.userData =  JSON.parse(localStorage.getItem('userName'));
  //   this.setImage.next({ profileImage: profileImage });
  //   console.log(">>>>>>>>>>>", profileImage)
  //   this.setImage.next({ profileImage: localStorage.getItem("image") 
  //   ,username: localStorage.getItem("headerName")});
  //   // this.setImage.next({ username: localStorage.getItem("headerName")});
  // }

  // getProfileImage(): Observable<any> {
  //   console.log(this.setImage);
  //    this.setImage.next({ profileImage: localStorage.getItem("image") ,username: localStorage.getItem("headerName")});
  //   //  this.setImage.next({ username: localStorage.getItem("headerName")});
    
    
  //   return this.setImage.asObservable();
  // }
  setProfileImage(profileImage) {
    console.log("hello i am here")
    this.setImage.next({ profileImage: profileImage });
  }

  getProfileImage(): Observable<any> {
    return this.setImage.asObservable();
  }
  setProfileName(name) {
    console.log("hello i am here")

    this.setName.next({ name: name });
  }

  getProfileName(): Observable<any> {
    return this.setName.asObservable();
  }
  updateProfile(data): Observable<any> {
   
    return this.httpClient.post(this.apiUrl + "users/updateProfile",{data});
  
  }
  uploadImage(formData):Observable<any>{
    let requestData = { 'profileData': formData }
    return this.httpClient.post(this.apiUrl + "users/uploadProfilePic" ,formData)
  }
}
