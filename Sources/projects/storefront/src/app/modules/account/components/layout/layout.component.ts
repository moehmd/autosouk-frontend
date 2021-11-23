import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountApi } from '../../../../api/base';
import { Router } from '@angular/router';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';


@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    navigation = [];

    constructor(
        private account: AccountApi,
        private translate: TranslateService,
        private router: Router,
        private authentication : AuthenticationService
    ) { }

    ngOnInit(): void {
        this.initNavigation();
        this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.initNavigation());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    logout(): void {
            localStorage.removeItem('token');
            this.authentication.onAuthentication.emit(false);
            this.router.navigateByUrl('/account/login').then();
    }

    private initNavigation(): void {
        this.navigation = [
            {type: 'link', label: this.translate.instant('LINK_ACCOUNT_PROFILE'), url: '/account/profile'},
            {type: 'link', label: this.translate.instant('LINK_ACCOUNT_ORDERS'), url: '/account/orders'},
            {type: 'link', label: this.translate.instant('LINK_ACCOUNT_ADDRESSES'), url: '/account/addresses'},
            // {type: 'link', label: this.translate.instant('LINK_ACCOUNT_PASSWORD'), url: '/account/password'},
        ];
    }
}
