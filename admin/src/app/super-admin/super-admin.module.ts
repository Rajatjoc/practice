import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//modules
import { SuperAdminRoutingModule } from './super-adminRouting.module';
import { MainLayoutModule } from '../mainlayout/mainlayout.module';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { CmsComponent } from './cms/cms.component';
//components
import { SuperAdminComponent } from './super-admin.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddcmsComponent } from './cms/addcms/addcms.component';
import { EditcmsComponent } from './cms/editcms/editcms.component';
import { CmsService } from './services/cms.service';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ConfirmDialogModule, DialogModule } from 'primeng/primeng';
import { ViewCmsTemplateComponent } from './cms/view-cms-template/view-cms-template.component'
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component'
import { ProfileserviceService } from './services/profileservice.service';
import { OrdersService } from './services/orders.service'
import { ViewprofileComponent } from './profile/viewprofile/viewprofile.component'
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { CategoryService } from './services/category.service';
import { AddcategoryComponent } from './category/addcategory/addcategory.component'
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { OrdersComponent } from './orders/orders.component'
import { EdituserComponent } from './usermanagement/edituser/edituser.component';
import { ProductComponent } from './product/product.component';
import { AlwaysAuthGuard } from '../common/services/authguard.service';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { ManagecategoryComponent } from './product/managecategory/managecategory.component';
import { ProductcategoryComponent } from './product/managecategory/productcategory/productcategory.component';
import { EditordersComponent } from './orders/editorders/editorders.component'
import { EditprocategoryComponent } from './product/managecategory/editprocategory/editprocategory.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChipsModule} from 'primeng/chips';
// import {TreeTableModule} from "ng-treetable";
import {BrandmanagmentComponent} from './product/brandmanagment/brandmanagment.component'
import {ColormanagementComponent} from './product/colormanagement/colormanagement.component' 
import {SizemanagementComponent} from './product/sizemanagement/sizemanagement.component'
import {ViewVarientProductComponent} from './product/view-varient-product/view-varient-product.component';
import {FileUploadModule} from 'primeng/fileupload';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { EditproductComponent } from './product/editproduct/editproduct.component'
import { AddsizeComponent } from './product/sizemanagement/addsize/addsize.component'
import { ListsizeComponent } from './product/sizemanagement/listsize/listsize.component'
import { EditsizeComponent } from './product/sizemanagement/editsize/editsize.component'
import { PaymentmodeComponent } from './paymentmode/paymentmode.component';
import {PaymentService} from './services/payment.service'
import { TreeNode } from 'primeng/primeng';
import { TreeTableModule } from 'primeng/primeng';
// import { TreeModule } from 'ng2-tree';
const config: InputFileConfig = {}

@NgModule({
    imports:
        [
            RouterModule,
            SuperAdminRoutingModule,
            MainLayoutModule,
            NgxPaginationModule,
            FroalaEditorModule.forRoot(),
            FroalaViewModule.forRoot(),
            CommonModule,
            ReactiveFormsModule,
            DialogModule,
            FormsModule,
            ConfirmDialogModule,
            MultiSelectModule,
            ChipsModule,
            
            TreeTableModule,
            FileUploadModule,
            InputFileModule.forRoot(config)
        
        ],
    providers: [CmsService,
        CategoryService, OrdersService,
        ConfirmationService,
        ProfileserviceService,
        UserService,
        ProductService,

        AlwaysAuthGuard ,
        PaymentService],

    declarations:
        [SuperAdminComponent,
            EditproductComponent,
            CmsComponent,
            DashboardComponent,
            AddcmsComponent,
            EditcmsComponent,
            EditprocategoryComponent,
            CategoryComponent,
            ViewCmsTemplateComponent,
            ProfileEditComponent,
            ViewprofileComponent,
            EditcategoryComponent,
            AddcategoryComponent,
            UsermanagementComponent,
            OrdersComponent,
            SuperAdminComponent,
            ProductcategoryComponent,
            ManagecategoryComponent,
            ProductComponent,
            EdituserComponent,
            AddproductComponent,
            EditordersComponent,
            BrandmanagmentComponent,
            SizemanagementComponent,
            ColormanagementComponent,
            ViewVarientProductComponent,
            AddsizeComponent,
            ListsizeComponent,
            EditsizeComponent,
            PaymentmodeComponent
        ]





})
export class SuperAdminModule { }