import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '.././../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CmsService {
 
  private apiUrl = environment.API_ENDPOINT;
  constructor(private httpClient :HttpClient) {
  }
  addCms(cmsData : any): Observable<any>{
    return this.httpClient.post(this.apiUrl + "cms/addcms",{cmsData});
  }
  getAllCMS(searchString): Observable<any>{
    return this.httpClient.post(this.apiUrl + "cms/getallcms",{searchString});
   
  }
  getspecificCMS(id): Observable<any>{
    return this.httpClient.get(this.apiUrl + "cms/editcms/" + id);
  }
  updateCMS(data):Observable<any>{
    return this.httpClient.post(this.apiUrl + "cms/updatecms",{data})
  }
  deleteCMS(id): Observable<any>{
    return this.httpClient.post(this.apiUrl + "cms/deletecms",{id})
  }
}
