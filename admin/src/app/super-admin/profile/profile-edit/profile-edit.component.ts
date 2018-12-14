import { Component, OnInit } from '@angular/core';
import {ProfileserviceService} from '../../services/profileservice.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoginService } from '../../../common/signup-signin/services/login.service';



@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public editProfileForm: FormGroup;

  constructor(private ProfileService:ProfileserviceService,private formbuilder : FormBuilder,
    private router : Router,private route : ActivatedRoute,private toastr:ToastrService,private _service : LoginService) { 
    this.editProfileForm =this.formbuilder.group({
      email: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      dob: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      id:['']
    })
  }

 
  ngOnInit() {
   
this.editprofile()

  }
  editprofile(){
    this.blockUI.start('Loading...'); // Start blocking
    
    this.ProfileService.getProfile().subscribe(res=>{  
      this.blockUI.stop();
        if (res.code === 200) {
          console.log(">>>>>>>>>",res)
          this.editProfileForm.patchValue({
            email:res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            dob: res.data.dob,
            id : res.data._id
         
          });
        }
        
      })
  }

  updateProfile(){
    this.blockUI.start('Loading...'); // Start blocking
    this.ProfileService.updateProfile(this.editProfileForm.value).subscribe(res=>{
      this.blockUI.stop();
  if (res.code==200){
    console.log(res.data,'----------')
  var temp = JSON.parse(localStorage.getItem('userData'));
  console.log(temp)
  temp.firstName = res.data.userData.firstName;
  temp.lastName = res.data.userData.lastName;

  this.ProfileService.setProfileName(res.data.userData.firstName +' '+ res.data.userData.lastName );
  this._service.setSession(temp);
 
 
    
  this.toastr.success("Profile updated successfully")
  this.router.navigate(['/auth/viewprofile'])
}
    })
  }

}
