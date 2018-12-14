import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
products : any;

public p: any = 1;
public totalItems:any=""
public showSpaceErr: boolean = false;
public searchText = "";
  constructor(private _service : ProductService,   
    private confirmationService: ConfirmationService,
    private toastr : ToastrService  ) { }

  ngOnInit() {
    this.getProduct();
  }

  public searchtext(){
    let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
    if(spaceregex.test(this.searchText) ||(!this.searchText) )
    {
    this.showSpaceErr = false
    this.blockUI.start('Loading...' )
    this._service.getProduct(this.searchText).subscribe(res=>{
      console.log(res,"products")
        this.blockUI.stop();
      this.products= res.data
      this.totalItems = res.data.Count
    })
    }
    else
    {
      this.showSpaceErr = true
    }
    }
    
getProduct(){
  this.blockUI.start('Loading...'); 
  this._service.getProduct(this.searchText).subscribe(res=>{
    console.log(res)
    if(res.code == 200){
      this.blockUI.stop();  
      this.products = res.data;
    }
  
  })
}
pageChanged($event) {
  this.p = $event;
}

delete(id) {
  
      this.confirmationService.confirm({
  
        message: 'Are you sure that you want to perform this action?',
        header: 'Confirmation',
        icon: 'fa fa-question-circle',
        accept: () => {
          this.blockUI.start('Loading...'); // Start blocking
          this._service.deleteProduct(id).subscribe(res=>{
            this.blockUI.stop();
         
          if(res.code === 200){
            this.toastr.success(res.message)
            this.getProduct();
          }
        
        })
      },reject: () => {
       
    }
  })
  }
}
