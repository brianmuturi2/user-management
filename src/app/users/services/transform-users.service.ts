import { Injectable } from '@angular/core';
import {UserDetails} from './users.service';
import {DatePipe, TitleCasePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TransformUsersService {

  constructor(private datePipe: DatePipe,
              private titleCasePipe: TitleCasePipe) { }

  transformData(item: any, i: number, page: number): UserDetails {
    let counter: number = 0;

    if (page > 1) {
      counter = 50 * (page - 1);
    }

    return {
      index: i + 1 + counter,
      picture: (item.picture ? item.picture.large : 'Not Available'),
      name: (item.name ? `${item.name.title} ${item.name.first} ${item.name.last}` : 'Not Available'),
      gender: (item.gender ? this.titleCasePipe.transform(item.gender) : 'Not Available'),
      location: (item.location ? item.location.country : 'Not Available'),
      'e-mail': (item.email ? item.email : 'Not Available'),
      age: (item.dob ? `${item.dob.age} years` : 'Not Available'),
      registered: (item.registered ? this.datePipe.transform(item.registered.date) : 'Not Available'),
      'phone-number': (item.phone ? item.phone : 'Not Available'),
      nationality: (item.nat ? item.nat : 'Not Available')
    }
  }
}
