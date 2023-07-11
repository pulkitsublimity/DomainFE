import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

    transform(userlist: any[], searchText: string): any[] {
      if (!userlist || !searchText) {
        return userlist;
      }
  
      searchText = searchText.toLowerCase();
      return userlist.filter(user => user.name.toLowerCase().includes(searchText));
    }

}
