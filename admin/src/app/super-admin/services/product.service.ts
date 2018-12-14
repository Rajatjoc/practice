import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '.././../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.API_ENDPOINT;
  constructor(private httpClient: HttpClient) {
  }
  addProduct(data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/addProduct",{data});
  }
  getAllBrand(searchString): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/getbrand",{searchString});
  }
  getcountries(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getcountries");
  }
  getcategory(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getcategory");
  }
  getColors(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getcolors");
  }
  getsizes(): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getsizes");
  }
  updateProduct(data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/updateProduct",data);
  }
  deleteProductImage(data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/deleteProductImage",data);
  }
  getProductVarient(id): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getProductVarient/"+ id);
  }
  saveVariants(varients , id): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/saveVariants",{varients , id});
  }
  uploadImage(formData): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/uploadImage",formData);
  }
  updateSize(data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/updateSize",data);
  }
  getsubcategory(id): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getsubcategory/"+ id);
  }
  getProduct(searchString): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/getProduct",{searchString});
  }
  deleteProduct(id):Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/deleteProduct/" + id);
  }
  addCategory(data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/addProductCategory",data);
  }
  getallCategory(searchString): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/getallCategory",{searchString});
  }
  // deleteCategory(id): Observable<any> {
  //   return this.httpClient.get(this.apiUrl + "products/deleteCategory/"+ id);
  // }
  deleteCategory(id , cat_id): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/deleteCategory",{id,cat_id});
  }
  addbrand(data):Observable<any>{
    return this.httpClient.post(this.apiUrl +"products/addbrand", data )
  }
  getspecificBrands(id): Observable <any>{
    return this.httpClient.get(this.apiUrl + "products/getspecificBrands/" + id);
  }
  updatebrand(data): Observable <any>{
    return this.httpClient.post(this.apiUrl + "products/updatebrand" ,data);
  }
  deletebrand(id): Observable <any>{
    return this.httpClient.get(this.apiUrl + "products/deletebrand/" +id);
  }
  getSpecificProduct(id): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getSpecificProduct/" + id);
  }
  getSpecificProductCategory(id): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getSpecificProductCategory/" + id);
  }
  addsize(data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/addsize" , data);
  }
  updateProdCategory(data:any): Observable<any>{
    return this.httpClient.post(this.apiUrl + "products/updateProdCategory" ,data);    
  }
  updateProdSubCategory(data:any): Observable<any>{
    return this.httpClient.post(this.apiUrl + "products/updateProdSubCategory" ,data);    
  }
  
  getSize(searchString): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/listsize",{searchString} );
  }
  getspecificSize(id): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getspecificSize/" + id );
  }
  deleteSize(id): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/deleteSize/" + id );
  }
  getSpecificCategory(id): Observable<any> {
    return this.httpClient.get(this.apiUrl + "products/getSpecificCategory/" + id );
  }
  editsubcategory(data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/editsubcategory" , data );
  }
  addsubcategory(id , data): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/addsubcategory" ,{id, data} );
  }
  getDeepSubcategory(id): Observable<any> {
    return this.httpClient.post(this.apiUrl + "products/getDeepSubcategory" ,{id} );
  }
  
}
