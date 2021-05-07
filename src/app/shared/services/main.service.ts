/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  headers!: HttpHeaders;
  baseURL = 'http://localhost:3000';

  // token!: string;
  userId!: string;

  constructor(private http: HttpClient, public store: Store<any>) {
    const token: any = localStorage.getItem('token');
    // if (token) {
    this.headers = new HttpHeaders().set('Authorization', token);
    // }
  }

  setHeaders(token: any = null) {
    let x = null;
    if (!token) {
      x = localStorage.getItem('token');
    } else {
      x = token;
    }
    const headers = new HttpHeaders().set('Authorization', x || '');
    console.log(headers);
    return headers;
  }

  public postSignUp(userData: any): Observable<any> {
    return this.http.post<any>(this.baseURL + '/addUser', { ...userData });
  }

  public postLogin(userData: any): Observable<any> {
    return this.http.post<any>(this.baseURL + '/login', {
      emailId: userData.email,
      password: userData.password,
    });
  }

  getUserDetails(email: string, token: string): Observable<any> {
    return this.http.get<any>(this.baseURL + '/user/' + email, {
      headers: this.setHeaders(token),
    });
  }

  public postBlog(
    blogData: any,
    // token: string,
    userId: any
  ): Observable<any> {
    return this.http.post<any>(
      this.baseURL + '/addBlog',
      {
        title: blogData.title,
        description: blogData.description,
        content: blogData.content,
        visible: blogData.visible,
        userId: userId
      },
      { headers: this.headers }
    );
  }

  public updateBlog(
    blogData: any,
    // token: string,
    userId: string,
    blogId: string
  ): Observable<any> {
    console.log(blogData.title);
    return this.http.post<any>(
      this.baseURL + '/updateBlog',
      {
        title: blogData.title,
        description: blogData.description,
        content: blogData.content,
        visible: blogData.visible,
        userId,
        blogId,
      },
      { headers: this.headers }
    );
  }

  getBlogLists(userId: string): Observable<any> {
    return this.http.post<any>(
      this.baseURL + '/userBlog',
      { userId },
      { headers: this.setHeaders() }
    );
  }

  getAllUsersBlog(userId: string) {
    return this.http.post<any>(
      this.baseURL + '/usersBlog',
      { userId },
      { headers: this.headers }
    );
  }

  deleteBlogById(id: any, userid: string): Observable<any> {
    const options = {
      headers: this.headers,
      body: {
        blogId: id,
      },
    };
    return this.http.delete<any>(this.baseURL + '/deleteBlog', options);
  }

  logout() {
    return this.http.post<any>(
      this.baseURL + '/logout',
      {},
      { headers: this.headers }
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseURL + '/users', {
      headers: this.headers,
    });
  }

  postBlogComment(
    blogId: number,
    userid: string,
    // token: string,
    comment: string
  ): Observable<any> {
    return this.http.post<any>(
      this.baseURL + '/addComment',
      {
        blogId,
        userId: userid,
        comment,
      },
      { headers: this.headers }
    );
  }

  postBlogLike(blogId: number, userid: string): Observable<any> {
    return this.http.post<any>(
      this.baseURL + '/addRemoveLike', {
      blogId: blogId,
      userId: userid,
    }, { headers: this.headers }
    );
  }

  getProfileDetails(): Observable<any> {
    // const userId = localStorage.getItem('userid');
    const options = {
      headers: this.headers
    };
    return this.http.get<any>(this.baseURL + '/profileDetails', options);
  }

  updateProfile(userId: string | null, value: any) {
    // var userId = localStorage.getItem('userid');

    return this.http.put<any>(
      this.baseURL + '/updateUser',
      {
        firstName: value.firstName,
        lastName: value.lastName,
        emailId: value.emailId,
        password: value.password,
        userId,
      },
      { headers: this.headers }
    );
  }
}
