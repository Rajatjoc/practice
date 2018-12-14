import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProfileserviceService } from '../../services/profileservice.service'
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../common/signup-signin/services/login.service';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  public viewProfileForm: FormGroup;
  firstName: any;
  lastName: any;
  dob: any;
  public apiUrl = environment.API_ENDPOINT;
  email: any;
  image: any
  id: any;
  constructor(private ProfileService: ProfileserviceService,
    private router: Router,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
  private _service : LoginService ) { }

  ngOnInit() {

    this.viewprofile()
  }
  viewprofile() {
    this.blockUI.start('Loading...'); // Start blocking

    this.ProfileService.getProfile().subscribe(res => {
      if (res.code === 200) {
        this.blockUI.stop();
        console.log(">>>>>>>>>", res)

        this.email = res.data.email,
          this.firstName = res.data.firstName,
          this.lastName = res.data.lastName,
          this.dob = res.data.dob,
          this.id = res.data._id
        this.image = res.data.image;
      }

    })
  }

  onImageChange(event) {
    console.log(event.target.files)
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        var formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('id', this.id);
        console.log(formData)

      
{
//   "code":200,
// "message":"data updated successfully",
// "data":{"token":"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZjI2MDVlYzRhNDQ4MDY2N2VmZWU2MSIsImVtYWlsIjoicmFqYXRqb3NoaUB5b3BtYWlsLmNvbSIsImRvYiI6IjE5OTMtMDktMjBUMDA6MDA6MDAuMDAwWiIsImlhdCI6MTU0MzgzODUyMiwiZXhwIjoxNTQzODgxNzIyLCJhdWQiOiJodHRwOi8vZXhhbXBsZS5jb20iLCJpc3MiOiJzYW5qZWV2LWd1cHRhIn0.x63QtrapvUZ-LLc9ClIL0_zY9PyNdioPRQADDHuzeaNbNRP5h3WDBRIzqUzXTlmEfBvgK5GdoIEcg8PrswkHFg",
// "userData":{"firstName":"Rajat","lastName":"Joshi","email":"rajatjoshi@yopmail.com","role_id":{"roleName":"admin","roleId":1,"_id":"5bed0044c4a4480667e7771c"},"image":"profileImage/upload_d00a8684fd4ee789f3b363c4e2add33b-resized.jpg","image_thumbnail":"profileImage/upload_d00a8684fd4ee789f3b363c4e2add33b-thumbnail.jpg"}}}
        this.blockUI.start('Loading...'); // Start blocking
        this.ProfileService.uploadImage(formData).subscribe(res => {
          this.blockUI.stop();
          
          console.log('---->', res)
          if (res.code == 200) {
            this.image = res.data.userData.image       
            this.viewprofile();        
            var temp = JSON.parse(localStorage.getItem('userData'));
            console.log(temp)
            temp.image = res.data.userData.image
            this._service.setSession(temp);
            this.ProfileService.setProfileImage(res.data.userData.image);
            console.log("Profile updated");
            this.toastr.success('Image updated successfully');

          }
          //     else {
          //       // this.msgs = [];
          //       // this.msgs.push({ severity: 'success', summary: 'Success', detail: res.msg });
          //     }
        })
      };
    }
  }


  }
}
