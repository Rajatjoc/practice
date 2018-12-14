import { Component, OnInit } from '@angular/core';
import { navItems } from '../list/_nav';
import {  Router } from "@angular/router";
import { LoginService } from '../../common/signup-signin/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { DataExchangeService} from "../../common/dataExchange.service";
// import { DataExchangeService} from "../common/dataExchange.service";
import { environment } from '.././../../environments/environment';
import { ProfileserviceService } from '../../super-admin/services/profileservice.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public apiUrl = environment.API_ENDPOINT;
  public userData : any;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  public headerName :any;
  public image : any;
  constructor(
    private router: Router,
    private _service : LoginService,
    private toastr : ToastrService,
    private DataExchangeService : DataExchangeService ,
    private userService : ProfileserviceService,

)
 {
  this.readsession();
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.userService.getProfileImage().subscribe(res => {
      console.log(res , 'hello')
      if(res){
          this.image = res.profileImage;
      }
  })
  this.userService.getProfileName().subscribe(res => {
    console.log(res , 'hello')
    if(res){
         this.headerName = res.name;
        
    }
})
  }

  ngOnInit(): void {
   
       
          
      }
  logout()
  {
    this._service.logout().subscribe(res=>{
      if(res.code == 200){
        localStorage.clear();
        this.toastr.success("Logout Successfully")
        this.router.navigate(["login"]);
      }
      else{
        localStorage.clear();
        this.toastr.success(res.message)
        this.router.navigate(["login"]);
      }
    })
  }
  readsession(){
    let user = this._service.readSession();
    this.headerName = user.firstName +' '+ user.lastName;
    this.image =user.image;
}
}
