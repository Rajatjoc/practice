import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import {Observable,of} from'rxjs';
import {environment} from'.././../../environments/environment'
@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  private apiUrl = environment.API_ENDPOINT;
  constructor(private httpClient:HttpClient) { }
  
  getpaymentmodes(searchString): Observable <any>{
    return this.httpClient.post(this.apiUrl + "payment/getpaymentmodes",{searchString});
  }
}
