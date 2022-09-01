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
        //this.dataSource.filterPredicate = this.getFilterPredicate();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.columnsToDisplay = this.data.columns.slice();
        this.dataSource = new MatTableDataSource(this.data.data);
        if (this.data.filters.gender && this.data.filters.nationality || this.data.filters.all) {
            this.applyFilter();
        }
        if (!this.canEmit) {
            this.canEmit = this.data.emit;
        }
    }

    getFilterPredicate() {
        return (data: any, filters: string) => {
            const filterArray = filters.split('_');
            const genderFilter = filterArray[0];
            const nationalityFilter = filterArray[1];

            let isMatch = false
            isMatch = data.gender.toLowerCase().indexOf(genderFilter) !== -1 || data.nationality.toLowerCase().indexOf(nationalityFilter) !== -1

            return isMatch;
        };
    }

    applyFilter() {
        this.canEmit = false;

        let filterString: string = '';

        if (this.data.filters.gender && this.data.filters.nationality) {
            const gender = this.data.filters.gender ? this.data.filters.gender : '';
            const nationality = this.data.filters.nationality ? this.data.filters.nationality : '';
            filterString = `${gender}_${nationality}`;
        }

        if (this.data.filters.all) {
            filterString = this.data.filters.all;
        }

        this.dataSource.filter = filterString.trim().toLowerCase();
    }

    handleScroll(e: any) {
        const bottomSpace = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        if (bottomSpace < 900 && this.canEmit) {
            this.fetchData.emit('fetch');
            this.canEmit = false;
        }
    }

}
