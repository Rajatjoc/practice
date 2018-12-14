import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
@Component({
  selector: 'app-addsize',
  templateUrl: './addsize.component.html',
  styleUrls: ['./addsize.component.scss']
})
export class AddsizeComponent implements OnInit {

  public p: any = 1;
  public totalItems:any=""
  public showSpaceErr: boolean = false;
  public searchText = "";
  @BlockUI() blockUI: NgBlockUI;
  display = false;
  editdisplay = false;
  isSubmited:boolean= false
  categories : any;
  subcategories : any;
  public addsizeForm: FormGroup;
  constructor( private formbuilder : FormBuilder,
    private _service : ProductService,private router : Router,
    private toastr: ToastrService) { 

      this.addsizeForm = this.formbuilder.group({
        Size: ['', Validators.required],
        Length: ['', Validators.required],
        Width: ['', Validators.required],
        category: ['', [Validators.required,Validators.minLength(3)]],
        sub_category: ['', [Validators.required,Validators.minLength(3)]],
        type: ['', Validators.required],
        
  
      })
    }

  ngOnInit() {
    this.getcategory();
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
        console.log(res.data.sub_category)
        this.subcategories =res.data.sub_category; 
      }
    })
  }
  addsize() {
    console.log(this.addsizeForm,"FORM")
    if (this.addsizeForm.invalid){
      this.isSubmited = true;
      return;
    }
    // this.blockUI.start('Loading...'); // Start blocking
    console.log("Size", this.addsizeForm.value)
    this._service.addsize(this.addsizeForm.value).subscribe(res => {
      this.blockUI.stop();
      if (res.code == 200) {
         this.router.navigate(["/auth/product/listsize"]);
        this.toastr.success(res.message)
        
        
 
      }
    })
  }
}
