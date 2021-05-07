import { Component, ElementRef, OnDestroy , ViewChild} from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NotificationsService } from 'angular2-notifications';
import { BehaviorSubject } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SubSink } from 'subsink';
import {AddBlogComponent} from './../add-blog/add-blog.component';
import { noWhitespaceValidator } from 'src/app/shared/validators/custom-validator';
import { MainService } from 'src/app/shared/services/main.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnDestroy {

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
  dataSource: any;
  userName: string | null;
  sortKey$ = new BehaviorSubject<string>('title');
  sortDirection$ = new BehaviorSubject<string>('asc');
  selectedFiles?: FileList;
  currentFile?: File;
  blogData: any;
  commentItemLists: Array<any> = [];
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  blogForm = this.formBuilder.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        noWhitespaceValidator,
        this.titleValidator,
      ]
    ],
    description: ['', Validators.required],
    content: ['', Validators.required],
    visible: ['true'],
  });
  commentForm = this.formBuilder.group({
    comment: ['', Validators.required],
  });
  events!: string;
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private mainservice: MainService,
    private service: NotificationsService ,
    private titleService: Title,
    private router: Router,
    private store: Store<any>,
    private _modalService: NgbModal,
    elem: ElementRef
  ) {
    this.userName = localStorage.getItem('username');
    this.titleService.setTitle('Blog');
    this.getToken();
    this.getBlogLists();
  }

  getToken() {
    // this.users$ = this.store.pipe(select(selectUsers));
    // this.users$.forEach((element: any) => {
    //   this.token = element[0]?.token;
    //   this.userId = element[0]?.userid;
    // });
  }

  // Tooltip logic
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
    const panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  }

  titleValidator(control: any) {
    if (
      control.value != ' ' &&
      control.value != null &&
      control.value.split('  ').length > 1
    ) {
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

  getBlogLists(): void {
    this.unsubscribe.add(
      this.mainservice.getBlogLists(this.userId).subscribe(
        (data) => {
          this.blogLists = data.response;
          this.dataSource = new BehaviorSubject<any[]>(this.blogLists);
        },
        (error) => {
          if (error.error.msg == 'error in authorization') {
            localStorage.clear();
            this.router.navigateByUrl('/login');
          }
        }
      )
    );
  }

  commentModal(commentsList: any, commentModal: any) {
    this.commentItemLists = commentsList;
    this._modalService.open(commentModal);
  }

  deleteBlog(blog: any) {
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('userid');
    this.unsubscribe.add(
      this.mainservice
        .deleteBlogById(blog.id, this.userId)
        .subscribe((data) => {
          if (data.msg == 'Blog Deleted') {
            this.service.error('Blog Removed Successfully', '', {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            this.showDeleteButton = false;
            this._modalService.dismissAll();
            this.getBlogLists();
          }
        })
    );
  }
  commentinput(i: number) {
    this.index = i;
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
          this.commentForm.value.comment
        )
        .subscribe((data) => {
          if (data.msg === 'Comment Successfully Added') {
            this.commentForm.reset();

            this.getBlogLists();
          }
        })
    );
  }

  blogLike(blogId: number) {
    this.userId = localStorage.getItem('userid');
    this.token = localStorage.getItem('token');
    this.unsubscribe.add(
      this.mainservice
        .postBlogLike(blogId, this.userId)
        .subscribe((data) => {
          if (data.msg === 'Like entry added' || data.msg == 'Like Deleted') {
            this.getBlogLists();
          }
        })
    );
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

  editBlog(currBlog: any) {
    console.log(currBlog);
    const modalRef = this._modalService.open(AddBlogComponent);
    modalRef.componentInstance.titleBlog = 'Edit Blog!';
    modalRef.componentInstance.titleService.setTitle('Edit Blog');
    modalRef.componentInstance.blogForms.setValue({
      title: currBlog?.title,
      description: currBlog?.description,
      content: currBlog?.content,
      visible: currBlog?.visible
    });

    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        this.blogData = result;
        this.blogData.blogId = currBlog.id;
        const userId = JSON.parse(localStorage.getItem('userid') || '{}');
        this.mainservice.updateBlog(this.blogData, userId, this.blogData.blogId)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(() => {
            this.service.success('success', 'Blog updated successfully', {
              timeOut: 2000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: true,
            });
            this.getBlogLists();
          }, () => this.service.warn('error', 'Sorry blog is not updated'));
      }
    });
  }

  addBlog() {
    const modalRef = this._modalService.open(AddBlogComponent);
    modalRef.result.then((result) => {
      console.log(result);
      this.blogData = result;
      console.log(JSON.parse(localStorage.getItem('userid')|| '{}'));
      if (result !== 'Close click') {
        this. mainservice.postBlog(result, JSON.parse(localStorage.getItem('userid')|| '{}'))
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((data) => {this.service.success
          ('success', 'Blog added successfully',{
            timeOut: 1000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
          });
          console.log(data);
          this.getBlogLists();
          }, () => this.service.warn('error', 'Sorry blog is not added'));
      }
      else{ console.log(result);}
    });
  }

  closeModal() {
    this._modalService.dismissAll();
    this.showDeleteButton = false;
  }
  showDeleteBtn(i: number) {
    this.index = i;
    this.showDeleteButton = !this.showDeleteButton;
  }

  changeInDate(){
    let filteredBlogs=[];
    if(this.dateRange.value.end&&this.dateRange.value.start) {
      const startDate =this.dateRange.value.start;
      const endDate =this.dateRange.value.end;
      filteredBlogs = this.blogLists.filter( item =>{
        let isInDateRange = false;
        const d1 = new Date(startDate);
        const d2= new Date(endDate);
        const checkDate = new Date(item.createdAt);
        if((d1.getDate()<checkDate.getDate() && d2.getDate()> checkDate.getDate())
        ||(d1.getDate()===checkDate.getDate()||d2.getDate()===checkDate.getDate())){
          isInDateRange = true;
        }
        return isInDateRange;
      }
      );
      this.dataSource = new BehaviorSubject<any[]>(filteredBlogs);
    }else{
      this.dataSource = new BehaviorSubject<any[]>(this.blogLists);
    }
  }
}
