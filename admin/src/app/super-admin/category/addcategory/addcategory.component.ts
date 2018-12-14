import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  addCategoryForm : FormGroup;
  isSubmited : boolean = false
  constructor(private formbuilder : FormBuilder,private _service : CategoryService, private router : Router,private route : ActivatedRoute) { }

  ngOnInit() {
    this.addCategoryForm =this.formbuilder.group({
      category_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      sub_category: this.formbuilder.array([])
      })
  }
  createCtaegory(){
    return this.formbuilder.group({
    name : ''
    });
    }
    add(){
      if (this.addCategoryForm.invalid) {
        this.isSubmited = true;
        return;
      }
    console.log(this.addCategoryForm.value);
    this.blockUI.start('Loading...'); // Start blocking
    this._service.addCategory(this.addCategoryForm.value).subscribe(res=>{
      this.blockUI.stop();
      if(res.code == 200){
        console.log(res)
        this.router.navigate(['/auth/category']);
        // this.displayDialog = false;
      }
      
    })
    }
    deleteRow(index: number){
      const control = <FormArray>this.addCategoryForm.controls['sub_category'];
      // remove the chosen row
      control.removeAt(index);
      }
      addtext(){
      const control = <FormArray>this.addCategoryForm.controls['sub_category'];
      control.push(this.createCtaegory());
      
      }
}
