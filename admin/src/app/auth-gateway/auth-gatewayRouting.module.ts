import { RouterModule ,Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AlwaysAuthGuard } from '../common/services/authguard.service';

export const routes: Routes = [
    { 
        canActivate : [AlwaysAuthGuard],
        path : "" ,loadChildren : "../super-admin/super-admin.module#SuperAdminModule",
    }
]
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthGatewayRoutingModule{}