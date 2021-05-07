/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { MainService } from 'src/app/shared/services/main.service';
// import { selectUsers } from 'src/app/state/selectors/user.selectors';
import * as UserBlogActions from 'src/app/state/actions/user-blog.action';
import * as fromUser from 'src/app/state/selectors/user-blog.selector';

@Component({
  selector: 'app-usersblog',
  templateUrl: './users-blog.component.html',
  styleUrls: ['./users-blog.component.css'],
})
export class UsersBlogComponent {
  // token: string | null = '';
  userId: string | null = '';
  blogLists: any;
  likeItems: any;
  show = false;
  showComments = false;
  commentItems: any;
  commentItemLists: any;
  commentForm = this.formBuilder.group({
    comment: ['', Validators.required],
  });
  index: any;
  users$: any;
  errorMessage: any;
  commentModalOpen = false;
  displayedColumns: string[] = [
    'title',
    'description',
    'content',
    'username',
    'like',
    'comment',
  ];
  dataSource: any;
  data: any;
  sortKey$ = new BehaviorSubject<string>('title');
  sortDirection$ = new BehaviorSubject<string>('asc');

  constructor(
    private formBuilder: FormBuilder,
    private mainservice: MainService,
    private store: Store,
    private _modalService: NgbModal
  ) {
    void this.getAllUsersBlog();
  }

  async getAllUsersBlog() {
    this.store.dispatch(new UserBlogActions.LoadUsersBlog());
    this.store.pipe(select(fromUser.getUsers)).subscribe((data) => {
      this.blogLists = data;
      this.dataSource = new BehaviorSubject<any[]>(this.blogLists);
    });
    this.store.pipe(select(fromUser.getError)).subscribe((err) => {
      this.errorMessage = err;
    });
  }

  // User Like Counts
  getlikedusername(likesItem: any, i: number) {
    this.likeItems = [];
    if (likesItem.length > 0) {
      likesItem.forEach((element: any) => {
        this.likeItems.push(element.user.firstName.toString());
      });
      this.show = true;
      this.index = i;
    }
  }

  toggleAccordian(event: any, index: any) {
    const element = event.target;
    element.classList.toggle('active');
    console.log(element);
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  commentModal(commentsList: any, modal: any) {
    this.commentItemLists = commentsList;
    this._modalService.open(modal);
  }

  commentinput(i: number) {
    this.index = i;
  }

  // User Comments Name
  getCommentUsernames(commentItems: any, i: number) {
    this.commentItems = [];
    this.commentItems = commentItems;
    this.index = i;
  }

  oncommentSubmit(blogId: number) {
    this.userId = localStorage.getItem('userid');
    // this.token = localStorage.getItem('token');
    this.mainservice
      .postBlogComment(
        blogId,
        this.userId!,
        // this.token!,
        this.commentForm.value.comment
      )
      .subscribe((data) => {
        if (data.msg === 'Comment Successfully Added') {
          this.commentForm.reset();
          this.getAllUsersBlog();
        }
      });
  }

  blogLike(blogId: number) {
    this.userId = localStorage.getItem('userid');
    // this.token = localStorage.getItem('token');
    this.mainservice
      .postBlogLike(blogId, this.userId!)
      .subscribe((data) => {
        if (data.msg === 'Like entry added' || data.msg === 'Like Deleted') {
          this.getAllUsersBlog();
        }
      });
  }

  closeModal() {
    this._modalService.dismissAll();
  }

  adjustSort(key: string) {
    this.blogLists = this.blogLists.slice();
    if (key === 'likes') {
      this.blogLists.sort((a: any, b: any) => {
        if (a.likeItems.length > b.likeItems.length) {
          return this.sortDirection$.value === 'asc' ? 1 : -1;
        }
        if (a.likeItems.length < b.likeItems.length) {
          return this.sortDirection$.value === 'asc' ? -1 : 1;
        }
        return 0;
      });
    } else if (key === 'username') {
      this.blogLists.sort((a: any, b: any) => {
        if (a.user.firstName > b.user.firstName) {
          return this.sortDirection$.value === 'asc' ? 1 : -1;
        }
        if (a.user.firstName < b.user.firstName) {
          return this.sortDirection$.value === 'asc' ? -1 : 1;
        }
        return 0;
      });
    } else {
      this.blogLists.sort((a: any, b: any) => {
        if (a[key] > b[key]) {
          return this.sortDirection$.value === 'asc' ? 1 : -1;
        }
        if (a[key] < b[key]) {
          return this.sortDirection$.value === 'asc' ? -1 : 1;
        }
        return 0;
      });
    }

    this.dataSource.next(this.blogLists);
    if (this.sortKey$.value === key) {
      if (this.sortDirection$.value === 'asc') {
        this.sortDirection$.next('desc');
      } else {
        this.sortDirection$.next('asc');
      }
      return;
    }
    this.sortKey$.next(key);
    this.sortDirection$.next('asc');
  }
}
