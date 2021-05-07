/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { MainService } from 'src/app/shared/services/main.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-editprofile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditprofileComponent implements OnDestroy {
  profileDetails: object | any;
  profileForm: any;
  unsubscribe = new SubSink();

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService,
    private router: Router
  ) {
    this.getUserDetails();
  }

  getUserDetails() {
    this.unsubscribe.add(
      this.mainService.getProfileDetails().subscribe((data) => {
        if (data.msg === 'profile details are fetched') {
          this.profileDetails = data.response;
        }
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
                // eslint-disable-next-line max-len
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
            ]),
          ],
          password: [
            '',
            [
              Validators.required,
              Validators.pattern(
                /^(?=\D*\d)(?=.*[$#^()@$!%*?&])(?=[^A-Z]*[A-Z]).{7,30}$/
              ),
            ],
          ],
        });
      })
    );
  }

  onUpdate() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userid');
    this.unsubscribe.add(
      this.mainService
        .updateProfile( userId, this.profileForm.value)
        .subscribe((data) => {
          if (data.msg === 'User Details Updated') {
            this.notificationService.success('Updated Successfully', '', {
              timeOut: 1000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            setTimeout(() => {
              this.router.navigate(['/profile-details']);
            }, 1000);
          }
        })
    );
  }
  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }
}
