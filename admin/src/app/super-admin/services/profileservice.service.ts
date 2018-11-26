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
  setProfileImage(profileImage) {
    console.log(">>>>>>>>>>>", profileImage)
    this.setImage.next({ profileImage: profileImage });
  }

  getProfileImage(): Observable<any> {
    console.log(this.setImage);
    return this.setImage.asObservable();
  }
  updateProfile(data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "users/updateProfile",{data});
  }
  uploadImage(formData):Observable<any>{
    let requestData = { 'profileData': formData }
    return this.httpClient.post(this.apiUrl + "users/uploadProfilePic" ,formData)
  }
}
