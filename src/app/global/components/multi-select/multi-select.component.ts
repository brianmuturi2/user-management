import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

export interface SelectedColumns {
    selections: string[];
    label: string;
}

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {

    items = new FormControl(['']);

    @Input() selectionConfig: SelectedColumns;
    @Output() selectedItems = new EventEmitter<string[]>();

    constructor() {
    }

    ngOnInit(): void {
        this.items.setValue(this.selectionConfig.selections);
    }

    handleItems(e: any) {
        this.selectedItems.emit(e.value);
    }

}
