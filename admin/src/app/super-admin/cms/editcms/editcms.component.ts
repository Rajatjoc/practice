import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CmsService } from '../../services/cms.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-editcms',
  templateUrl: './editcms.component.html',
  styleUrls: ['./editcms.component.scss']
})

export class EditcmsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
 
  public editCmsForm: FormGroup;
  public category : any;
  categories : any;
  view: boolean = false;
  isSubmited : boolean = false;
  subcategories: any = [];
  constructor(private formbuilder : FormBuilder,private route : ActivatedRoute,
    private CmsService : CmsService , private router : Router,private toastr : ToastrService,
    private _service : CategoryService) {
    this.editCmsForm =this.formbuilder.group({
      id: ['', [Validators.required]],
      page_title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      page_category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      content: ['', [Validators.required, Validators.minLength(3)]],
      CmsStatus:[''],
      sub_category: ['']
    })
   }

  ngOnInit() {
    let pageSlug =  this.route.snapshot.params.pageSlug;
    console.log(pageSlug);
    this.pageContent(pageSlug);
    this.getCategory();
    // this.getsub_Category();
  }
  pageContent(pageSlug){
    this.blockUI.start('Loading...'); // Start blocking
    this.CmsService.getspecificCMS(pageSlug)
      .subscribe(res => {
        this.blockUI.stop();
        console.log(res.data.page_category)
        this.category = res.data.page_category;
        if (res.code === 200) {
          console.log(res)
          if(res.data.sub_category){
            this.view = true
            this._service.getsubcategory(this.category).subscribe(res =>{
              console.log( res.data)
              if(res.code == 200){
                if(res.data.sub_category.length > 0){
                  this.subcategories = res.data.sub_category
                  console.log( this.subcategories)
                }
                else{
                  this.subcategories = [];
                }
              }
            })
          }
          
          this.editCmsForm.patchValue({
            page_title:res.data.page_title,
            content: res.data.content,
            page_category: res.data.page_category,
            CmsStatus: res.data.status,
            sub_category : res.data.sub_category,
            id :  res.data._id });
        }
        
      })
  }
  updateCms(){
    console.log(this.editCmsForm.value);
    if (this.editCmsForm.invalid) {
      this.isSubmited = true;
  
      return;
    }
    this.blockUI.start('Loading...'); // Start blocking
   
    this.CmsService.updateCMS(this.editCmsForm.value).subscribe(res =>{
      this.blockUI.stop();
      if(res.code === 200){
        this.toastr.success(res.message)
        this.router.navigate(['/auth/Cms'])
      }
    })
  }
  getCategory(){
    this.blockUI.start('Loading...');
    this._service.getAllCategory().subscribe(res=>{
     
      if(res.code == 200){
        console.log(res)
        this.blockUI.stop();
        this.categories = res.data;
      }
      this.blockUI.stop();
    })
  }
  // getsub_Category(){
  //   this.blockUI.start('Loading...');
  //   this._service.getAllCategory().subscribe(res=>{
  //     this.blockUI.stop();
  //     if(res.code == 200){
  //       this.categories = res.data;
  //     }
      
  //   })
  // }

  getsubcategory(event){
    console.log('here=------->>>>',event.target.value)
    this.editCmsForm.patchValue({
      sub_category:''
    });
    this.blockUI.start('Loading...');
    this._service.getsubcategory(event.target.value).subscribe(res =>{
      console.log( res.data)
      this.subcategories = [];
      this.editCmsForm.value.sub_category = '';
      console.log("fffffffffffffff",this.editCmsForm.value.sub_category)
      this.blockUI.stop();
      if(res.code == 200){
        
          if(res.data.sub_category.length == 0){
            
            console.log("Clear validations")
            this.editCmsForm.controls['sub_category'].clearValidators()
            this.editCmsForm.controls['sub_category'].updateValueAndValidity();
          }else{
            // this.editCmsForm.patchValue({
            //   sub_category:''
            // });
            console.log("Apply validations")
            this.subcategories = res.data.sub_category
            this.editCmsForm.controls['sub_category'].setValidators([Validators.required])
            this.editCmsForm.controls['sub_category'].updateValueAndValidity();
          }
      }
    })
  
  }
}
