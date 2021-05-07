/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Directive,HostListener } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appCustom]',
})
export class CustomDirective {
  constructor(private formGroup: FormGroupDirective) {}
  @HostListener('keydown', ['$event']) onSubmit(e: any) {
    if (e.ctrlKey && e.keyCode === 13) {
      this.formGroup.ngSubmit.emit();
    }
  }
}
