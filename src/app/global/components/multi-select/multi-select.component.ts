import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl } from '@angular/forms';

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

  columns = new FormControl(['']);

  @Input() selectionConfig: SelectedColumns;
  @Output() selectedColumns = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.columns.setValue(this.selectionConfig.selections);
  }

  handleColumns(e: any) {
    this.selectedColumns.emit(e.value);
  }

}
