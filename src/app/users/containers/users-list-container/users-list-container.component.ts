import { Component, OnInit } from '@angular/core';
import {UserDetails, UsersService} from '../../services/users.service';

export interface TableData {
  data: UserDetails[];
  columns: string[];
  filter?: string;
  emit?: boolean;
}

@Component({
  selector: 'app-users-list-container',
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss']
})
export class UsersListContainerComponent implements OnInit {

  displayedColumns: string[] = ['index', 'picture', 'name', 'gender', 'location', 'e-mail', 'age', 'registered', 'phone-number', 'nationality'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  data: TableData = {
    data: [],
    columns: this.columnsToDisplay
  };

  rawData: any;
  transformedData: any;

  loading = false;

  page = 1;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.usersService.getUsers(this.page).subscribe(res => {
      console.log('incremented request', this.page);
      this.loading = false;
      this.rawData = res;
      this.transformedData = res.results.map((item, i) => this.usersService.transformData(item, i, this.page));

      this.data = {
        data: this.data.data.concat(this.transformedData),
        columns: this.columnsToDisplay,
        emit: true
      };

      this.page += 1;
    }, err => {
      this.loading = false;
    })
  }

  handleFetchRequest(e: string) {
    this.getUsers();
  }

}
