import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TableData} from '../../containers/users-list-container/users-list-container.component';
import {SelectedColumns} from '../../../global/components/multi-select/multi-select.component';
import {FilterObj, SelectDropdownConfig} from '../../../global/components/select/select.component';
import {InputData} from '../../../global/components/input/input.component';

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
    @Output() handleFilter = new EventEmitter<FilterObj>();
    @Output() handleFilterString = new EventEmitter<string>();
    @Output() downloadCsvDoc = new EventEmitter<string>();

    columnSelectionConfig: SelectedColumns;

    filterGender: SelectDropdownConfig = {
        type: 'gender',
        label: 'Select gender',
        values: ['Male', 'Female']
    }

    filterNationality: SelectDropdownConfig = {
        type: 'nationality',
        label: 'Select nationality',
        values: ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US']
    }

    filterInput: InputData = {
        label: 'Search'
    }

    constructor() {
    }

    ngOnInit(): void {
        this.columnSelectionConfig = {
            selections: this.data.columns,
            label: 'Select columns'
        }
    }

    passSelected(e: FilterObj) {
        this.handleFilter.emit(e);
    }

    updateItems(e: string[]) {
        this.requestColumns.emit(e);
    }

    handleFetchRequest(e: string) {
        this.fetchRequest.emit(e);
    }

    handleFilterInput(e: string) {
        this.handleFilterString.emit(e);
    }

    downloadCsv(e: any) {
        this.downloadCsvDoc.emit('download');
    }

}
