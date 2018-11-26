import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppBreadcrumbModule} from '@coreui/angular';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MyInterceptor } from './common/interceptor/interceptor.service';
import { MessageResetPasswordComponent } from './common/message-reset-password/message-reset-password.component';
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppBreadcrumbModule.forRoot(),
    RouterModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    NgxPaginationModule 
  ],
  declarations: [AppComponent, MessageResetPasswordComponent ],
  providers: [{
   
    provide: LocationStrategy,
    useClass: HashLocationStrategy,
  },
  { //for interceptors it is must
    provide: HTTP_INTERCEPTORS,
    useClass: MyInterceptor,
    multi: true
  }],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
