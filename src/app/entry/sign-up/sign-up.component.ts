import { Component, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';

import { MainService } from 'src/app/shared/services/main.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnDestroy {
  signUpForm = this.formBuilder.group({
    firstName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(2)]),
    ],
    lastName: [
      '',
      Validators.compose([Validators.required, Validators.minLength(2)]),
    ],
    emailId: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
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

  title = 'Sign Up';
  unsubscribe = new SubSink();

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private service: NotificationsService,
    private mainservice: MainService
  ) {
    this.titleService.setTitle(this.title);
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
  onSubmit() {
    this.unsubscribe.add(
      this.mainservice.postSignUp(this.signUpForm.value).subscribe(
        (data) => {
          if (data.msg === 'User Added') {
            this.service.success('Success', '', {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            this.signUpForm.reset();
          }
        },
        (error) => {
          if (error.error.msg === 'Email id already registered') {
            this.service.error('Aldready Email Exist', '', {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
          }
        }
      )
    );
  }
}
