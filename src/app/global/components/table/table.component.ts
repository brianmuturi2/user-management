import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TableData} from '../../../users/containers/users-list-container/users-list-container.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {

    @Input() data: TableData;
    dataSource: MatTableDataSource<any>;

    columnsToDisplay: string[];

    constructor() {
    }

    ngOnInit(): void {
        this.columnsToDisplay = this.data.columns.slice();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.columnsToDisplay = this.data.columns.slice();
        this.dataSource = new MatTableDataSource(this.data.data);
        if (this.data.filter) {
            this.applyFilter(this.data.filter);
        }
    }

    applyFilter(filter: string) {
        this.dataSource.filter = filter;
    }

}
