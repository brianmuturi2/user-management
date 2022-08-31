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

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(res => {
      this.rawData = res;
      this.transformedData = res.results.map(item => this.usersService.transformData(item));

      this.data = {
        data: this.transformedData,
        columns: this.columnsToDisplay
      };
    })
  }

  updateRequestColumns(e: string[]) {
    this.usersService.updateRequestColumns(e);
  }

}
