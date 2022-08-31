import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

export interface InputData {
    label: string;
}

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

    @Input() data: InputData;
    @Output() filterValue = new EventEmitter<string>()

    constructor() {
    }

    ngOnInit(): void {
    }

    keyUp(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.filterValue.emit(filterValue);
    }

}
