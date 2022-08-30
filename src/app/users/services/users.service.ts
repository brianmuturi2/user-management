import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Response {
  results: any[];
}

export interface UserDetails {
  name: string;
  gender: string;
  location: string;
  'e-mail': string;
  age: number;
  registered: string;
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

  constructor(private httpClient: HttpClient) { }

  getUsers(results: number = 50, params: string[] = this.queryParams) {

    const paramsQuery = params.join(',');
    const fetchUrl = `${this.usersUrl}?results=${results}&${paramsQuery}`;

    return this.httpClient.get<Response>(fetchUrl);
  }

  transformData(item: any): UserDetails {
    return {
      picture: item.picture.large,
      name: `${item.name.title} ${item.name.first} ${item.name.last}`,
      gender: item.gender,
      location: item.location.country,
      'e-mail': item.email,
      age: item.dob.age,
      registered: item.registered.date,
      'phone-number': item.phone,
      nationality: item.nat
    }
  }
}
