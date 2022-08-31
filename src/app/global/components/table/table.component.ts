import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
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
    @Output() fetchData = new EventEmitter<string>();

    dataSource: MatTableDataSource<any>;

    columnsToDisplay: string[];

    canEmit: boolean | undefined = true;

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
        if (!this.canEmit) {
            this.canEmit = this.data.emit;
        }
    }

    applyFilter(filter: string) {
        this.canEmit = false;
        this.dataSource.filter = filter;
    }

    handleScroll(e:any) {
        const bottomSpace = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        if (bottomSpace < 900 && this.canEmit) {
            this.fetchData.emit('fetch');
            this.canEmit = false;
        }
    }

}
