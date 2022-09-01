import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MultiSelectComponent} from './multi-select.component';
import {MatOption} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MultiSelectComponent', () => {
    let component: MultiSelectComponent;
    let fixture: ComponentFixture<MultiSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MultiSelectComponent],
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MultiSelectComponent);
        component = fixture.componentInstance;
        component.selectionConfig = {
            label: 'selection',
            selections: ['index', 'picture', 'name', 'gender']
        }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit selection', async () => {
        const spy = spyOn(component, 'handleItems');

        const options: MatOption[] = component.matSelect.options.toArray();
        expect(options.length).toBe(4);

        options[1]._selectViaInteraction();
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    })
});
