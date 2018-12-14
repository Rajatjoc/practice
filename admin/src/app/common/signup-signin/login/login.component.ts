import { Component } from '@angular/core';
import { RouterModule ,Router  } from '@angular/router';

import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { DataExchangeService} from "../../dataExchange.service";
import {ProfileserviceService} from '../../../super-admin/services/profileservice.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  @BlockUI() blockUI: NgBlockUI;
  public userName : any;
  
  public loginForm: FormGroup;
  public user : any = {};
  isSubmited : boolean = false;
  constructor(private formbuilder : FormBuilder, private router : Router,
              private LoginService : LoginService,private toastr: ToastrService
            ,private DataExchangeService : DataExchangeService,
          private ProfileserviceService : ProfileserviceService)
  {
      this.loginForm =this.formbuilder.group({
        userEmail:['',[Validators.required,Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        userPassword:['',[Validators.required,Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})')]],

      })
  }
  ngOnInit()
  { 
    if(localStorage.getItem("token"))
    { 
   
      this.router.navigate(["auth"]);
    }
    else{
      this.router.navigate(["login"]);
    }
  }
  login()
  
  {
    if (this.loginForm.invalid) {
      this.isSubmited = true;
      this.toastr.error("Invalid Credentials");
      return;
    }
    let loginData ={
      userEmail : this.loginForm.controls.userEmail.value ,
      userPassword : this.loginForm.controls.userPassword.value
    }
    this.blockUI.start('Loading...'); // Start blocking
    
      this.LoginService.login(loginData).subscribe(res=>{
        console.log(res);
     
        if(res.code === 200){
      
          // localStorage.token = res.data.token;
          // this.DataExchangeService.setData("mohan");
          // this.userName = res.data.userData.firstNam
          // localStorage.setItem("userName" ,JSON.stringify(res.data.userData));
          localStorage.setItem('token',res.data.token);
        this.LoginService.setSession(res.data.userData);
          this.toastr.success(res.message);
          this.blockUI.stop();
          this.router.navigate(["auth"]);
        }else if(res.code ==201){
          this.toastr.warning(res.message);
          this.blockUI.stop();
          
        }else{
          this.toastr.warning(res.message);
          this.blockUI.stop();
          
        }
         this.blockUI.stop();
      })

  }
 
 }
