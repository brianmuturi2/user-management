import { Component, OnInit } from '@angular/core';
import {UserDetails, UsersService} from '../../services/users.service';

export interface TableData {
  data: UserDetails[];
  columns: string[];
  filter?: string;
}

@Component({
  selector: 'app-users-list-container',
  templateUrl: './users-list-container.component.html',
  styleUrls: ['./users-list-container.component.scss']
})
export class UsersListContainerComponent implements OnInit {

  displayedColumns: string[] = ['picture', 'name', 'gender', 'location', 'e-mail', 'age', 'registered', 'phone-number', 'nationality'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  data: TableData = {
    data: [],
    columns: this.columnsToDisplay
  };

  rawData: any;
  transformedData: any;

  loading = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(results?: number) {
    this.loading = true;
    this.usersService.getUsers(results).subscribe(res => {
      this.loading = false;
      this.rawData = res;
      this.transformedData = res.results.map(item => this.usersService.transformData(item));

      this.data = {
        data: this.transformedData,
        columns: this.columnsToDisplay
      };
    }, err => {
      this.loading = false;
    })
  }

  updateRequestColumns(e: string[]) {
    this.usersService.updateRequestColumns(e);
  }

}
