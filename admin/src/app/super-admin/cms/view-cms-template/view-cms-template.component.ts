import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CmsService } from '../../services/cms.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-view-cms-template',
  templateUrl: './view-cms-template.component.html',
  styleUrls: ['./view-cms-template.component.scss']
})
export class ViewCmsTemplateComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  template : any;
  constructor(private formbuilder : FormBuilder,private route : ActivatedRoute,
    private CmsService : CmsService , private router : Router,private toastr : ToastrService) {

     }

  ngOnInit() {
    let pageSlug =  this.route.snapshot.params.pageSlug;
    console.log(pageSlug);
    this.pageContent(pageSlug);
  }
  pageContent(pageSlug){
    this.blockUI.start('Loading...'); // Start blocking
  
    this.CmsService.getspecificCMS(pageSlug)
      .subscribe(res => {
        this.blockUI.stop();
        
        this.template = res.data.content;
        console.log("vieeeewww",res.data)
        // this.category = res.data.page_category;

        // if (res.code === 200) {
        //   this.editCmsForm.patchValue({
        //     page_title:res.data.page_title,
        //     content: res.data.content,
        //     page_category: res.data.page_category,
        //   id :  res.data._id });
        // }
        
      })
  }
  // updateCms(){
  //   this.CmsService.updateCMS(this.editCmsForm.value).subscribe(res =>{
  //     if(res.code === 200){
  //       this.toastr.success(res.message)
  //       this.router.navigate(['/auth/Cms'])
  //     }
  //   })
  // }
}
