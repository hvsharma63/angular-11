/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addUser } from 'src/app/state/actions/user.actions';
import { IUser } from '../interfaces/user';
import { MainService } from './main.service';


@Injectable({ providedIn: 'root' })
export class Authguard implements CanActivate {
  users$: any;
  constructor(
    private router: Router,
    private mainservice: MainService,
    private store: Store
  ) { }

  canActivate():
    | Observable<boolean>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // let currentUser='';
    // this.users$ = this.store.pipe(select(selectUsers));
    // this.users$.forEach((element: any) => {
    //   currentUser = element[0]?.token;
    // });
    const currentUser = localStorage.getItem('token');
    console.log(currentUser);
    if (currentUser) {
      this.mainservice.getProfileDetails().subscribe(
        (datas) => {
          const userdetals = new IUser();
          userdetals.userid = datas.response.id;
          userdetals.username = datas.response.firstName;
          userdetals.token = currentUser;
          this.store.dispatch(addUser(userdetals));
        },
        (error) => {
          console.log(error);
          if (error.error.msg === 'error in authorization') {
            void this.router.navigate(['/login']);
          }
        }
      );
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
    // return false;
  }
}
