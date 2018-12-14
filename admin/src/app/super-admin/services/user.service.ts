import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '.././../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.API_ENDPOINT;
  constructor(private httpClient: HttpClient) {
  }
  getuserlist(searchText): Observable<any> {
    return this.httpClient.post(this.apiUrl + "users/userlist",{searchText});
  }
  deleteuser(id): Observable<any> {
    return this.httpClient.get(this.apiUrl + "users/userdelete/"+ id);
  }
  getSpecific(id):Observable<any> {
    console.log(id)
    return this.httpClient.post(this.apiUrl + "users/getspecificuser",{id});
  }
  updateuser(data):Observable<any>{
    return this.httpClient.post(this.apiUrl + 'users/updateUser',{data})
  }
}
