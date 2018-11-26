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
  isSubmited : boolean =false;
  categories : any;
  subcategories: any = null;
  constructor(private formbuilder : FormBuilder,
  private CmsService : CmsService,private router : Router,private toastr : ToastrService,
 private _service : CategoryService) { 



    this.addCmsForm =this.formbuilder.group({
      page_title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      page_category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      content: ['', [Validators.required]],
      sub_category: ['', ],
    })
  }

  ngOnInit() {
    this.getCategory();
  }
getCategory(){
  this._service.getAllCategory().subscribe(res=>{
    if(res.code == 200){
      this.categories = res.data;
    }
    
  })
}
getsubcategory(event){
  console.log('here',event.target.value)
  this._service.getsubcategory(event.target.value).subscribe(res =>{
    console.log( res.data.sub_category)
    if(res.code){
      if(res.data.sub_category.length > 0){
        this.subcategories = res.data.sub_category
        console.log( this.subcategories)
      }
      
    }
  })

}
  addCms()
  {
    if (this.addCmsForm.invalid) {
      this.isSubmited = true;
      this.toastr.error("Invalid Credentials");
      return;
    }
    this.blockUI.start('Loading...'); // Start blocking
    
    this.CmsService.addCms(this.addCmsForm.value).subscribe(res=>{
      this.blockUI.stop();
      
      if(res.code === 200){
        this.toastr.success(res.message)
        this.router.navigate(['/auth/Cms'])
      }
    })
  }
  
}
