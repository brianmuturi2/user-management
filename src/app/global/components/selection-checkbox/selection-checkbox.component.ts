import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs';

export interface SelectionInput {
    selections: string[];
}

interface ColumnControls {
    column: string;
    selected: boolean;
}

interface Form {
    columns: ColumnControls[];
}

@Component({
    selector: 'app-selection-checkbox',
    templateUrl: './selection-checkbox.component.html',
    styleUrls: ['./selection-checkbox.component.scss']
})
export class SelectionCheckboxComponent implements OnInit {

    @Input() data: SelectionInput;
    @Output() selectedColumns = new EventEmitter();

    form = this.formBuilder.group({
        columns: this.formBuilder.array([])
    });

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        if (this.data.selections.length >= 1) {
            this.addSelections(this.data.selections);
        }
        this.trackColumns();
    }

    get columns() {
        return this.form.controls['columns'] as FormArray;
    }

    addSelections(selections: string[]) {
        this.columns.clear();
        selections.forEach(item => {
            const form = this.formBuilder.group({
                column: [item, Validators.required],
                selected: [true, Validators.required]
            });
            this.columns.push(form);
        });
    }

    trackColumns() {
        this.form.valueChanges.pipe(debounceTime(1000)).subscribe((formArray: any) => {
            const selected = formArray.columns?.filter((control: ColumnControls) => control.selected).map((control: ColumnControls) => control.column);
            this.selectedColumns.emit(selected)
        })
    }

}
