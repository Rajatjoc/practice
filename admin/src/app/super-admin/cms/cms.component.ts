import { Component, OnInit } from '@angular/core';
import { CmsService } from '../services/cms.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  pages: any;
  public showSpaceErr : boolean = false;
  public searchText = ''
  public p: any = 1;
  public totalItems: any = '';
  constructor(private _service: CmsService, private router: Router,
    private confirmationService: ConfirmationService,private toastr : ToastrService) { }

  ngOnInit() {
    this.getcms();
  }
  public searchtext()
  {
   let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
   console.log(">>>>>>>>>>>>>",spaceregex.test(this.searchText))
   if(spaceregex.test(this.searchText)  || (!this.searchText))
   {  this.showSpaceErr = false;
    console.log(this.searchText)
    this.blockUI.start('Loading...'); // Start blocking
    this._service.getAllCMS(this.searchText).subscribe(res => {
      console.log(res);
      if (res.code == 200) {
        this.blockUI.stop();
        this.pages = res.data;
        this.totalItems = res.data.Count;
      }
    })
   }
   else
   {
     this.showSpaceErr = true;
   }
    
    
  }
  pageChanged($event) {
    this.p = $event;
  }
  getcms() {

    // console.log('res',res);
    this.blockUI.start('Loading...'); // Start blocking
    this._service.getAllCMS(this.searchText).subscribe(res => {
      console.log(res); 
      if (res.code == 200) {
        console.log(res)
        this.pages = res.data;
        this.totalItems = res.data.Count;
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
        this._service.deleteCMS(id).subscribe(res=>{
          this.blockUI.stop();
        console.log(res.code);
        this.getcms();
        this.toastr.success(res.message)
      
      })
    },reject: () => {
     
  }
})
}
}