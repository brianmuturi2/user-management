import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe, TitleCasePipe} from '@angular/common';

export interface Response {
  results: any[];
}

export interface UserDetails {
  name: string;
  gender: string;
  location: string;
  'e-mail': string;
  age: string;
  registered: string | null;
  'phone-number': string;
  picture: string;
  nationality: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl = 'https://randomuser.me/api/';
  queryParams = ['name', 'gender', 'location', 'email', 'dob', 'registered', 'phone', 'picture', 'nat']

  constructor(private httpClient: HttpClient,
              private datePipe: DatePipe,
              private titleCasePipe: TitleCasePipe) { }

  getUsers(results: number = 50, params: string[] = this.queryParams) {

    const paramsQuery = params.join(',');
    const fetchUrl = `${this.usersUrl}?results=${results}&${paramsQuery}`;

    return this.httpClient.get<Response>(fetchUrl);
  }

  transformData(item: any): UserDetails {
    return {
      picture: item.picture.large,
      name: `${item.name.title} ${item.name.first} ${item.name.last}`,
      gender: this.titleCasePipe.transform(item.gender),
      location: item.location.country,
      'e-mail': item.email,
      age: `${item.dob.age} years`,
      registered: this.datePipe.transform(item.registered.date),
      'phone-number': item.phone,
      nationality: item.nat
    }
  }

  updateRequestColumns(requestColumns: string[]) {
    const params = [];
    if (requestColumns.includes('picture')) {
      params.push('picture');
    }
    if (requestColumns.includes('name')) {
      params.push('name');
    }
    if (requestColumns.includes('gender')) {
      params.push('gender');
    }
    if (requestColumns.includes('location')) {
      params.push('location');
    }
    if (requestColumns.includes('e-mail')) {
      params.push('email');
    }
    if (requestColumns.includes('age')) {
      params.push('dob');
    }
    if (requestColumns.includes('registered')) {
      params.push('registered');
    }
    if (requestColumns.includes('phone-number')) {
      params.push('phone');
    }
    if (requestColumns.includes('nationality')) {
      params.push('nat');
    }
    this.queryParams = params;
  }
}
