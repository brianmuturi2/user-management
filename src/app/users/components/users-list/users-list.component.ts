import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TableData} from '../../containers/users-list-container/users-list-container.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

  @Input() data: TableData;
  constructor() { }

  ngOnInit(): void {
  }

}
