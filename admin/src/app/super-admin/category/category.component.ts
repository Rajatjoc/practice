import { Component, OnInit , Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Tree, TreeNode } from 'primeng/primeng';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Input() ttRow: any;
  pages: any;
  showSpaceErr: boolean = false
  public searchText = ''
  public p: any = 1;
  public totalItems: any = '';
  displayDialog: boolean = false;
  allCategory: any;
  files1: TreeNode[];
  categoryForm : FormGroup;
  subcategoryForm : FormGroup;
  editsubcategoryForm : FormGroup;
  items: FormArray;
  temp = []
  displayd = false;
  display = false;
  displaye = false;
  cols: any[];
  isSubmited: boolean = false;
  id :any;
  constructor(private formbuilder: FormBuilder, private _service: CategoryService,
    private confirmationService: ConfirmationService, private toastr: ToastrService) { }

  ngOnInit() {

    this.categoryForm = this.formbuilder.group({
      categoryname: ['', [Validators.required, Validators.minLength(3)]],
      id:[]
    })
    this.subcategoryForm = this.formbuilder.group({
      subcategoryname: ['',[Validators.required, Validators.minLength(3)]]
     
    })
    this.editsubcategoryForm = this.formbuilder.group({
      editsubcategoryname: ['', [Validators.required, Validators.minLength(3)]],
      id:[]
    })
     interface TreeNode {
      data?: any;
      children?: TreeNode[];
      leaf?: boolean;
      expanded?: boolean;
  }
 
     this.getCategory();
    // console.log(this.files2,"************");
   
    
  
  }
  addCategory(){
    if (this.categoryForm.invalid) {
      this.isSubmited = true;
      
      return;
    }

    console.log(this.categoryForm.value)
    this._service.addCategory(this.categoryForm.value).subscribe(res =>{
      console.log(res)
      if(res.code == 200){
        this.getCategory();
        this.displayd = false;
        this.toastr.success(res.message)
        this.categoryForm.reset()
      }else{
        this.categoryForm.reset()
        this.toastr.warning(res.message)
      }
    })
  }
  show(){
    // this._service.addCategory()
    console.log('here')

    this.displayd = true;
    this.categoryForm.reset()
  
  }
  showSubcategory(id){
 
    console.log(id)
    this.subcategoryForm.reset()
    this.id = id;
    this.display = true;
  
  }
  showeditSubcategory(id , cat_id){
    console.log(id)
    // this.id = cat_id;
    
    this.blockUI.start('Loading...'); // Start blocking
    this._service.getSpecificCategory(id).subscribe(res=>{
      this.blockUI.stop();
      
      if(res.code = 200){
        this.displaye = true;
        this.editsubcategoryForm.patchValue({editsubcategoryname : res.data.category_name  , id : res.data._id})
       
      }
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
        this.display = false;
        this.toastr.success(res.message)
        this.categoryForm.reset()
        this.getCategory()
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
      // this.blockUI.stop();
      
      if(res.code == 200){
        this.getCategory();
        this.toastr.success(res.message)
        this.displaye = false;
        this.editsubcategoryForm.reset()
      
      }else{
        this.toastr.warning(res.message)
      }
    })
  }

  deleteSubcategory(id, cat_id){
    console.log(id, cat_id)
    this.confirmationService.confirm({
      
            message: 'Are you sure that you want to perform this action?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
              this.blockUI.start('Loading...'); // Start blocking
              this._service.deleteCategory(id , cat_id).subscribe(res => {
                this.blockUI.stop();
                
                if (res.code == 200) {
                  // this.pages = res.data;
                  // this.files1 = [];
                  // this.files1 = [...this.files1];
                  this.toastr.success(res.message)
                  this.getCategory();
                }
              })
            }, reject: () => {
      
            }
          });
    
  } 
   public searchtext() {
    
    console.log(this.searchText)
    let spaceregex = /^[^\s]+(\s+[^\s]+)*$/;
    console.log(">>>>>>>>>>>>>", spaceregex.test(this.searchText))
    if (spaceregex.test(this.searchText) || (!this.searchText)) {
    this.showSpaceErr = false;
    this.blockUI.start('Loading...'); // Start blocking
      this._service.getAllCategorycount(this.searchText).subscribe(res => {
        this.blockUI.stop();
        console.log(res);
        if (res.code == 200) {
        
          this.files1 = res.data
      this.allCategory = res.data;
       this.totalItems = res.data.Count;
      if (res.code == 200) {
        this.temp = [];
           let newItem =
           {
             data:{name:'',parent:'',id:'',cat_id :''},
             children:[]
           }
         res.data.forEach( element => {
           newItem.data.name = element.category_name;
            newItem.data.parent = element.parent;
            newItem.data.id = element._id;
            if(element.sub_category.length > 0){
            element.sub_category.forEach(sub => {
             let name = {
               data : {'name':sub.category_name,
                       'parent':sub.parent,
                       'id' : sub._id,
                       'cat_id': element._id
                     }
             };
             newItem.children.push(name)
           });
         }
           this.temp.push(newItem)
         
           newItem =
           {
             data:{name:'',parent:'',id:'',cat_id :''},
             children:[]
           }
         });  
         this.files1 =  this.temp;
         // this.allCategory = res.data;
         this.blockUI.stop();
         }
         
        }
      })
    }
    else{
      this.showSpaceErr = true;
    }
  }
  pageChanged($event) {
    this.p = $event;
  }
  getCategory() {
    this.blockUI.start('Loading...'); // Start blocking
    this.temp = [];
    this._service.getAllCategorycount(this.searchText).subscribe(res => {
      this.blockUI.stop();
      if (res.code == 200) {
     
        let newItem =
        {
          data:{name:'',parent:'',id:'',cat_id :''},
          children:[]
        }
      res.data.forEach( element => {
        newItem.data.name = element.category_name;
         newItem.data.parent = element.parent;
         newItem.data.id = element._id;
         if(element.sub_category.length > 0){
         element.sub_category.forEach(sub => {
          let name = {
            data : {'name':sub.category_name,
                    'parent':sub.parent,
                    'id' : sub._id,
                    'cat_id': element._id
                  }
          };
          newItem.children.push(name)
        });
      }
        this.temp.push(newItem)
      
        newItem =
        {
          data:{name:'',parent:'',id:'',cat_id :''},
          children:[]
        }
      });  
      this.files1 =  this.temp;
      // this.allCategory = res.data;
      this.blockUI.stop();
      }
    })
  }
  openDialog() {
    this.displayDialog = true;
  }

  // delete(id) {

  //   this.confirmationService.confirm({

  //     message: 'Are you sure that you want to perform this action?',
  //     header: 'Confirmation',
  //     icon: 'fa fa-question-circle',
  //     accept: () => {
  //       this._service.deleteCategory(id).subscribe(res => {
  //         if (res.code == 200) {
  //           this.pages = res.data;
  //           this.getCategory();
  //         }
  //       })
  //     }, reject: () => {

  //     }
  //   });
  // }

}
