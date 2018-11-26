import { RouterModule ,Routes  } from '@angular/router';
import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes : Routes = [
    {
        path :"" ,component : LoginComponent,

    },
    {
        path :"registration" ,component : RegisterComponent
    },
     {
        path :"forgetpassword" ,component : ForgetpasswordComponent
    },
    {
        path:"resetpassword", component: ResetPasswordComponent
    }
    
    
]

@NgModule({
imports :[RouterModule.forChild(routes)],
exports : [RouterModule]
})
export class SignupSigninRoutingMoudle {}
