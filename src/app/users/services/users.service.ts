import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatePipe, TitleCasePipe} from '@angular/common';

export interface Response {
    results: any[];
}

export interface UserDetails {
    index: number;
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
                private titleCasePipe: TitleCasePipe) {
    }

    getUsers(requestNumber: number = 1) {
        const results = 50;
        const paramsQuery = this.queryParams.join(',');
        const fetchUrl = `${this.usersUrl}?page=${requestNumber}&results=${results}&inc=${paramsQuery}`;

        return this.httpClient.get<Response>(fetchUrl);
    }

    transformData(item: any, i: number, page: number): UserDetails {
        let counter: number = 0;

        if (page > 1) {
            counter = 50 * (page - 1);
        }

        return {
            index: i + 1 + counter,
            picture: (item.picture.large || 'Not Available'),
            name: (`${item.name.title} ${item.name.first} ${item.name.last}` || 'Not Available'),
            gender: (this.titleCasePipe.transform(item.gender) || 'Not Available'),
            location: (item.location.country || 'Not Available'),
            'e-mail': (item.email || 'Not Available'),
            age: (`${item.dob.age} years` || 'Not Available'),
            registered: (this.datePipe.transform(item.registered.date) || 'Not Available'),
            'phone-number': (item.phone || 'Not Available'),
            nationality: (item.nat || 'Not Available')
        }
    }

    updateRequestParams(e: string[]) {
        if (e.length <= 0) {
            return
        }

        this.queryParams.length = 0;

        const newParams = [];
        for (let param of e) {
            if (param === 'picture') {
                newParams.push('picture')
            } else if (param === 'name') {
                newParams.push('name')
            } else if (param === 'gender') {
                newParams.push('gender')
            } else if (param === 'location') {
                newParams.push('location')
            } else if (param === 'e-mail') {
                newParams.push('email')
            } else if (param === 'age') {
                newParams.push('dob')
            } else if (param === 'registered') {
                newParams.push('registered')
            } else if (param === 'phone-number') {
                newParams.push('phone')
            } else if (param === 'nationality') {
                newParams.push('nat')
            }
        }

        this.queryParams = newParams;
    }
}
