import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeText'
})
export class BadgeTextPipe implements PipeTransform {

  transform(value: boolean): string {
      if(value){
          return "Refundable"
      }
    return "Not Refundable";
  }

}
