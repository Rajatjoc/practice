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
  constructor(
    private router: Router,
    private _service : LoginService,
    private toastr : ToastrService,
    private DataExchangeService : DataExchangeService ,
    private userService : ProfileserviceService
)
 {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    this.userService.getProfileImage().subscribe(res => {

      this.userData =  JSON.parse(localStorage.getItem('userName'));
      this.userData.image = res.profileImage

      // this.userData.image_thumbnail =  res.data.imageThumbnail
    })
  }

  ngOnInit(): void {
     
      localStorage.getItem("userName");
      this.userData = JSON.parse(localStorage.getItem('userName'));

      // localStorage.removeItem("userName");
      //  let abc = this.DataExchangeService.getData()
      //   abc.subscribe(res=>{
      //     console.log(res,"Snajeeeasndkansdkn")
      //   })
       //  .subscribe(res=>{
      //    console.log("yuess")
      //  })
      // console.log(this.userName,"-----")
       //  .subscribe(res =>
      // {
      //   console.log("inside landing>>>>>>>>>>>>>>>>>>>?????????????/", res);
        
      // })    
          
      }
  logout()
  {
    this._service.logout().subscribe(res=>{
      if(res.code == 200){
        localStorage.removeItem("token");
        this.toastr.success(res.message)
        this.router.navigate(["login"]);
      }
      else{
        localStorage.removeItem("token");
        this.toastr.success(res.message)
        this.router.navigate(["login"]);
      }
    })
  }
 
}
