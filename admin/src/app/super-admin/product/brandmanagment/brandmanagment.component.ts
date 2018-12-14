import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
  selector: 'app-brandmanagment',
  templateUrl: './brandmanagment.component.html',
  styleUrls: ['./brandmanagment.component.scss']
})

export class BrandmanagmentComponent implements OnInit {
  brands: any;
  
  public p: any = 1;
  public totalItems:any=""
  public showSpaceErr: boolean = false;
  public searchText = "";
  @BlockUI() blockUI: NgBlockUI;
  display = false;
  editdisplay = false;
  public brandForm: FormGroup;
isSubmited :boolean = false
  constructor(private _service: ProductService, private formbuilder: FormBuilder,
    private router: Router, private toastr: ToastrService, private route: ActivatedRoute,
   private confirmationService : ConfirmationService
  ) {
    this.brandForm = this.formbuilder.group({
      brand: ['', [Validators.required,Validators.minLength(3)]],
      id:[]

    })
  }

  ngOnInit() {
    this.getbrands();

    
  }
  public searchtext(){
    let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
    if(spaceregex.test(this.searchText) ||(!this.searchText) )
    {
    this.showSpaceErr = false
    this.blockUI.start('Loading...' )
    this._service.getAllBrand(this.searchText).subscribe(res=>{
      console.log(res,"orders")
        this.blockUI.stop();
      this.brands= res.data
      this.totalItems = res.data.Count
    })
    }
    else
    {
      this.showSpaceErr = true
    }
    }
    pageChanged($event) {
      this.p = $event;
    }
  getbrands() {
    this.blockUI.start('Loading...'); // Start blocking
    this._service.getAllBrand(this.searchText).subscribe(res => {
      console.log(res)
      this.blockUI.stop();
      this.brands = res.data
      this.totalItems = res.data.Count
    })
  }
  showDialog() {
    this.brandForm.reset()
    this.display = true;
  }
  showEditDialog(id) {
    this.blockUI.start('Loading...'); // Start blocking
    this._service.getspecificBrands(id)
      .subscribe(res => {
        this.editdisplay = true;
        console.log(".", res)
        this.blockUI.stop();

        this.brandForm.patchValue({
          brand: res.data.title,
          id: res.data._id
        });
      
      })
   

  }
  addbrand() {
    if(this.brandForm.invalid){
      this.isSubmited= true;
      return;
    }
    this.blockUI.start('Loading...'); // Start blocking
    console.log("brandss", this.brandForm.value)
    this._service.addbrand(this.brandForm.value).subscribe(res => {

      this.blockUI.stop();
      if (res.code == 200) {
        this.getbrands();
        this.toastr.success(res.message)
       
        this.display = false;
        
 
      }
    })
  }
  updatebrand(){
    if(this.brandForm.invalid){
      this.isSubmited= true;
      return;
    }
    this.blockUI.start('Loading...'); // Start blocking
    this._service.updatebrand(this.brandForm.value).subscribe(res=>{
      this.blockUI.stop();
if (res.code == 200){
  console.log(res)
  this.getbrands();

  this.editdisplay =  false;
  this.toastr.success(res.message)
  this.brandForm.reset()
   }
    })
  }

  delete(id){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.blockUI.start('Loading...'); // Start blocking
    this._service.deletebrand(id).subscribe(res=>{
      this.blockUI.stop();
      if (res.code == 200){
        console.log(res)
        this.getbrands();
        this.toastr.success(res.message)
         }
          })
        },reject: () => {
        }
})
  }
}