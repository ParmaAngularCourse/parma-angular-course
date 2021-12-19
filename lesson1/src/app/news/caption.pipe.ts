import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caption'
})
export class CaptionPipe implements PipeTransform {

  transform(value: string): string {
    return `${value.substr(0, 1).toUpperCase()}${value.substr(1)}`;
  }

}
