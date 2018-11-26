import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DataExchangeService} from "../common/dataExchange.service";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
  } from '@coreui/angular';
  



  import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
  import { TabsModule } from 'ngx-bootstrap/tabs';
  import { ChartsModule } from 'ng2-charts/ng2-charts';

import { LandingComponent } from './landing/landing.component';
import { CmsService } from '../super-admin/services/cms.service';
import { LoginService } from '../common/signup-signin/services/login.service';
@NgModule({
    imports :
    [
    
        AppAsideModule,
        RouterModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule
        
    ],
    providers : [CmsService,LoginService ,DataExchangeService],
  
    
    declarations : [LandingComponent ],
    exports : [LandingComponent]
})
export class MainLayoutModule{}