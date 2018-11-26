import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  pages: any;
  showSpaceErr: boolean = false
  public searchText = ''
  public p: any = 1;
  public totalItems: any = '';
  displayDialog: boolean = false;
  allCategory: any;

  items: FormArray;
  isSubmited: boolean = false;
  constructor(private formbuilder: FormBuilder, private _service: CategoryService,
    private confirmationService: ConfirmationService, private toastr: ToastrService) { }

  ngOnInit() {

    this.getCategory();
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

          this.allCategory = res.data;

          this.totalItems = res.data.Count;
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


    this._service.getAllCategorycount(this.searchText).subscribe(res => {
      this.blockUI.stop();
      
      if (res.code = 200) {

        console.log(res);
        this.totalItems = res.data.Count;
        this.allCategory = res.data;
        

      }
     
    })
  }
  openDialog() {
    this.displayDialog = true;
  }

  delete(id) {

    this.confirmationService.confirm({

      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._service.deleteCategory(id).subscribe(res => {
          if (res.code == 200) {
            this.pages = res.data;
            this.getCategory();
          }
        })
      }, reject: () => {

      }
    });
  }

}
