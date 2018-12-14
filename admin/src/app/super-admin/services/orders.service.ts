import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable,of} from'rxjs';
import {environment} from'.././../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
private apiUrl = environment.API_ENDPOINT;

  constructor(private httpClient:HttpClient) { }
  getAllOrders(searchString): Observable <any>{
    return this.httpClient.post(this.apiUrl + "orders/getOrder",{searchString});
  }
  getspecificOrders(id): Observable <any>{
    return this.httpClient.get(this.apiUrl + "orders/getspecificOrders/" + id);
  }
  updateOrders(data): Observable <any>{
return this.httpClient.post(this.apiUrl + "orders/updateorders",{data} )
  }
 
  deleteOrders(id): Observable <any>{
    return this.httpClient.post(this.apiUrl + "orders/deleteOrders" ,{id} )
      }
}
