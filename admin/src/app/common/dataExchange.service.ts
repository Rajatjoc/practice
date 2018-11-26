import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class DataExchangeService {
//     public users : any = {"hello" :"hello"}
    
    public userName :any;
    public userData = new Subject<Object>();
  setData(userName : any) :any
 {  console.log("inside set data>>>>>>>>>>>>>>>." ,userName);
      this.userName = userName;
      return this.userName;
//     this.userData.next(this.users)
    
 }
 getData() : any
 {     console.log("inside getData >>>>>>>>>>>>>>>." , this.userName);
       return this.userData;    // return "rajat";
 }
}



// @Injectable()
// export class DataPassingService {
//     public userData = new ReplaySubject<Object>();
//     static usereditdetails_for_edit(): any {
//     }
//     constructor() { }
//     setdata_for_edit(_user: any) {
//         this.userData.next(_user)
//     }
//     getdata() {
//         return this.userData.asObservable();
//     }
// }
