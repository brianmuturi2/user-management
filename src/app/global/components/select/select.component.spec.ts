import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectComponent} from './select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatOption} from '@angular/material/core';

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectComponent],
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        component.selectDropdownConfig = {
            type: 'gender',
            label: 'selection',
            values: ['one', 'two']
        }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have no initial values', () => {
        const selectFormGroup = component.selectForm;

        const selectFormValues = {
            filter: ''
        }

        expect(selectFormGroup.value).toEqual(selectFormValues);
    });

    it('should emit selection', async () => {
        const spy = spyOn(component, 'handleFilter');

        const options: MatOption[] = component.matSelect.options.toArray();
        expect(options.length).toBe(2);

        options[1]._selectViaInteraction();
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
        expect(component.selectForm.value.filter).toBe('two');
    })
});
