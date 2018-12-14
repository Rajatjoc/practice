import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute,Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productcategory',
  templateUrl: './productcategory.component.html',
  styleUrls: ['./productcategory.component.scss']
})
export class ProductcategoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  isSubmited : boolean= true
  categoryForm : FormGroup;
  constructor(private formbuilder : FormBuilder,private _service : ProductService,
    private toastr:ToastrService,
    private router : Router) { }

  ngOnInit() {
    this.categoryForm =this.formbuilder.group({
      category: ['', [Validators.required, Validators.minLength(3)]],
      sub_category: this.formbuilder.array([])
    })
  }
  createCtaegory(){
    return this.formbuilder.group({
    name : '',
    deep_sub_category: this.formbuilder.array([])    
    });
    }


    addNewProject(control) {
      console.log(control)
      control.push(
        this.formbuilder.group({
          deep_sub_category :['', [Validators.required, Validators.minLength(3)]],
      }))
    }
    
    deleteProject(control, index) {
      control.removeAt(index)
    }
  addtext(){
 
      if (this.categoryForm.invalid){
        this.isSubmited = true ;
        return

      }
    console.log('here ')
    const control = <FormArray>this.categoryForm.controls['sub_category'];
    control.push(this.createCtaegory());
    this.categoryForm.reset()
    }
    add(){
      if (this.categoryForm.invalid){
        this.isSubmited = true ;
        return

      }
      console.log(this.categoryForm.value)
      this.blockUI.start('Loading...' )
      this._service.addCategory(this.categoryForm.value).subscribe(res=>{
        this.blockUI.stop();
        console.log(res)
        if(res.code == 200){
          this.toastr.success(res.message)
          this.router.navigate(['/auth/product/manageproduct']);
          this.categoryForm.reset()
        }
        else{
          this.toastr.error(res.message)
        }
      })
    }
    deleteRow(index: number){
      const control = <FormArray>this.categoryForm.controls['sub_category'];
      // remove the chosen row
      control.removeAt(index);
      }
}
