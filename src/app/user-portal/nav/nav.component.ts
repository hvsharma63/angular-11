/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';

import { MainService } from 'src/app/shared/services/main.service';
import { selectUsers } from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  userName!: string;
  users$: any;
  show_nav_mobile = true;
  show_nav_desk = true;
  userId!: string | null;
  token!: string | null;

  constructor(
    private mainService: MainService,
    private router: Router,
    private notificationService: NotificationsService, private store: Store
  ) {
    this.users$ = this.store.pipe(select(selectUsers));
    this.users$.forEach((element: any) => {
      this.userName = element[0]?.username;
      this.userId = element[0]?.userid;
      this.token = element[0]?.token;
    });
  }

  toggle() {
    this.show_nav_mobile = !this.show_nav_mobile;
  }

  logout() {
    this.mainService.logout().subscribe(
      (data) => { },
      (error) => {
        if (error.error.error === false) {
          localStorage.clear();
          setTimeout(() => {
            this.router.navigate(['./login']);
          }, 1000);
          this.notificationService.success('Logout Successfully', '', {
            timeOut: 1000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          });
        }
      }
    );
  }

  navigateToProfile() {
    this.router.navigate(['/profile-details']);
  }
}
