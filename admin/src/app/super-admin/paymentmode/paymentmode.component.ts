import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { PaymentService } from '../services/payment.service';


@Component({
  selector: 'app-paymentmode',
  templateUrl: './paymentmode.component.html',
  styleUrls: ['./paymentmode.component.scss']
})
export class PaymentmodeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  constructor( private _service: PaymentService) { }
  public searchText = "";
  paymentmodes: any ;

  public p: any = 1;
  public totalItems:any=""
  public showSpaceErr: boolean = false;
  ngOnInit() {
    this.getpaymentmodes();
  }
  public searchtext(){
    let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
    if(spaceregex.test(this.searchText) ||(!this.searchText) )
    {
    this.showSpaceErr = false
    this.blockUI.start('Loading...' )
    this._service.getpaymentmodes(this.searchText).subscribe(res=>{
      console.log(res,"orders")
        this.blockUI.stop();
      this.paymentmodes= res.data
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
  getpaymentmodes() {
    this.blockUI.start('Loading...'); // Start blocking
    this._service.getpaymentmodes(this.searchText).subscribe(res => {
      console.log(res)
      this.blockUI.stop();
      this.paymentmodes = res.data
      this.totalItems = res.data.Count
    })
  }
}
