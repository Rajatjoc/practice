import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import{ ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { SignupSigninComponent } from "./signup-signin.component";
import { SignupSigninRoutingMoudle } from "./signup-signinRouting.module";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RegistationService } from "./services/register.service";
import { LoginService } from "./services/login.service";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import { DataExchangeService} from "../dataExchange.service";
import { ProfileserviceService } from "../../super-admin/services/profileservice.service";
@NgModule({
    imports :
    [
        RouterModule,
        SignupSigninRoutingMoudle,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientModule

     ],
    declarations : [SignupSigninComponent,
        LoginComponent,
        RegisterComponent,
        ForgetpasswordComponent,
        ResetPasswordComponent
],
    providers : [RegistationService ,LoginService ,DataExchangeService, ProfileserviceService]
})
export class SignupSigninMoudle {}