import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {StyleManagerService} from '../style-manager/style-manager.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

    date = new Date();

    isDark = this.styleManagerService.isDark;

    opened: boolean;

    fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

    constructor(private styleManagerService: StyleManagerService) {
    }

    toggleDarkTheme() {
        this.styleManagerService.toggleDarkTheme();
        this.isDark = !this.isDark;
    }

}
