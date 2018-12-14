import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-view-varient-product',
  templateUrl: './view-varient-product.component.html',
  styleUrls: ['./view-varient-product.component.scss']
})
export class ViewVarientProductComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  variants : any;
  public apiUrl = environment.API_ENDPOINT;
  public product : any ={};
  public myModel : any ={};
  ImageForm : any;
  id : any ;
  uploadedFiles: any[] = [];
  images : any = [];
  imageSrc: string;  
  display : boolean = false;
  constructor(private route : ActivatedRoute,private toastr : ToastrService,private router : Router, private productService : ProductService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    let pageSlug =  this.route.snapshot.params.id;
    console.log(pageSlug);
    this.getProductVarient(pageSlug);

    this.ImageForm = this.formBuilder.group({
      myField: ['', [Validators.required]]
    });
  
  }
  getProductVarient(id){
  this.productService.getProductVarient(id).subscribe(res=>{
    console.log(res)
    if(res.code == 200){
      this.id = res.data._id;
      this.variants = res.data.variants;
    }
  })
  }
 
  add(){
   
    console.log( this.variants)
   
    this.productService.saveVariants(this.variants , this.id).subscribe(res=>{
      console.log(res)
      if(res.code = 200){
        this.display = true;
      }
    })
  }
 
  selectedFile: any = [];
  urls = new Array<string>();
  addImageLeft1(event,update){
    let reader = new FileReader();
    let files = event.target.files;
   
    if (files) {
      console.log(files[0])
      // files.forEach((file,index)=>{
        Array.from(files).forEach((file,index) => { 
          let reader = new FileReader();
          reader.onload = (e: any) => {
            console.log(e,'------',event.target.files[index],'------',index)
            this.selectedFile.push(event.target.files[index]);          
            this.images.push(e.target.result);
          }
          reader.readAsDataURL(files[index]);
          });
    }    
  }



  removeimage(url,index){
    this.images.splice(index , 1)
    this.selectedFile.splice(index,1);
  }

done(event){
  // this.blockUI.start('Loading...');
  let self = this;

  console.log(this.selectedFile,"--------")
  // event.target.files = this.selectedFile
  const [file] = this.selectedFile;
  // this.selectedFile.forEach((element,index)=>{
  //   if(element.name.compare(this.images[index]))  
  // })

  let reader = new FileReader();
  // console.log(this.selectedFile)
  reader.readAsDataURL(file); 
  reader.onload = () => {
    const formData = new FormData();
    formData.append('id', this.id);
    // console.log(this.selectedFile)
    for(var i = 0 ; i < this.selectedFile.length; i++)
    {
      console.log(reader.result,"reader.result")
      this.imageSrc = reader.result;                   
      
       formData.append("image", this.selectedFile[i]);
    }
  this.productService.uploadImage(formData).subscribe(res => {
      if (res.status == 200) {
        // if(res.data instanceof Array){
        //   res.data.forEach(function(element){
        //     console.log(element.images)
        //     // self.images.push(element.images.substr(7));                    
        //   })
        // }else{
        //   console.log('Inside else')
          
        //   // self.images.push(res.data.images.substr(7));                    
        // }
        this.blockUI.stop();
        this.toastr.success('Image Added Successfully.')
        this.router.navigate(['/auth/product/product']);
      }
      this.blockUI.stop();
    })
  }
//       if (event.target.files && event.target.files.length) {
//         const [file] = event.target.files;
//         reader.readAsDataURL(file); 
        
//         reader.onload = () => {
//           var formData = new FormData();
//           formData.append('id', this.id);
//           for(var i = 0 ; i < event.target.files.length ; i++)
//           {
//             console.log(reader.result,"reader.result")
//             this.imageSrc = reader.result;
//             // console.log(this.imageSrc,"event.target.files[i]")
//             this.images.push(this.imageSrc);
//              formData.append("image", event.target.files[i]);
//           }
//           // formData.append('image', event.target.files[0]);
         
          
//           console.log(formData)
//           this.productService.uploadImage(formData).subscribe(res => {
//             // this.blockUI.stop();
//             console.log('---->', res)
//             if (res.status == 200) {    
//               console.log(" updated",res);
//               // this.images = res.data;
//               this.toastr.success('product add successfully')
//               // this.router.navigate(['/auth/product/product'])
//             }
           
//           })
        
//         };
// }
}






}