import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CmsService } from '../../services/cms.service'
import { Console } from '@angular/core/src/console';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-addcms',
  templateUrl: './addcms.component.html',
  styleUrls: ['./addcms.component.scss']
})
export class AddcmsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  
  public addCmsForm: FormGroup;
  isSubmited : boolean = false;
  categories : any;
  subcategories: any = [];
  constructor(private formbuilder : FormBuilder,
  private CmsService : CmsService,private router : Router,private toastr : ToastrService,
  private _service : CategoryService) { 



    this.addCmsForm =this.formbuilder.group({
      page_title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      page_category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      content: ['', [Validators.required]],
      sub_category: ['']
    })
  }

  ngOnInit() {
    this.getCategory();
  }
getCategory(){
  this.blockUI.start('Loading...'); // Start blocking 
  this._service.getAllCategory().subscribe(res=>{
    if(res.code == 200){
      console.log(res)
      this.categories = res.data;
      this.blockUI.stop();
    }
    this.blockUI.stop();
  })
}
getsubcategory(event){
  console.log('here',event.target.value)
  this.blockUI.start('Loading...');
  this._service.getsubcategory(event.target.value).subscribe(res =>{
    console.log( res.data)
    if(res.code == 200){
        this.subcategories = res.data.sub_category;
        if(res.data.sub_category.length == 0){
          console.log("Clear validations")
          this.addCmsForm.controls['sub_category'].clearValidators()
          this.addCmsForm.controls['sub_category'].updateValueAndValidity();
        }else{
          console.log("Apply validations")
          this.addCmsForm.controls['sub_category'].setValidators([Validators.required])
          this.addCmsForm.controls['sub_category'].updateValueAndValidity();
        }
        this.blockUI.stop();
      // this.blockUI.stop();
    }
  })

}
  addCms()
  {
    console.log(this.addCmsForm)
    // this.isSubmited = true;
    if (this.addCmsForm.invalid) {
      this.isSubmited = true;
  
      return;
    }
    this.blockUI.start('Loading...'); // Start blocking 
    this.CmsService.addCms(this.addCmsForm.value).subscribe(res=>{
      this.blockUI.stop();      
      if(res.code === 200){
        this.toastr.success(res.message)
        this.router.navigate(['/auth/Cms'])
      }else{
        this.toastr.warning(res.message)
      }
    })
  }
  
}
