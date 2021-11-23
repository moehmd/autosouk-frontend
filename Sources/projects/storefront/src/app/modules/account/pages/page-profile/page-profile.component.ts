import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountApi } from '../../../../api/base';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.scss'],
})
export class PageProfileComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    fullname : string = null
    email : string = null
    form: FormGroup;
    saveInProgress = false;

    constructor(
        private account: AccountApi,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private translate: TranslateService,
        private auth : JwtAuthService
    ) { }

    ngOnInit(): void {
        // this.form = this.fb.group({
        //     firstName: [this.account.user.firstName, [Validators.required]],
        //     lastName: [this.account.user.lastName, [Validators.required]],
        //     email: [this.account.user.email, [Validators.required, Validators.email]],
        //     phone: [this.account.user.phone, [Validators.required]],
        // });
        this.fullname = this.auth.getFullName()
        this.email = this.auth.getEmail()
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    save(): void {
        this.form.markAllAsTouched();

        if (this.saveInProgress || this.form.invalid){
            return;
        }

        this.saveInProgress = true;
        this.account.editProfile(this.form.value).pipe(
            finalize(() => this.saveInProgress = false),
            takeUntil(this.destroy$),
        ).subscribe(() => {
            this.toastr.success(this.translate.instant('TEXT_TOAST_PROFILE_SAVED'));
        });
    }
}
