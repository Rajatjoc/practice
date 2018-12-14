import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  total_file : any ;
  values: string[];
  colors:any;
  imgArr : any;
  brands : any;
  categories : any;
  subcategories : any;  
  deepsubcategories : any;
  countries : any;
  productForm: FormGroup;
  sizes : any;
  searchString : any = '';
  isSubmited : boolean = false
  constructor(  private formbuilder : FormBuilder,
  private _service : ProductService,private router : Router) {
   
   }

  ngOnInit() {
    this.productForm =this.formbuilder.group({
      product_name: ['', [Validators.required,Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      varient: this.formbuilder.array([]),
      category: ['', [Validators.required, Validators.minLength(3)]],
      sub_category: ['', [Validators.required, Validators.minLength(3)]],
      deepsub_category: ['', [Validators.required, Validators.minLength(3)]]
    })
  this.getbrand();
  this.getcategory();
  this.getcountry();
  this.getcolor();
  this.getsize();
  }
  getsize(){
    this.blockUI.start('Loading...');
    this._service.getsizes().subscribe(res=>{

      if(res.code == 200){
        this.blockUI.stop();
        this.sizes =res.data; 
      }
    })
  }
  getcolor(){
    this.blockUI.start('Loading...');
    this._service.getColors().subscribe(res=>{
      if(res.code == 200){
        this.blockUI.stop();
        this.colors =res.data; 
      }
    })
  }
  getcountry(){
    this.blockUI.start('Loading...');
    this._service.getcountries().subscribe(res=>{
      console.log(res)
      if(res.code == 200){
        this.blockUI.stop();
        this.countries =res.data; 
      }
    })
  }
  getcategory(){
    this.blockUI.start('Loading...');
    this._service.getcategory().subscribe(res =>{
      console.log(res)
      if(res.code == 200){
        this.categories =res.data; 
      }
    })
  }
  getsubcategory(event){
    console.log(event.target.value)
    this.blockUI.start('Loading...');
    this._service.getsubcategory(event.target.value).subscribe(res=>{
      if(res.code == 200){

        if(res.data.sub_category.length == 0){
          console.log("length",res.data.sub_category.length)
          console.log("Clear validations")
          this.productForm.controls['sub_category'].clearValidators()
          this.productForm.controls['sub_category'].updateValueAndValidity();
        }else{
          console.log("Apply validations")
          this.productForm.controls['sub_category'].setValidators([Validators.required])
          this.productForm.controls['sub_category'].updateValueAndValidity();
        }
        this.blockUI.stop();
        console.log(res.data.sub_category)
        this.subcategories =res.data.sub_category; 
      }
    })
  }
  getDeepsubcategory(event){
    console.log(event.target.value)
    this.blockUI.start('Loading...');
    this._service.getDeepSubcategory(event.target.value).subscribe(res=>{
      if(res.code == 200){
        console.log("deeeppppppppppppp ",res.data)
        console.log("deeeppppppppppppp ",res.data)
        if(res.data[0].sub_category && res.data[0].sub_category.length == 0){
          console.log("Clear validations")
          this.productForm.controls['deepsub_category'].clearValidators()
          this.productForm.controls['deepsub_category'].updateValueAndValidity();
        }else{
          console.log("Apply validations")
          this.productForm.controls['deepsub_category'].setValidators([Validators.required])
          this.productForm.controls['deepsub_category'].updateValueAndValidity();
        }
        this.blockUI.stop();
        console.log(res.data)
        this.deepsubcategories = res.data[0].sub_category; 
      }
    })
  }
  getbrand(){
    this.blockUI.start('Loading...');
    this._service.getAllBrand(this.searchString).subscribe(res =>{
      console.log(res)
      if(res.code == 200){
        this.blockUI.stop();
        this.brands =res.data; 
      }
    })
  }
  createCtaegory(){
    // console.log("////////////////VVVVVVvv" )
    // this.productForm.controls['varient'].setValidators([Validators.required])
    // this.productForm.controls['varient'].updateValueAndValidity();
    return this.formbuilder.group({
      country:'',
      color:'',
      size:'',
    });
   
    }
  preview_images(event){
    console.log('hemu', event.target.files);
    this.imgArr = event.target.files;
    this.total_file = event.target.files.length;
    console.log(this.total_file);
    
  }

  setproduct(){
    console.log(this.productForm)
    if(this.productForm.invalid){
      this.isSubmited = true;
      return
    }
     this.blockUI.start('Loading...');
    console.log(this.productForm.value)
    this._service.addProduct(this.productForm.value).subscribe(res =>{
      console.log(res)
      if(res.code == 200){
        this.blockUI.stop();
        this.router.navigate(['/auth/product/varient/'+ res.data._id])
      }
      this.blockUI.stop();
    })
  }
  addtext(){
 

    const control = <FormArray>this.productForm.controls['varient'];  
    console.log("Validators Applying",this.productForm.controls['varient'])

    control.push(this.createCtaegory());
    control.setValidators([Validators.required])
    control.updateValueAndValidity();
    
    }
    deleteRow(index: number){
      const control = <FormArray>this.productForm.controls['varient'];
      // remove the chosen row
      control.removeAt(index);
      }


    
}
