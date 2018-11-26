import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ProfileserviceService } from '../../services/profileservice.service'
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService) { }

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

        //   this.loading = true;
        // this.blockUI.start('Loading...'); // Start blocking
        this.ProfileService.uploadImage(formData).subscribe(res => {
          // this.blockUI.stop();
          console.log('---->', res)
          if (res.status == 200) {
            this.image = res.data.image
            console.log('---->', this.image)
            //       this.profileImage = `${environment.API_ENDPOINT}${res.data.image}`;
            var temp = JSON.parse(localStorage.getItem('userName'));
            temp.image = res.data.image
            // temp.image_thumbnail =  res.data.imageThumbnail

            // console.log(temp.image_thumbnail)
            //        this._service.setSession(temp);

            this.ProfileService.setProfileImage(res.data.image);
            console.log("Profile updated");
            this.toastr.success('image update successfully');

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
