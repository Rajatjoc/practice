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
import { EdituserComponent } from './usermanagement/edituser/edituser.component';
import { ProductComponent } from './product/product.component';
import { AlwaysAuthGuard } from '../common/services/authguard.service';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { ManagecategoryComponent } from './product/managecategory/managecategory.component';
import { ProductcategoryComponent } from './product/managecategory/productcategory/productcategory.component';
import { EditordersComponent } from './orders/editorders/editorders.component'
import { EditprocategoryComponent } from './product/managecategory/editprocategory/editprocategory.component';
import { BrandmanagmentComponent } from './product/brandmanagment/brandmanagment.component';
import { ColormanagementComponent } from './product/colormanagement/colormanagement.component';
import { SizemanagementComponent } from './product/sizemanagement/sizemanagement.component';
import { ViewVarientProductComponent } from './product/view-varient-product/view-varient-product.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { AddsizeComponent } from './product/sizemanagement/addsize/addsize.component';
import { ListsizeComponent } from './product/sizemanagement/listsize/listsize.component';
import { EditsizeComponent } from './product/sizemanagement/editsize/editsize.component';
import { PaymentmodeComponent } from './paymentmode/paymentmode.component';

export const routes: Routes = [
    {
        path : "" ,component : LandingComponent,canActivate:[AlwaysAuthGuard],
        data: {
            title: ''
          },
        children :
        [   {path  : "",redirectTo :"dashboard" ,pathMatch : "full" } ,
            {path : "Cms" ,component : CmsComponent, data: {
                title: 'CMS'
              },},  {path : "addCms" ,component : AddcmsComponent, data: {
                title: 'Add CMS'
              },
            },
            {path : "editCms/:pageSlug" ,component : EditcmsComponent, data: {
                title: 'Edit CMS'
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
                    title:"CMS View"
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
                       
            }, 
            { 
                path:"orders/editorders/:pageSlug",component:EditordersComponent,data:
                {
                   title:'Edit Orders'
                }
                       
            }, 
             {path : "edituser/:pageSlug" ,component :EdituserComponent , data: {
                title: 'Edit User'
              },
            }  , 
            {path : "product/product" ,component :ProductComponent , data: {
                title: 'Product'
              },
            }  ,
            {path : "product/addproduct" ,component :AddproductComponent , data: {
                title: 'Add Product'
              },
            },
            {path : "product/manageproduct" ,component :ManagecategoryComponent , data: {
                title: 'Manage Categories'
              },
            } ,
            {path : "product/productcateory" ,component : ProductcategoryComponent , data: {
                title: 'Add Categories'
              },
            },
            {path : "product/varient/:id" ,component : ViewVarientProductComponent , data: {
                title: 'View Varient '
              },
            },
            {path : "product/editcategory/:pageSlug" ,component : EditprocategoryComponent , data: {
                title: 'Edit Categories'
              },
            }   ,
            {
                path: "product/brandmanagement" , component: BrandmanagmentComponent , data:{
                    title:"Brand Management"
                }
            } ,
            {
                path: "product/colormanagement" , component: ColormanagementComponent , data:{
                    title:"Color Management"
                }
            }       ,
            {
                path: "product/sizemanagement" , component: SizemanagementComponent , data:{
                    title:"Size Management"
                }
            }    ,
            {path : "product/editproduct/:pageSlug" ,component : EditproductComponent , data: {
                title: 'Edit Categories'
              },
            }     ,
            {path : "product/addsize" ,component : AddsizeComponent , data: {
                title: 'Add Size'
              },
            },   
            {path : "product/listsize" ,component : ListsizeComponent , data: {
                title: ' Size List'
              },
            }  ,
            {path : "product/editsize/:pageSlug" ,component : EditsizeComponent , data: {
                title: 'Edit Size '
              },
            },  
            {path : "paymentmode" ,component : PaymentmodeComponent , data: {
                title: 'Payment Modes '
              },
            }              
        ]
    }
]
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SuperAdminRoutingModule{}