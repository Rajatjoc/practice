import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  editUserForm :  FormGroup;
  isSubmited : boolean = false
  constructor(
    private formbuilder : FormBuilder,
    private router : Router,
    private route : ActivatedRoute,
    private toastr:ToastrService,
    private _service : UserService) { }

  ngOnInit() {
    let pageSlug =  this.route.snapshot.params.pageSlug;
    this.getSpecificuser(pageSlug);
    this.editUserForm =this.formbuilder.group({
      email: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      status:['',[Validators.required]],
      id: ['']
    })
  }
getSpecificuser(id){
  this._service.getSpecific(id).subscribe(res=>{
    console.log(res)
    this.editUserForm.patchValue({
      email:res.data.email,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      status:res.data.active,
      id : res.data._id
    });
  })
}
updateUser(){
  if(this.editUserForm.invalid){
    this.isSubmited = true ;
    return;

  }
  
  this._service.updateuser(this.editUserForm.value).subscribe(res=>{
    console.log(res)
    if(res.code = 200){
   
      this.toastr.success(res.message);
      this.router.navigate(['/auth/manageuser'])
    }
  
  })
}
}
