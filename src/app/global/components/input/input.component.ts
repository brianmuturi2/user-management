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

    @Input() inputConfig: InputData;
    @Output() inputValue = new EventEmitter<string>()
        @ViewChild('input') public input: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
    }

    keyUp(event: Event) {
        const inputValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.inputValue.emit(inputValue);
    }

}
