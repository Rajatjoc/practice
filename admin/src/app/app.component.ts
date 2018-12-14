import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ProfileserviceService } from './super-admin/services/profileservice.service'

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: ` <block-ui>
       <router-outlet></router-outlet>
  </block-ui>`
})
export class AppComponent implements OnInit {
  public userName : any;
  constructor(private router: Router,
              private ProfileserviceService : ProfileserviceService) { }

  ngOnInit() {

    if (localStorage.getItem("token")) { 
      this.ProfileserviceService.getProfile().subscribe(res => {
        if(res['code'] == 200)
        {     
        // this.userName = res.data.firstName;
        // localStorage.setItem("userName", this.userName);
        }
        else if(!res.status && res.code == 401 )
        {
         
          localStorage.removeItem("token");
          this.router.navigate(["login"]);
        }
       

      });
      // this.router.navigate(["auth"]);
    }




    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
