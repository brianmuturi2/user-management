import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TableData} from '../../containers/users-list-container/users-list-container.component';
import {SelectedColumns} from '../../../global/components/multi-select/multi-select.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

    @Input() data: TableData;
    @Output() requestColumns = new EventEmitter<string[]>();
    @Output() fetchRequest = new EventEmitter<string>();

    inputConfig = {
        label: 'filter'
    }

    columnSelectionConfig: SelectedColumns;

    constructor() {
    }

    ngOnInit(): void {
        this.columnSelectionConfig = {
            selections: this.data.columns,
            label: 'Select columns'
        }
    }

    passFilter(e: string) {
        this.data = {...this.data, filter: e};
    }

    updateColumns(e: string[]) {
        this.requestColumns.emit(e);
    }

    handleFetchRequest(e: string) {
        this.fetchRequest.emit(e);
    }

}
