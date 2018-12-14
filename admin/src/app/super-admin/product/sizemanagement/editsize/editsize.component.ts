import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-editsize',
  templateUrl: './editsize.component.html',
  styleUrls: ['./editsize.component.scss']
})
export class EditsizeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  editSizeForm: FormGroup
  isSubmited :boolean = false
  constructor(private formbuilder : FormBuilder,private route : ActivatedRoute,
    private _service : ProductService, private router : Router,private toastr : ToastrService,
   ) { }
   categories : any;
   subcategories : any;
  ngOnInit() {
    let pageSlug =  this.route.snapshot.params.pageSlug;
    console.log(pageSlug);
    this.pageContent(pageSlug);
    
    this.getcategory();
    
   
    this.editSizeForm = this.formbuilder.group({
      category:['',[Validators.required]],
      sub_category:["",[Validators.required]],
      length:["",[Validators.required]],
      width:["",[Validators.required]],
      sizeName:['',[Validators.required]],
      sizetype:["",[Validators.required]],
      id:["",[Validators.required]]
    })
  }
  getcategory(){
    this._service.getcategory().subscribe(res =>{
      console.log(res)
      if(res.code == 200){
        this.categories =res.data; 
      }
    })
  }
  
  getsubcategory(event){
    console.log(event.target.value)
    this._service.getsubcategory(event.target.value).subscribe(res=>{
      if(res.code == 200){
        console.log("subbbbbbbbbbbbbbbbbbbbbbbb",res.data.sub_category)
        this.subcategories =res.data.sub_category; 
      }
    })
  }
  pageContent(pageSlug){
    // this.blockUI.start('Loading...'); // Start blocking
    this._service.getspecificSize(pageSlug)
      .subscribe(res => {
        console.log(".",res)
        this.blockUI.stop();
        console.log(".//////////////", res.data.subCategory._id)
          this.editSizeForm.patchValue({
            category:res.data.Category._id,
            sub_category: res.data.subCategory._id,
            length : res.data.measurement[0].sizeValue,
            width: res.data.measurement[1].sizeValue,
            sizetype:res.data.measurement[0].sizetype,
            sizeName:res.data.sizeName,
          
            id :  res.data._id });
            this._service.getsubcategory(res.data.Category._id).subscribe(res=>{
              if(res.code == 200){
                this.blockUI.stop();
                console.log(res.data.sub_category,'----->>>>')
                this.subcategories =res.data.sub_category; 
                
              }
            })
        })
       
      }

      updateSize(){
        if(this.editSizeForm.invalid){
          this.isSubmited= true;
          return;
        }
        console.log(this.editSizeForm.value)
        this.blockUI.start('Loading...'); // Start blocking
        this._service.updateSize(this.editSizeForm.value).subscribe(res=>{
          this.blockUI.stop();
          if(res.code = 200){
            this.toastr.success(res.message);
            this.router.navigate(['/auth/product/listsize'])
          }
        })
      }








} 








         
      
  

