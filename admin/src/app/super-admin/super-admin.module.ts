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
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ConfirmDialogModule, DialogModule } from 'primeng/primeng';
import { ViewCmsTemplateComponent } from './cms/view-cms-template/view-cms-template.component'
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component'
import { ProfileserviceService } from './services/profileservice.service';
import { ViewprofileComponent } from './profile/viewprofile/viewprofile.component'
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { CategoryService } from './services/category.service';
import { AddcategoryComponent } from './category/addcategory/addcategory.component'
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { OrdersComponent } from './orders/orders.component'
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


        ],
    providers: [CmsService, ConfirmationService, ProfileserviceService, CategoryService],

    declarations:
        [SuperAdminComponent,

            CmsComponent,
            DashboardComponent,
            AddcmsComponent,
            EditcmsComponent,
            CategoryComponent,
            ViewCmsTemplateComponent,
            ProfileEditComponent,
            ViewprofileComponent,
            EditcategoryComponent,
            AddcategoryComponent,
            UsermanagementComponent,
            OrdersComponent
        ]
})
export class SuperAdminModule { }