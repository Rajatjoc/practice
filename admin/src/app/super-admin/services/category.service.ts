import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '.././../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.API_ENDPOINT;
  constructor(private httpClient :HttpClient) {
  }
  addCategory(category : any): Observable<any>{
    return this.httpClient.post(this.apiUrl + "category/addCategory",{category});
  }
  getAllCategorycount(searchString): Observable<any>{
    return this.httpClient.post(this.apiUrl + "category/getAllCategorycount",{searchString});
  }
  getAllCategory(): Observable<any>{
    return this.httpClient.get(this.apiUrl + "category/getAllCategory");
  }
  getsubcategory(id): Observable<any>{
    return this.httpClient.get(this.apiUrl + "category/getsubcategory/" + id);
  }
  getSpecificCategory(id): Observable<any>{
    return this.httpClient.get(this.apiUrl + "category/getSpecificCategory/" + id);
  }
  updateCategory(data):Observable<any>{
    return this.httpClient.post(this.apiUrl + "category/updateCategory",{data})
  }
  deleteCategory(id): Observable<any>{
    return this.httpClient.post(this.apiUrl + "category/deleteCategory",{id})
  }
}
