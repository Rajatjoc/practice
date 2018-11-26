import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';

import { RegistationService } from '../services/register.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  public selectedFile: any;
  public userRegistation: FormGroup;
  constructor(
    private RegistationService: RegistationService,
    private FormBuilder: FormBuilder,
    private Router : Router) {
    this.userRegistation = this.FormBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      userEmail: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      userPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
    });

  }

  getFileData(e) {
    this.selectedFile = e.target.files[0];
    console.log(this.selectedFile)
  }
  saveUserData() {

    let data = {
      userName: this.userRegistation.controls.userName.value,
      userEmail: this.userRegistation.controls.userEmail.value,
      userPassword: this.userRegistation.controls.userPassword.value,
    }
    const _formData = new FormData();
    _formData.append('file', this.selectedFile);
    _formData.append('userName', data.userName);
    _formData.append('userEmail', data.userEmail);
    _formData.append('userPassword', data.userPassword);
    console.log("data>>", data);

    this.RegistationService.register(_formData).subscribe(res => {
      console.log(">>>",res[status]);
      if(res[status] === 200)
      {
        this.Router.navigate(["/login"]);
      }
    })
  }


}
