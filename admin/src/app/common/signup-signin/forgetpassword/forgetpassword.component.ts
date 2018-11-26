import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule ,Router  } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  forgetPasswordForm : FormGroup;
  isSubmited : boolean = false;
  constructor(private formbuilder : FormBuilder,
    private LoginService : LoginService,private toastr: ToastrService,private router:Router) {
    this.forgetPasswordForm =this.formbuilder.group({
      userEmail:['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    })
   }

  ngOnInit() {
  }
  forgetpassword(){
    if (this.forgetPasswordForm.invalid) {
      this.isSubmited = true;
      this.toastr.error("Invalid Credentials");
      return;
    }
    console.log(this.forgetPasswordForm.value);
    this.blockUI.start('Loading...'); // Start blocking
    this.LoginService.forgetpassword(this.forgetPasswordForm.value).subscribe(res=>{
      this.blockUI.stop();
      if(res.code===200){
        this.toastr.success(res.message);
        this.router.navigate(['message_resetpassword'])
        //model.open()
      }
      else if(res.code===202){
        this.toastr.warning(res.message);

      }
      console.log(res);
    })
  }
}
