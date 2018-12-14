import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  pages : any;
  public showSpaceErr:boolean=false
  public searchText = '';
  public p: any = 1;
  public totalItems: any = '';
  constructor(private _service : UserService , private confirmationService : ConfirmationService) { }

  ngOnInit() {
    this.getusers();
  }
  pageChanged($event) {
    this.p = $event;
  }
  getusers(){
    this.blockUI.start('Loading...');
    this._service.getuserlist(this.searchText).subscribe(res =>{
      console.log(res)
      if(res.code=200){
        this.pages = res.data;
        this.totalItems = res.data.Count;
        this.blockUI.stop();   
      }
      this.blockUI.stop();   
    })
    
  }
  searchtext() {
    let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
    if(spaceregex.test(this.searchText) ||(!this.searchText) )
    {
      this.showSpaceErr = false
    console.log(this.searchText)
    this.blockUI.start('Loading...');
    this._service.getuserlist(this.searchText).subscribe(res => {
      if (res.code == 200) {
        this.pages = res.data;
       this.totalItems = res.data.Count;
      }
    })
    this.blockUI.stop();   
  }
  else{
    this.showSpaceErr = true
  }
}
  delete(id) {
    
        this.confirmationService.confirm({
    
          message: 'Are you sure that you want to perform this action?',
          header: 'Confirmation',
          icon: 'fa fa-question-circle',
          accept: () => {
            this.blockUI.start('Loading...'); // Start blocking
            this._service.deleteuser(id).subscribe(res=>{
            if(res.code === 200){
              this.getusers()
              this.blockUI.stop();
            }
           
          })
        },reject: () => {
         
      }
    })
    }
}
