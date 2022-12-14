import {Component, OnInit} from '@angular/core';
import {UserDetails, UsersService} from '../../services/users.service';
import {FilterObj} from '../../../global/components/select/select.component';
import {CsvService} from '../../services/csv.service';
import {TransformUsersService} from '../../services/transform-users.service';

interface FilterStrings {
    column?: string;
    value?: string;
}

export interface TableData {
    data: UserDetails[];
    columns: string[];
    filters: FilterStrings[];
    canFetch?: boolean;
}

@Component({
    selector: 'app-users-list-container',
    templateUrl: './users-list-container.component.html',
    styleUrls: ['./users-list-container.component.scss']
})
export class UsersListContainerComponent implements OnInit {

    displayedColumns: string[] = ['index', 'picture', 'name', 'gender', 'location', 'e-mail', 'age', 'registered', 'phone-number', 'nationality'];
    columnsToDisplay: string[] = this.displayedColumns.slice();

    data: TableData = {
        data: [],
        columns: this.columnsToDisplay,
        filters: [],
    };

    rawData: any;
    transformedData: any;

    loading = false;

    page = 1;

    constructor(private usersService: UsersService,
                private transformUsersService: TransformUsersService) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.loading = true;
        this.usersService.getUsers(this.page).subscribe(res => {
            this.loading = false;
            this.rawData = res;
            this.transformedData = res.results.map((item, i) => this.transformUsersService.transformData(item, i, this.page));

            this.data = {
                ...this.data,
                data: this.data.data.concat(this.transformedData),
                canFetch: true
            };

            this.page += 1;
        }, err => {
            this.loading = false;
        })
    }

    handleFetchRequest(e: string) {
        this.getUsers();
    }

    handleRequestColumns(e: string[]) {
        this.data = {
            ...this.data,
            columns: e
        };

        this.usersService.updateRequestParams(e);
    }

    handleFilter(e: FilterObj) {
        this.data = {
            ...this.data,
            filters: [...this.data.filters, {column: e.type, value: e.filter}]
        }
    }

    handleFilterString(e: string) {
        this.data = {
            ...this.data,
            filters: [...this.data.filters, {column: 'all', value: e}]
        }
    }

    generateCsv(e: string) {
        CsvService.exportToCsv('users.csv', this.data.data);
    }

}
