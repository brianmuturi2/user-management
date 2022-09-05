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
        if (this.data.filters.length >= 1) {
            this.applyFilter();
        }
        if (!this.canFetch) {
            this.canFetch = this.data.canFetch;
        }
    }

    getFilterPredicate() {
        return (data: any, filters: string) => {
            const obj = {...this.data.data[0]} as const;
            type Keys = keyof typeof obj;

            const map = new Map(JSON.parse(filters));
            let isMatch = false;
            for(let [key,value] of map){
                isMatch = (value == 'all') || (data[key as keyof Keys].toLowerCase() == value);
                if(!isMatch) return false;
            }
            return isMatch;
        };
    }

    applyFilter() {
        this.canFetch = false;

        let filterString: string = '';

        let filterArr = [];
        for (let filterObj of this.data.filters) {
            const arr = Object.values(filterObj);
            filterArr.push(arr);
        }
        filterString = JSON.stringify(filterArr);

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
