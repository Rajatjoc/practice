import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute,Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ToastrService} from 'ngx-toastr'
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-editprocategory',
  templateUrl: './editprocategory.component.html',
  styleUrls: ['./editprocategory.component.scss']
})
export class EditprocategoryComponent implements OnInit {
  categoryForm : FormGroup ;
  length : number = 0;
  pageSlug;  
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private formbuilder : FormBuilder,
    private _service : ProductService,
    private router : Router,
    private route : ActivatedRoute,
    private toastr:ToastrService,
    private confirmationService : ConfirmationService 
  ) { }

  ngOnInit() {

    this.pageSlug =  this.route.snapshot.params.pageSlug;    
    this.getSpecificProduct(this.pageSlug);
    this.categoryForm =this.formbuilder.group({
      category_name: ['', [Validators.required]],
      sub_category: this.formbuilder.array([])
    })
  }
  get sub_category(): FormArray { return this.categoryForm.get('sub_category') as FormArray; }
  
  getSpecificProduct(id){
    this.blockUI.start('Loading...'); // Start blocking
    this._service.getSpecificProductCategory(id).subscribe(res=>{
      this.blockUI.stop();
      console.log(res)
   
      if(res.code == 200){
        console.log(res.data)
        this.categoryForm.patchValue({
          category_name:res.data.title,
          id : res.data._id,
      });
      
        this.sub_category.patchValue(['hi','hello'])
        this.length = res.data.sub_category.length;
      
        if(this.length > 0){
          for(var i = 0; i < this.length ; i++){
         
            this.addtext(res.data.sub_category[i]);
        
            if(res.data.sub_category[i].hasSubcategory.length > 0){
              var l = res.data.sub_category[i].hasSubcategory.length; 
           
              for(var j = 0 ; j < l ;j++){
                this.formbuilder.control['sub_category'] = res.data.sub_category[i].hasSubcategory[j];
                // console.log(res.data.sub_category[i].hasSubcategory[j],'in j loop')
                this.addNewProject1(res.data.sub_category[i].hasSubcategory[j])
              }
            }
          }
            this.formbuilder.control['sub_category'] = res.data.sub_category;
            this.formbuilder.array(res.data.sub_category.map(i => this.formbuilder.group(i)));
             console.log(this.formbuilder.control['sub_category'])
            
            this.categoryForm.patchValue({
               sub_category:[this.formbuilder.control['sub_category']]
             })
            //  console.log(this.categoryForm.value)
        }
    }
    })
  }

  addtext(value:any){
    // console.log(value,"Sanjeev")
    const control = <FormArray>this.categoryForm.controls['sub_category'];
    control.push(this.createCategory(value));
    
  }
  addNewProject1(value) {
    console.log('--->>>>',value)
    const control = <FormArray>this.categoryForm.controls['sub_category'] ;
    console.log(control)
    control.push(
      this.formbuilder.group({
        deep_sub_category : value
    }))
  }
  
  addnewtext(){
    const control = <FormArray>this.categoryForm.controls['sub_category'];
    control.push(this.createCategory1());
    
  }
  
  deleteRow(event:any,index: number){
    let data = {
      category_name : this.categoryForm.controls['category_name'].value,
      sub_categoryID : event.value._id
    }
    this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
              const control = <FormArray>this.categoryForm.controls['sub_category'];
              this._service.updateProdSubCategory(data).subscribe(res=>{
                if(res.code == 200){
                  this.toastr.success('Sub Category deleted successfully.')
                  control.removeAt(index);
                }
              })
          },reject: () => {
            
        }
      });
  }

  createCategory(text){
      return this.formbuilder.group({
        category_name : text.title,
        _id : text._id,
        deep_sub_category: this.formbuilder.array([])    
      });
    }
    createCategory1(){
      return this.formbuilder.group({
        category_name : '',
        _id : null,
        deep_sub_category: this.formbuilder.array([])
      });
    }

    update(){
      console.log(this.categoryForm.value)
      let data = {
        form:this.categoryForm.value,
        category_id : this.pageSlug
      }
      this.blockUI.start('Loading...'); // Start blocking
      this._service.updateProdCategory(data).subscribe(res =>{
        if(res.code == 200){
          this.toastr.success(res.message)
          this.blockUI.stop()
           this.router.navigate(['/auth/product/manageproduct']);
        }
      })
    }


    addNewProject(control) {
      console.log(control,'here')
      control.push(
        this.formbuilder.group({
          deep_sub_category : ''
      }))
    }
    
    deleteProject(control, index) {
      control.removeAt(index)
    }

}
