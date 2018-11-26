import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  ResetPasswordForm: FormGroup;
  isSubmited: boolean = false;
  pageSlug: any;
  constructor(private formbuilder: FormBuilder,
    private LoginService: LoginService, private toastr: ToastrService,
    private route: ActivatedRoute
    , private router: Router) {
    this.ResetPasswordForm = this.formbuilder.group({
      password: ['', [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})')]],
      confirm_password: ['', [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})')]]
    }
      , { validator: this.passwordConfirming })
  }

  ngOnInit() {
    this.pageSlug = this.route.snapshot.queryParams;
    console.log(this.pageSlug)
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
      return { invalid: true };
    }
    else {
      return { invalid: false };
    }
  }
  resetPassword() {

    if (this.ResetPasswordForm.invalid) {
      this.isSubmited = true;
      this.toastr.error("Invalid Credentials");
      return;
    }
    console.log("reset password", this.ResetPasswordForm.value);
    let resetData = {
      value: this.ResetPasswordForm.value,
      data: this.pageSlug
    }

    this.blockUI.start('Loading...'); // Start blocking
    this.LoginService.ResetPassword(resetData).subscribe(res => {
      this.blockUI.stop();
      if (res.code === 200) {
        this.toastr.success(res.message);
        this.router.navigate(['message_resetpassword'])
        //model.open()
      }
      else if (res.code === 202) {
        this.toastr.warning(res.message);

      }
    })

  }
}
