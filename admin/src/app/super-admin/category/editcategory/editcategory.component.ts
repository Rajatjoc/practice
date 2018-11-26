import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute,Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  editCategoryForm : FormGroup;
  length : number = 0;
  public data :any = [];
    constructor(private formbuilder : FormBuilder,private _service : CategoryService,
      private router : Router,private route : ActivatedRoute, private toastr:ToastrService) { }

  ngOnInit() {
    let pageSlug =  this.route.snapshot.params.pageSlug;
    console.log(pageSlug);
    this.getSpecificCategory(pageSlug);

    this.editCategoryForm =this.formbuilder.group({
      id:['', [Validators.required]],
      category_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      sub_category: this.formbuilder.array([])
      })
  }
  
  createCategory(text){
    return this.formbuilder.group({
    name : text.category_name
    });
    }
    createCategory1(){
      return this.formbuilder.group({
      name : ''
      });
      }
  get sub_category(): FormArray { return this.editCategoryForm.get('sub_category') as FormArray; }
    
  getSpecificCategory(id){
    this.blockUI.start('Loading...'); // Start blocking
    this._service.getSpecificCategory(id).subscribe(res=>{
      this.blockUI.stop();
      console.log(res)
   
      if(res.code == 200){
        // this.toastr.success(res.message)
        this.editCategoryForm.patchValue({
          category_name:res.data.category_name,
          id : res.data._id,
      
      });
      
        this.sub_category.patchValue(['hi','hello'])
        this.length = res.data.sub_category.length;
        if(this.length > 0){
          for(var i = 0; i < this.length ; i++){
            this.addtext(res.data.sub_category[i]);
          
          }
            this.formbuilder.control['sub_category'] = res.data.sub_category;
            this.formbuilder.array(res.data.sub_category.map(i => this.formbuilder.group(i)));
            console.log(this.formbuilder.control['sub_category'])
            
            this.editCategoryForm.patchValue({
               sub_category:[this.formbuilder.control['sub_category']]
             })
             console.log(this.editCategoryForm.value)
        }
    }
    })
  }
  addtext(value:any){
    const control = <FormArray>this.editCategoryForm.controls['sub_category'];
    control.push(this.createCategory(value));
    
  }
  addnewtext(){
    const control = <FormArray>this.editCategoryForm.controls['sub_category'];
    control.push(this.createCategory1());
    
  }
    deleteRow(index: number){
      const control = <FormArray>this.editCategoryForm.controls['sub_category'];
      // remove the chosen row
      control.removeAt(index);
      }

      edit(){
        console.log(this.editCategoryForm.value)
        this.blockUI.start('Loading...'); // Start blocking
        this._service.updateCategory(this.editCategoryForm.value).subscribe(res =>{
          if(res.code == 200){
            this.toastr.success(res.message)
            this.blockUI.stop()
             this.router.navigate(['/auth/category']);
            console.log(res)
          }
        })
      }
}
