import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {StyleManagerService} from '../style-manager/style-manager.service';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    date = new Date();

    isDark = this.styleManagerService.isDark;

    opened: boolean;

    navItems = ['Home', 'Users', 'Notifications','Settings']

    fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

    mode = 'side';
    isOpen = true;

    constructor(private styleManagerService: StyleManagerService,
                private breakPointObserver: BreakpointObserver) {
    }

    ngOnInit() {
        this.breakPointObserver.observe(Breakpoints.XSmall)
            .subscribe(result => {
                if (result.matches) {
                    this.mode = 'over';
                    this.isOpen = false;
                } else {
                    this.mode = 'side';
                    this.isOpen = true;
                }
            });
    }

    toggleDarkTheme() {
        this.styleManagerService.toggleDarkTheme();
        this.isDark = !this.isDark;
    }

}
