import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CmsService } from '../../services/cms.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {OrdersService} from '../../services/orders.service'

@Component({
  selector: 'app-editorders',
  templateUrl: './editorders.component.html',
  styleUrls: ['./editorders.component.scss']
})
export class EditordersComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
editOrdersForm: FormGroup
isSubmited:boolean = false
  constructor(private formbuilder : FormBuilder,private route : ActivatedRoute,
    private CmsService : CmsService , private router : Router,private toastr : ToastrService,
    private OrdersService:OrdersService) { }

  ngOnInit() {
    let pageSlug =  this.route.snapshot.params.pageSlug;
    console.log(pageSlug);
    this.pageContent(pageSlug);
    this.editOrdersForm = this.formbuilder.group({
CustomerName:['',[Validators.required,Validators.minLength(3)]],
PhoneNo:["",[Validators.required,Validators.minLength(3)]],
ShippingAddress:["",[Validators.required,Validators.minLength(3)]],
BillingAddress:["",[Validators.required,Validators.minLength(3)]],
OrderStatus:['',[Validators.required]],
product:['',[Validators.required]],
id:[""]
    })
  }
  pageContent(pageSlug){
    this.blockUI.start('Loading...'); // Start blocking
    this.OrdersService.getspecificOrders(pageSlug)
      .subscribe(res => {
        console.log(".",res)
        this.blockUI.stop();
        // console.log(res.data.page_category)
        // this.category = res.data.page_category;
        // if (res.code === 200) {
        //   if(res.data.sub_category){
        //     this.view = true
        //   }
          this.editOrdersForm.patchValue({
            CustomerName:res.data.CustomerName,
            PhoneNo: res.data.PhoneNo,
            ShippingAddress : res.data.ShippingAddress,
            BillingAddress:res.data.BillingAddress,
            OrderStatus:res.data.OrderStatus,
          product: res.data.Product.product_name,
            id :  res.data._id });
        })
        
      }
      updateOrders(){
        if(this.editOrdersForm.invalid){
        this.isSubmited = true
        return
        }
        this.blockUI.start('Loading...'); // Start blocking
        this.OrdersService.updateOrders(this.editOrdersForm.value).subscribe(res=>{
          this.blockUI.stop();
          if(res.code = 200){
            this.toastr.success(res.message);
            this.router.navigate(['/auth/orders'])
          }
        })
      }

         
      
  }

