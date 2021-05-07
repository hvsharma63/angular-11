import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { noWhitespaceValidator } from 'src/app/shared/validators/custom-validator';
import {FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
  providers: [FormGroupDirective]
})
export class AddBlogComponent implements OnInit, OnDestroy {

  unsubscribe: any;

  ngOnInit(): void {
  }
  blogForms: FormGroup;

  constructor(
    private titleService: Title,
    public modalService: NgbActiveModal,
    private fb: FormBuilder,
  ) {
    this.titleService.setTitle('Blog');

    this.blogForms = this.fb.group({
      title: ['',
        [
          Validators.required,
          Validators.minLength(2),
          noWhitespaceValidator
        ]
      ],
      description: ['',
        [
          Validators.required,
          Validators.minLength(2),
          noWhitespaceValidator
        ]
      ],
      content: ['',
        [
          Validators.required,
          Validators.minLength(2),
          noWhitespaceValidator
        ]
      ],
      visible: [false]
    });
  }



  get title() {
    return this.blogForms.get('title')!;
  }

  get description() {
    return this.blogForms.get('description')!;
  }

  get content() {
    return this.blogForms.get('content')!;
  }


  onSubmit() {

    this.modalService.close(this.blogForms.value);
    console.log(this.blogForms.value);
  }


  ngOnDestroy(): void {
    if(this.unsubscribe){
      this.unsubscribe.unsubscribe();
    }
  }
}
