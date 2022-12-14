import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSelect} from '@angular/material/select';

export interface FilterObj {
    type: string;
    filter: string;
}

export interface SelectDropdownConfig {
    type: string;
    label: string;
    values: string[];
}

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

    @Input() selectDropdownConfig: SelectDropdownConfig;
    @Output() selectedValue = new EventEmitter<FilterObj>()
    @ViewChild(MatSelect) public matSelect: MatSelect;

    selectForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.selectForm = this.formBuilder.group({
            filter: ['']
        })
    }

    handleFilter(e: Event) {
        this.selectedValue.emit({type: this.selectDropdownConfig.type, filter: this.selectForm.value.filter});
    }

}
