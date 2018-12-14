import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Tree, TreeNode } from 'primeng/primeng';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-managecategory',
  templateUrl: './managecategory.component.html',
  styleUrls: ['./managecategory.component.scss']
})
export class ManagecategoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  categoryForm : FormGroup;
  subcategoryForm : FormGroup;
  editsubcategoryForm : FormGroup;
  // Category : any;
  public p: any = 1;
  public totalItems:any=""
  public showSpaceErr: boolean = false;
  public searchText = "";
  display = false;
  isSubmited : boolean = false;
  nodeItems:any
  Category: any;
  files1: TreeNode[];
  temp = [];
  id = '';
  displaysubCategory = false;
  displayedit = false;
  constructor(
    private _service : ProductService, 
    private confirmationService: ConfirmationService ,
    private toastr:ToastrService,
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {


   this.getAllCategory();
   this.categoryForm = this.formbuilder.group({
    categoryName: ['', [Validators.required,Validators.minLength(3)]]
   
  })
  this.subcategoryForm = this.formbuilder.group({
    subcategoryname: ['', [Validators.required,Validators.minLength(3)]]
  
  })
  this.editsubcategoryForm = this.formbuilder.group({
    editsubcategoryname: ['', [Validators.required,Validators.minLength(3)]],
    
    id:[]
  })

  interface TreeNode {
    data?: any;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
}
  }
  public searchtext(){
    let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
    if(spaceregex.test(this.searchText) ||(!this.searchText) )
    {
    this.showSpaceErr = false
    console.log(this.searchText,"Caffffffffffffffftegory")
    this.blockUI.start('Loading...' )
    this._service.getallCategory(this.searchText).subscribe(res=>{
      console.log(res,"Category")
        this.blockUI.stop();
        this.Category = res.data
        this.totalItems = res.data.Count
  
        if(res.code == 200){
          this.temp = [];
          let newItem =
          {
            data:{name:'',parent:'',id:'',cat_id:'',child:''},
            children:[]
          }
          res.data.forEach( element => {
            console.log('here')
            newItem.data.name = element.title;
             newItem.data.parent = element.parent;
             newItem.data.id = element._id;
  
             if(element.sub_category.length > 0){
              console.log(element.sub_category.length )
             element.sub_category.forEach(sub => {
              
              var name = {
                data : {'name':sub.title,
                        'parent':sub.parent,
                        'id' : sub._id,
                        'cat_id': element._id,
                        'child' : false
                      },
                children:[]
              };
             console.log(sub)
              if(sub.sub_category.length > 0){
                sub.sub_category.forEach(resp =>{
                  console.log(resp)
                  let child = {
                    data : {'name':resp.title,
                            'parent':resp.parent,
                            'id' : resp._id,
                            'cat_id': sub._id,
                            'child' : true
                          }                
                  };
                  name.children.push(child)
                })
               
              }
              newItem.children.push(name)
            });
          }
            this.temp.push(newItem)
            console.log(this.temp,'111')
            newItem =
            {
              data:{name:'',parent:'',id:'',cat_id:'',child:''},
              children:[]
            }
          });  
          this.files1 =  this.temp;
        }

    })
    }
    else
    {
      this.showSpaceErr = true
    }
    }
  getAllCategory(){
    this.blockUI.start('Loading...'); // Start blocking
    this.temp = [];
    this._service.getallCategory(this.searchText).subscribe(res =>{
      this.blockUI.stop();
      console.log(res)
      this.Category = res.data
      this.totalItems = res.data.Count

      if(res.code == 200){

        let newItem =
        {
          data:{name:'',parent:'',id:'',cat_id:'',child:''},
          children:[]
        }
        res.data.forEach( element => {
          console.log('here')
          newItem.data.name = element.title;
           newItem.data.parent = element.parent;
           newItem.data.id = element._id;

           if(element.sub_category.length > 0){
            console.log(element.sub_category.length )
           element.sub_category.forEach(sub => {
            
            var name = {
              data : {'name':sub.title,
                      'parent':sub.parent,
                      'id' : sub._id,
                      'cat_id': element._id,
                      'child' : false
                    },
              children:[]
            };
           console.log(sub)
            if(sub.sub_category.length > 0){
              sub.sub_category.forEach(resp =>{
                console.log(resp)
                let child = {
                  data : {'name':resp.title,
                          'parent':resp.parent,
                          'id' : resp._id,
                          'cat_id': sub._id,
                          'child' : true
                        }                
                };
                name.children.push(child)
              })
             
            }
            newItem.children.push(name)
          });
        }
          this.temp.push(newItem)
          console.log(this.temp,'111')
          newItem =
          {
            data:{name:'',parent:'',id:'',cat_id:'',child:''},
            children:[]
          }
        });  
        this.files1 =  this.temp;
      }
    })
  }
  pageChanged($event) {
    this.p = $event;
  }
  
  deleteSubcategory(id , cat_id){
    this.confirmationService.confirm({
      
            message: 'Are you sure that you want to perform this action?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
              this.blockUI.start('Loading...'); // Start blocking
              this._service.deleteCategory(id , cat_id).subscribe(res=>{
                this.blockUI.stop();
             
              if(res.code === 200){
              
                this.getAllCategory();
                this.toastr.success(res.message)
              }
            
            })
          },reject: () => {
           
        }
      })
      
  }

  show(){
    // this._service.addCategory()
    console.log('here')
    this.display = true;
    this.categoryForm.reset()
  }
  addCategory(){
    console.log('here111111111111')
    if (this.categoryForm.invalid) {
      this.isSubmited = true;
      
      return;
    }
    console.log(this.categoryForm.value)
    this.blockUI.start('Loading...'); // Start blocking
    this._service.addCategory(this.categoryForm.value).subscribe(res=>{
      console.log(res)
     
      if(res.code == 200){
        this.blockUI.stop();
        this.getAllCategory();
        this.toastr.success(res.message)
        this.display = false;
        this.categoryForm.reset()
      }else{
        this.toastr.warning(res.message)
        this.categoryForm.reset()
      }
      this.blockUI.stop();
    })
  }
  addsubCategory(){
    if (this.subcategoryForm.invalid) {
      this.isSubmited = true;
      
      return;
    }
    console.log(this.subcategoryForm.value)
    this.blockUI.start('Loading...'); // Start blocking
    this._service.addsubcategory(this.id , this.subcategoryForm.value).subscribe(res=>{
      this.blockUI.stop();
      
      console.log(res)
      if(res.code == 200){
        this.getAllCategory();
        this.displaysubCategory = false;
        this.toastr.success(res.message)
        this.categoryForm.reset()
      }else{
        this.toastr.warning(res.message)
      }
    })
  }

  showSubcategory(id){
    this.subcategoryForm.reset()
       console.log(id)
       this.id = id;
     
       this.displaysubCategory = true;
     }


     showeditSubcategory(id , cat_id){
      console.log(id)
      // this.id = cat_id;
      this.blockUI.start('Loading...'); // Start blocking
      this._service.getSpecificCategory(id).subscribe(res=>{
        this.blockUI.stop();
        
        if(res.code = 200){
          this.displayedit = true;
          this.editsubcategoryForm.patchValue({editsubcategoryname : res.data.title  , id : res.data._id})
        
        }else{
          this.toastr.warning(res.message)
        }
      })
     
    }

    editsubCategory(){
      if (this.editsubcategoryForm.invalid) {
        this.isSubmited = true;
        
        return;
      }
      console.log(this.id,this.editsubcategoryForm.value);
      this.blockUI.start('Loading...'); // Start blocking
      this._service.editsubcategory(this.editsubcategoryForm.value).subscribe(res=>{
        this.blockUI.stop();
        
        if(res.code == 200){
          this.getAllCategory();
          this.toastr.success(res.message)
          this.displayedit = false;
          this.editsubcategoryForm.reset()
        }else{
          this.toastr.warning(res.message)
          this.editsubcategoryForm.reset()
        }
      })
    }

}

