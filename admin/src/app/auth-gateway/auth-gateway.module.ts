import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGatewayComponent } from './auth-gateway.component';
import { AuthGatewayRoutingModule } from './auth-gatewayRouting.module';
import { AlwaysAuthGuard } from '../common/services/authguard.service';

//modules


//components


@NgModule({
    imports :
    [
        RouterModule,
        AuthGatewayRoutingModule
           
    ],
  
    declarations :
    [ 
        AuthGatewayComponent
     ],
     providers :[AlwaysAuthGuard]
})
export class AuthGatewayModule{}