/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { AbstractControl } from '@angular/forms';

export function noWhitespaceValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
