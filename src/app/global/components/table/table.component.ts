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
import {UserDetails} from '../../../users/services/users.service';

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

    canFetch: boolean | undefined = true;

    constructor() {
    }

    ngOnInit(): void {
        this.columnsToDisplay = this.data.columns.slice();
        this.dataSource = new MatTableDataSource<any>();
        this.dataSource.filterPredicate = this.getFilterPredicate();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.columnsToDisplay = this.data.columns.slice();
        if (this.dataSource) {
            this.dataSource.data = this.data.data;
        }
        if (this.data.filters.gender || this.data.filters.nationality || this.data.filters.all) {
            this.applyFilter();
        }
        if (!this.canFetch) {
            this.canFetch = this.data.canFetch;
        }
    }

    getFilterPredicate() {
        return (data: UserDetails, filters: string) => {
            const filterArray = filters.split('_');
            const genderFilter = filterArray[0];
            const nationalityFilter = filterArray[1];

            let matchFilter = [];

            const genderStatus = data.gender.toLowerCase() === genderFilter || genderFilter === '';

            const nationalityStatus = data.nationality.toLowerCase() === nationalityFilter || nationalityFilter === '';

            matchFilter = [genderStatus, nationalityStatus]

            return matchFilter.every(Boolean);
        };
    }

    applyFilter() {
        this.canFetch = false;

        let filterString: string = '';

        if (this.data.filters.gender || this.data.filters.nationality) {
            const gender = this.data.filters.gender && this.data.filters.gender !== 'All' ? this.data.filters.gender : '';
            const nationality = this.data.filters.nationality && this.data.filters.nationality !== 'All' ? this.data.filters.nationality : '';
            filterString = `${gender}_${nationality}`;
        }

        if (this.data.filters.all) {
            filterString = this.data.filters.all;
        }

        this.dataSource.filter = filterString.trim().toLowerCase();
    }

    handleScroll(e: any) {
        const bottomSpace = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
        if (bottomSpace < 500 && this.canFetch) {
            this.fetchData.emit('fetch');
            this.canFetch = false;
        }
    }

}
