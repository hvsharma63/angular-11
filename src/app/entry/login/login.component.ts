import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { SubSink } from 'subsink';
import { Store } from '@ngrx/store';

import { MainService } from 'src/app/shared/services/main.service';
import { IUser } from 'src/app/shared/interfaces/user';
// import { addUser } from 'src/app/state/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.formBuilder.group({
    email: [
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

  title = 'Login';
  token: any;
  unsubscribe = new SubSink();

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mainservice: MainService,
    private service: NotificationsService,
    private store: Store
  ) {
    this.titleService.setTitle(this.title);
    localStorage.clear();
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

  ngOnInit(): void { }

  onSubmit() {
    this.unsubscribe.add(
      this.mainservice.postLogin(this.loginForm.value).subscribe(
        (data) => {
          this.service.success('Login Successfully', '', {
            timeOut: 1000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          });
          this.token = data.msg;
          localStorage.setItem('token', this.token);
          this.mainservice.getUserDetails(this.loginForm.value.email, data.msg).subscribe(
            datas => {
              console.log(datas);
              localStorage.setItem('userid', JSON.stringify(datas.response.id));
              setTimeout(() => {
                void this.router.navigateByUrl('/home');
              }, 1000);
            },
            (error) => console.log(error)
          );

        },
        (error) => {
          if (error) {
            this.service.error('Your Entered Email/Password is incorrect', '', {
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
