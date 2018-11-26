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

  subcategories: any = null;
  constructor(private formbuilder : FormBuilder,private route : ActivatedRoute,
    private CmsService : CmsService , private router : Router,private toastr : ToastrService,
    private _service : CategoryService) {
    this.editCmsForm =this.formbuilder.group({
      id: ['', [Validators.required]],
      page_title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      page_category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      content: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      // sub_category: ['', [Validators.required]],
    })
   }

  ngOnInit() {
    let pageSlug =  this.route.snapshot.params.pageSlug;
    console.log(pageSlug);
    this.pageContent(pageSlug);
    this.getCategory();
  }
  pageContent(pageSlug){
    this.blockUI.start('Loading...'); // Start blocking
    this.CmsService.getspecificCMS(pageSlug)
      .subscribe(res => {
        this.blockUI.stop();
        console.log(res.data.page_category)
        this.category = res.data.page_category;
        if (res.code === 200) {
          if(res.data.sub_category){
            this.view = true
          }
          this.editCmsForm.patchValue({
            page_title:res.data.page_title,
            content: res.data.content,
            page_category: res.data.page_category,
            sub_category : res.data.sub_category,
          id :  res.data._id });
        }
        
      })
  }
  updateCms(){
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
    this._service.getAllCategory().subscribe(res=>{
      if(res.code == 200){
        this.categories = res.data;
      }
      
    })
  }
  // getsubcategory(event){
  //   console.log('here',event.target.value)
  //   this._service.getsubcategory(event.target.value).subscribe(res =>{
  //     console.log( res.data.sub_category)
  //     if(res.code){
  //       if(res.data.sub_category.length > 0){
  //         this.subcategories = res.data.sub_category
  //         console.log( this.subcategories)
  //       }
        
  //     }
  //   })
  
  // }
}
