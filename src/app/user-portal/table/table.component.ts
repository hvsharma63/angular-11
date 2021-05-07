import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';
import { Sort } from '@angular/material/sort';

import { noWhitespaceValidator } from 'src/app/shared/validators/custom-validator';
import { MainService } from 'src/app/shared/services/main.service';
import { selectUsers } from 'src/app/state/selectors/user.selectors';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges {
  @Output() editBlogEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  @Input() dataSource: any;
  datasource: any;
  token: string | any;
  userId: string | any;
  blogLists: Array<any> = [];
  blogId!: string;
  likeItems: Array<any> = [];
  show = false;
  showComments = false;
  index!: number;
  commentItems: Array<any> = [];
  unsubscribe = new SubSink();
  showDeleteButton = false;
  users$: any;
  commentModalOpen = false;
  addModalOpen = false;
  deleteModalOpen = false;
  displayedColumns: string[] = [
    'title',
    'description',
    'content',
    'like',
    'comment',
    'createdAt',
    'delete',
  ];
  sortedData!: any[];
  userName: string | null;
  sortKey$ = new BehaviorSubject<string>('title');
  sortDirection$ = new BehaviorSubject<string>('asc');
  selectedFiles?: FileList;
  currentFile?: File;
  commentItemLists: Array<any> = [];

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  blogForm = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(2), noWhitespaceValidator, this.titleValidator],
    ],
    description: ['', Validators.required],
    content: ['', Validators.required],
    visible: ['true'],
  });
  commentForm = this.formBuilder.group({
    comment: ['', Validators.required],
  });
  events!: string;
  displayedColumnsRow2!: string[];
  constructor(
    private formBuilder: FormBuilder,
    private mainservice: MainService,
    private service: NotificationsService,
    private titleService: Title,
    private router: Router,
    private store: Store<any>,
    private modalService: NgbModal,
  ) {
    this.userName = localStorage.getItem('username');
    this.titleService.setTitle('Blog');
    this.getToken();
    this.getBlogLists();
  }

  getToken(): void {
    // this.users$ = this.store.pipe(select(selectUsers));
    // this.users$.forEach((element: any) => {
    //   this.token = element[0]?.token;
    //   this.userId = element[0]?.userid;
    // });
  }

  // Tooltip logic
  getlikedusername(likesItem: any, i: number): void {
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
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  titleValidator(control: any) {
    if (control.value !== ' ' && control.value != null && control.value.split('  ').length > 1) {
      return {
        titleInvalide: true,
      };
    }
    return null;
  }

  // Popover logic
  getCommentUsernames(commentItems: any, i: number) {
    this.commentItems = [];
    this.commentItems = commentItems;
    this.showComments = !this.showComments;
    this.index = i;
  }

  selectFile(e: any) {
    this.selectedFiles = e.target.files;
  }

  getBlogId(id: any, content: any): void {
    this.blogId = id;
    this.modalService.open(content, { centered: true });
  }

  getBlogLists() {
    this.unsubscribe.add(
      this.mainservice.getBlogLists(this.userId).subscribe(
        data => {
          this.blogLists = data.response;
          this.dataSource = new BehaviorSubject<any[]>(this.blogLists);
        },
        error => {
          if (error.error.msg === 'error in authorization') {
            localStorage.clear();
            void this.router.navigateByUrl('/login');
          }
        },
      ),
    );
  }

  commentModal(commentsList: any, commentModal: any) {
    this.commentItemLists = commentsList;
    this.modalService.open(commentModal);
  }

  delete_blog(): void {
    this.deleteEmitter.emit(this.blogId);
  }
  commentinput(id: number) {
    this.index = id;
  }
  oncommentSubmit(blogId: number) {
    this.userId = localStorage.getItem('userid');
    this.token = localStorage.getItem('token');
    this.unsubscribe.add(
      this.mainservice
        .postBlogComment(
          blogId,
          this.userId,
          // this.token,
          this.commentForm.value.comment,
        )
        .subscribe(data => {
          if (data.msg === 'Comment Successfully Added') {
            this.commentForm.reset();

            this.getBlogLists();
          }
        }),
    );
  }

  blogLike(blogId: number) {
    this.users$ = this.store.pipe(select(selectUsers));
    this.users$.forEach((element: any) => {
      this.userName = element[0]?.username;
      this.userId = element[0]?.userid;
      this.token = element[0]?.token;
    });
    this.unsubscribe.add(
      this.mainservice.postBlogLike(blogId, this.userId).subscribe(
        data => {
          if (data.msg === 'Like entry added' || data.msg === 'Like Deleted') {
            this.getBlogLists();
          }
        },
        error => console.log(error),
      ),
    );
  }

  openEditModal(currBlog: any) {
    this.editBlogEmitter.emit(currBlog);
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  addBlog(modal: any) {
    this.modalService.open(modal);
  }

  closeModal() {
    this.modalService.dismissAll();
    this.showDeleteButton = false;
  }
  showDeleteBtn(i: number) {
    this.index = i;
    this.showDeleteButton = !this.showDeleteButton;
  }

  ngOnChanges(): void { }

  sortData(sort: Sort) {
    const data = this.dataSource._value.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource._value = data;
      return;
    }

    this.dataSource._value = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
      case 'user':
        return this.compare(a.user.firstName, b.user.firstName, isAsc);
      case 'title':
        return this.compare(a.title, b.title, isAsc);
      case 'description':
        return this.compare(a.description, b.description, isAsc);
      case 'content':
        return this.compare(a.content, b.content, isAsc);
      case 'likeAndComment':
        return this.compare(a.likeItems, b.likeItems, isAsc);
      case 'createdAt':
        return this.compare(a.createdAt, b.createdAt, isAsc);
      default:
        return 0;
      }
    });
    this.dataSource.next(this.dataSource._value);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
