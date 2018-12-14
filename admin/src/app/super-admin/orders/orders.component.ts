import { Component, OnInit } from '@angular/core';
import {OrdersService} from '../services/orders.service'
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Console } from '@angular/core/src/console';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
@Component({
  
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  allOrders:any
  public p: any = 1;
  public totalItems:any=""
  public showSpaceErr: boolean = false;
  public searchText = "";
  constructor(private OrdersService:OrdersService,private formBuilder: FormBuilder,
    private confirmationService:ConfirmationService,
  private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    this.getOrders()
  }
  public searchtext(){
let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
if(spaceregex.test(this.searchText) ||(!this.searchText) )
{
this.showSpaceErr = false
this.blockUI.start('Loading...' )
this.OrdersService.getAllOrders(this.searchText).subscribe(res=>{
  console.log(res,"orders")
    this.blockUI.stop();
  this.allOrders= res.data
  this.totalItems = res.data.Count
})
}
else
{
  this.showSpaceErr = true
}
}
pageChanged($event) {
  this.p = $event;
}
getOrders(){
  this.blockUI.start('Loading...' )
  this.OrdersService.getAllOrders(this.searchText).subscribe(res=>{
    if (res.code == 200) {
 
    console.log(res,"orders")
    this.allOrders= res.data
    this.totalItems = res.data.Count
    // this.toastr.success(res.message)
    }
    this.blockUI.stop();
   
    
    
  })
}

delete(id) {

      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        header: 'Confirmation',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.blockUI.start('Loading...'); // Start blocking
          this.OrdersService.deleteOrders(id).subscribe(res=>{
            this.blockUI.stop();
          console.log(res.code);
          if(res.code === 200){
            this.allOrders= res.data
               this.toastr.success(res.message)

          }
        
        })
      },reject: () => {
       
    }
  })
  }
}
