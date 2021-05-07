import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';

import { MainService } from 'src/app/shared/services/main.service';
// import { selectUsers } from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent {
  token: string | any;
  userId: string | any;
  profileDetails: object | any;
  profileForm: any;
  show = false;
  users$: any;

  constructor(
    private router: Router,
    private notificationService: NotificationsService,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.getUserDetails();
    this.getToken();
  }

  async getToken() {
    // this.users$ = this.store.pipe(select(selectUsers));
    // this.users$.forEach((element: any) => {
    //   this.token = element[0]?.token;
    //   this.userId = element[0]?.userId;
    // });
  }

  getUserDetails() {
    this.mainService.getProfileDetails().subscribe((data) => {
      if (data.msg === 'profile details are fetched') {
        this.profileDetails = data.response;
        this.profileForm = this.formBuilder.group({
          firstName: [
            this.profileDetails.firstName,
            Validators.compose([Validators.required, Validators.minLength(2)]),
          ],
          lastName: [
            this.profileDetails.lastName,
            Validators.compose([Validators.required, Validators.minLength(2)]),
          ],
          emailId: [
            this.profileDetails.emailId,
            Validators.compose([
              Validators.required,
              Validators.pattern(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
            ]),
          ],
          password: [
            null,
            [
              Validators.required,
              Validators.pattern(
                /^(?=\D*\d)(?=.*[$#^()@$!%*?&])(?=[^A-Z]*[A-Z]).{7,30}$/
              ),
            ],
          ],
        });
      }
    });
  }

  editProfile() {
    this.show = true;
  }
  cancelDetails() {
    this.show = false;
  }
  onUpdate() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userid');

    this.mainService
      .updateProfile(userId, this.profileForm.value)
      .subscribe((data) => {
        if (data.msg === 'User Details Updated') {
          this.notificationService.success('Updated Successfully', '', {
            timeOut: 1000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          });
          localStorage.setItem('username', this.profileForm.value.firstName);
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      });
  }
}
