import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listsize',
  templateUrl: './listsize.component.html',
  styleUrls: ['./listsize.component.scss']
})

export class ListsizeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
public  measurements: any
  constructor(private _service : ProductService,   
    private confirmationService: ConfirmationService,
    private toastr : ToastrService ) { }

    size :any;
    public p: any = 1;
    public totalItems:any=""
    public showSpaceErr: boolean = false;
    public searchText = "";
  ngOnInit() {
    this.getSize();
  }
  public searchtext(){
    let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
    if(spaceregex.test(this.searchText) ||(!this.searchText) )
    {
    this.showSpaceErr = false
    this.blockUI.start('Loading...' )
    this._service.getSize(this.searchText).subscribe(res=>{
      console.log(res,"Category")
        this.blockUI.stop();
      this.size= res.data
      this.totalItems = res.data.Count
      this.measurements = res.data.measurement
    })
    }
    else
    {
      this.showSpaceErr = true
    }
    }
  getSize(){
    this.blockUI.start('Loading...'); 
    this._service.getSize(this.searchText).subscribe(res=>{
      this.blockUI.stop(); 
      console.log(res)
      if(res.code == 200){
        this.size = res.data;
        this.measurements = res.data.measurement
        this.totalItems = res.data.Count
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
          this._service.deleteSize(id).subscribe(res=>{
            this.blockUI.stop();
         
          if(res.code === 200){
            this.toastr.success(res.message)
            this.getSize();
          }
        
        })
      },reject: () => {
       
    }
  })
  }

}
