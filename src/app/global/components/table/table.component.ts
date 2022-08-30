import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TableData} from '../../../users/containers/users-list-container/users-list-container.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

    @Input() data: TableData;

    columnsToDisplay: string[];

    constructor() {
    }

    ngOnInit(): void {
        this.columnsToDisplay = this.data.columns.slice();
    }

    addColumn(column: string) {
        this.columnsToDisplay.push(column);
    }

    removeColumn(column: string) {
        if (this.columnsToDisplay.length) {
            this.columnsToDisplay = this.columnsToDisplay.filter(columnDisplayed => columnDisplayed !== column);
        }
    }

}
