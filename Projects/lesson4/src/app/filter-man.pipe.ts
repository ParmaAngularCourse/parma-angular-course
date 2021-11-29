import { Pipe, PipeTransform } from '@angular/core';
import { ObjUser } from './types';

@Pipe({
  name: 'filterMan',
  pure: false
})
export class FilterManPipe implements PipeTransform {

  transform(allUser: ObjUser[]): ObjUser[] {
    //console.log(1);
    return allUser.filter(user => user.gender);
  }

}
