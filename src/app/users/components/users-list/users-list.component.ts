import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TableData} from '../../containers/users-list-container/users-list-container.component';
import {SelectionInput} from '../../../global/components/selection-checkbox/selection-checkbox.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnChanges {

  @Input() data: TableData;
  @Output() requestColumns = new EventEmitter<string[]>();

  inputConfig = {
    label: 'filter'
  }

  selectionConfig: SelectionInput;

  constructor() {
  }

  ngOnInit(): void {

  }


  ngOnChanges(): void {
    this.selectionConfig = {
      selections: this.data.columns
    }
  }

  passFilter(e: string) {
    this.data = {...this.data, filter: e};
  }

  updateColumns(e: string[]) {
    this.data = {
      ...this.data,
      columns: e
    };
    this.requestColumns.emit(e);
  }

}
