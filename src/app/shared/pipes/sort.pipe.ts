import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(array: Array<string>): Array<string> {
    console.log(array);
    return array.sort((a: any, b: any) => {
      if (a.user.firstName < b.user.firstName) {
        return -1;
      } else {
        return 0;
      }
    });
  }
}
