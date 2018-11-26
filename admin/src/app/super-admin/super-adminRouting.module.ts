import { RouterModule ,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingComponent } from '../mainlayout/landing/landing.component';
import { CmsComponent } from './cms/cms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddcmsComponent } from './cms/addcms/addcms.component';
import { EditcmsComponent } from './cms/editcms/editcms.component';
import { CategoryComponent } from './category/category.component';
import { ViewCmsTemplateComponent } from './cms/view-cms-template/view-cms-template.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ViewprofileComponent } from './profile/viewprofile/viewprofile.component';
import { EditcategoryComponent } from './category/editcategory/editcategory.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { OrdersComponent } from './orders/orders.component';
export const routes: Routes = [
    {
        path : "" ,component : LandingComponent,
        data: {
            title: ''
          },
        children :
        [   {path  : "",redirectTo :"dashboard"  } ,
            {path : "Cms" ,component : CmsComponent, data: {
                title: 'Cms'
              },},  {path : "addCms" ,component : AddcmsComponent, data: {
                title: 'addCms'
              },
            },
            {path : "editCms/:pageSlug" ,component : EditcmsComponent, data: {
                title: 'Edit Cms'
              },
            },
            {
                path : "dashboard" ,component : DashboardComponent, data: {
                    title: 'Dashboard'
                  },
            }
            ,
            {
                path : "category" ,component : CategoryComponent, data: {
                    title: 'Category'
                  },
            },
            {
                path:"viewcmstemplate/:pageSlug", component:ViewCmsTemplateComponent, data:{
                    title:"View"
                }
            },
            {
                path:"ProfileEdit", component:ProfileEditComponent,data:{
                    title:"Update Profile"
                }
            },
            {
                path:"viewprofile", component:ViewprofileComponent,data:{
                    title:"View Profile"
                }
            },
            {path : "editCategory/:pageSlug" ,component :EditcategoryComponent , data: {
                title: 'Edit Category'
              },
              
            } ,  
            {path : "addCategory" ,component : AddcategoryComponent , data: {
                title: 'Add Category'
              }
            },
            {path : "manageuser" ,component :UsermanagementComponent , data: {
                title: 'User List'
              },
            },
            { 
                path:"orders",component:OrdersComponent,data:
                {
                   title:'Orders'
                }
            }            
        ]
    }
]
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SuperAdminRoutingModule{}