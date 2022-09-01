import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputComponent} from './input.component';
import {MaterialModule} from '../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InputComponent],
            imports: [MaterialModule, BrowserAnimationsModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        component.inputConfig = {
            label: 'search'
        }
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit entered text', () => {
        const spy = spyOn(component, 'keyUp');

        const event = new KeyboardEvent('keyup', {
            bubbles: true, cancelable: true, shiftKey: false
        });

        const input = component.input.nativeElement;
        input.value = 'searched';

        input.dispatchEvent(event);
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    })
});
