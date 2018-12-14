import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  editproductForm: FormGroup;
  variants : any;
  images : any;
  colors:any;
  brands : any;
  categories : any;
  subcategories : any;  
  countries : any;
  sizes : any;
  searchString: any = "";
  deepsubcategories : any;
  display : any = false;
  isSubmited: boolean= false
  public test = new FormData();
  selectedFile: any = [];
  urls = new Array<string>();
  public apiUrl = environment.API_ENDPOINT;
 public imageSrc:String = '';
  id : any ;
  constructor( private formbuilder : FormBuilder,
    private _service : ProductService,
    private router : Router,
    private toastr : ToastrService,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.editproductForm =this.formbuilder.group({
      product_name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3) ]],
      brand: ['', [Validators.required, Validators.minLength(3)]],
      varient: this.formbuilder.array([]),
      category: ['',[Validators.required, Validators.minLength(3)]],
      sub_category: ['',[Validators.required, Validators.minLength(3)]],
      id:[],
      deepsub_category: ['',[Validators.required, Validators.minLength(3)]],
      OrderStatus:['',[Validators.required, Validators.minLength(3)]]
    })
    let pageSlug =  this.route.snapshot.params.pageSlug;
    console.log(pageSlug);
    this.getProduct(pageSlug);
    this.getbrand();
    this.getcategory();
    this.getcountry();
    this.getcolor();
    this.getsize();
  }
  
  updateProduct(){
    console.log('here',this.editproductForm)

     if (this.editproductForm.invalid){
       this.isSubmited = true;
      
       return;
     }
    console.log(this.editproductForm.value)
    this._service.updateProduct(this.editproductForm.value).subscribe(res=>{
      console.log(res)
      if(res.code == 200){
        this.router.navigate(["/auth/product/product"])
        this.toastr.success(res.message)
        this.getProduct(this.id);
      }
    })
  }  getsize(){
    this.blockUI.start('Loading...');
    this._service.getsizes().subscribe(res=>{
      console.log(res)
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
        console.log(res)
        this.colors =res.data; 
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
      console.log(res,'ghere')
      if(res.code == 200){
      //   if(res.data.sub_category.length == 0){
      //     console.log("length",res.data.sub_category.length)
      //     console.log("Clear validations")
      //     this.editproductForm.controls['sub_category'].clearValidators()
      //     this.editproductForm.controls['sub_category'].updateValueAndValidity();
      //   }else{
      //     console.log("Apply validations")
      //     this.editproductForm.controls['sub_category'].setValidators([Validators.required])
      //     this.editproductForm.controls['sub_category'].updateValueAndValidity();
      //   }
        this.blockUI.stop();
        this.categories = res.data; 
        console.log("cat", this.categories)
      }
      this.blockUI.stop();
    })
  }
  getsubcategory(event){
    this.blockUI.start('Loading...');
    console.log(event.target.value)
    this._service.getsubcategory(event.target.value).subscribe(res=>{
      if(res.code == 200){
        this.blockUI.stop();
        console.log(res.data.sub_category)
        this.subcategories =res.data.sub_category; 
      }
    })
  }
  getProduct(id){
    this.blockUI.start('Loading...');
    this._service.getSpecificProduct(id).subscribe(res=>{
      console.log(res)
      if(res.code == 200){
        console.log(res.data)
       
        this.variants = res.data.variants;
        this.images = res.data.images;
        this.id = res.data._id;

        this.editproductForm.patchValue({
          product_name : res.data.product_name,
          description : res.data.description,
          brand : res.data.brand._id,
          category : res.data.category._id,
          sub_category : res.data.sub_category._id,
          id :  res.data._id,
          deepsub_category : res.data.deepsub_category,
      OrderStatus:res.data.status
    });

          this._service.getsubcategory(res.data.category._id).subscribe(res=>{
            if(res.code == 200){
              console.log(res.data.sub_category)
              this.subcategories =res.data.sub_category; 
            }
          })

          this._service.getDeepSubcategory(res.data.sub_category._id).subscribe(res=>{
            if(res.code == 200){
              console.log(res.data)
              this.deepsubcategories = res.data[0].sub_category; 
            }
          })
          this.blockUI.stop();
      }
      })
    }
    removeimage(url,index){
      this.urls.splice(index,1);
      this.selectedFile.splice(index,1);
    }
    


    addImageLeft(event,update){
      let reader = new FileReader();
      let files = event.target.files;
     
      if (files) {
        // console.log(files[0])
          Array.from(files).forEach((file,index) => { 
            let reader = new FileReader();
            reader.onload = (e: any) => {
              console.log(e.target.result,"here is the result")
              this.selectedFile.push(event.target.files[index]);          
              this.urls.push(e.target.result);
            }
            reader.readAsDataURL(files[index]);
            });
      } 
    }
    /**
     * function : Multiple Image upload on button click
     * @Created : Dec 11,2018
     * By : Sanjeev Gupta
     * @modified Date: -
     */

    onUpload() {
      let self = this;
      // upload code goes here
      console.log(this.selectedFile)
      this.urls = [];
      if(this.selectedFile == undefined){
        this.toastr.warning("First choose Images");
        return
      }
      const [file] = this.selectedFile;
      let reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = () => {
        const formData = new FormData();
        formData.append('id', this.id);
        for(var i = 0 ; i < this.selectedFile.length; i++)
        {
          console.log(reader.result,"reader.result")
          this.imageSrc = reader.result;                   
          
           formData.append("image", this.selectedFile[i]);
        }
      this._service.uploadImage(formData).subscribe(res => {
          if (res.status == 200) {
            this.selectedFile = []
            if(res.data instanceof Array){
              res.data.forEach(function(element){
                console.log(element.images)
                self.images.push(element.images.substr(7));                    
              })
            }else{
              console.log('Inside else')
              
              self.images.push(res.data.images.substr(7));                    
            }
            this.toastr.success('Image Added Successfully.')
          }
        })
      }
    }
    getDeepsubcategory(event){
      console.log(event.target.value)
      this.blockUI.start('Loading...');
      this._service.getDeepSubcategory(event.target.value).subscribe(res=>{
        
          if(res.code == 200){
         
       
            if(res.data[0].sub_category && res.data[0].sub_category.length == 0){
              console.log("Clear validations")
              this.editproductForm.controls['deepsub_category'].clearValidators()
              this.editproductForm.controls['deepsub_category'].updateValueAndValidity();
            }else{
              console.log("Apply validations")
              this.editproductForm.controls['deepsub_category'].setValidators([Validators.required])
              this.editproductForm.controls['deepsub_category'].updateValueAndValidity();
            }
          this.blockUI.stop();
          console.log(res.data)
          this.deepsubcategories = res.data[0].sub_category; 
        }
      })
    }
  
    deleteimage(image:any,index){
      this.images.splice(index,1);
      console.log(this.images)
      var data = {
        id : this.id,
        image : this.images
      }
      this.blockUI.start('Loading...');
      this._service.deleteProductImage(data).subscribe(res =>{
        console.log(res)
        if(res.code = 200){
          this.blockUI.stop();
          this.toastr.success(res.message)
        }
      })
    }


    addtext(){
      const control = <FormArray>this.editproductForm.controls['varient'];
      this.display = true;
      control.push(this.createCtaegory());
     
      
      }
      deleteRow(index: number){
        const control = <FormArray>this.editproductForm.controls['varient'];
        // remove the chosen row
        control.removeAt(index);
        }
        createCtaegory(){
          return this.formbuilder.group({
          country : '',
          size : '',
          color : ''
          });
          }
  update() {
    this.blockUI.start('Loading...');
    this._service.saveVariants(this.variants, this.id).subscribe(res => {
      console.log(res)
      if (res.code = 200) {
        this.blockUI.stop();
        this.toastr.success(res.message);
      this.router.navigate(["/auth/product/product"])
     
       
      }
      this.blockUI.stop();
    })
  }
  
}
