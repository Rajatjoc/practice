import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageResetPasswordComponent } from './common/message-reset-password/message-reset-password.component';

export const routes: Routes = [

 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path : "login" ,loadChildren : "./common/signup-signin/signup-signin.module#SignupSigninMoudle"},
  {
    
    path : "auth" ,loadChildren : "./auth-gateway/auth-gateway.module#AuthGatewayModule",
    data: {
      title: ''
    },
  },
  {
    path : "message_resetpassword", component : MessageResetPasswordComponent
  },
 
     
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
