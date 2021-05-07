/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

const exclude = [
  'http://localhost:3000/',
  'http://localhost:3000/addUser',
  'http://localhost:3000/login'
];

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private store: Store, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (exclude.includes(req.url)) {
      return next.handle(req);
    }
    return next.handle(req).pipe(
      catchError((error) => {
        console.log(error);
        if (error != null) {
          if (error.status === 'error in authorization') {
            void this.router.navigate(['/login']);
          }
        }
        return throwError(error);
      })
    );
  }
}
