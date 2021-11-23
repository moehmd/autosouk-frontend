import {
    Component,
    EventEmitter,
    HostBinding,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccountApi } from '../../../../api/base';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialAuthService,
    SocialUser,
} from 'angularx-social-login';
import { Params_AuthByFbAndGoogle, Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { ToastrService } from 'ngx-toastr';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';

@Component({
    selector: 'app-account-menu',
    templateUrl: './account-menu.component.html',
    styleUrls: ['./account-menu.component.scss'],
})
export class AccountMenuComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    fullname : string = null
    email: string = null
    isAuth$: Observable<boolean>;
    firstName$: Observable<string>;
    lastName$: Observable<string>;
    email$: Observable<string>;
    avatar$: Observable<string>;
    user: SocialUser;
    loggedIn: boolean;
    form: FormGroup;

    isAuthenticated: boolean = false;

    loginInProgress = false;

    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class.account-menu') classAccountMenu = true;

    constructor(
        private fb: FormBuilder,
        public account: AccountApi,
        public router: Router,
        private authService: SocialAuthService,
        private proxy: Proxy,
        private toastr: ToastrService,
        private auth: JwtAuthService,
        private authentication: AuthenticationService
    ) {
        this.isAuth$ = this.account.user$.pipe(map((x) => x !== null));
        this.firstName$ = this.account.user$.pipe(
            map((x) => (x ? x.firstName : null))
        );
        this.lastName$ = this.account.user$.pipe(
            map((x) => (x ? x.lastName : null))
        );
        this.email$ = this.account.user$.pipe(map((x) => (x ? x.email : null)));
        this.avatar$ = this.account.user$.pipe(
            map((x) => (x ? x.avatar : null))
        );
    }

    ngOnInit(): void {
        if(this.auth.isAuthenticated()){
            this.fullname = this.auth.getFullName()
            this.email = this.auth.getEmail()
        }
        this.authentication.onAuthentication.subscribe(d =>{
            if(d){
               this.fullname = this.auth.getFullName()
               this.email = this.auth.getEmail()
            }else{
                this.fullname = null
                this.email = null
            }
        })

        this.form = this.fb.group({
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required]],
        });

        this.authentication.onAuthentication.subscribe(d =>{
            
            this.isAuthenticated = this.auth.isAuthenticated();
        })

        this.authService.authState.subscribe((user) => {
            this.user = user;
            this.loggedIn = user != null;
        });
        //console.log("---------------> "+ this.user);

        this.isAuthenticated = this.auth.isAuthenticated();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    signInWithGoogle(): void {
        this.authService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((x) =>
            {
                var params = new Params_AuthByFbAndGoogle()
                params.BuyerId = -1;
                params.EmailAddress = x.email
                params.FirstName = x.firstName
                params.LastName = x.lastName
                params.Provider = x.provider
                this.loginInProgress = true;
                this.proxy.AuthByFbAndGoogle(params).subscribe((result) => {
                    this.loginInProgress = false;
                    if (result) {
                        localStorage.setItem('token', result);
                        var userType = this.auth.getUserType();
                        if (userType != '003') {
                            localStorage.removeItem('token');
                            this.toastr.error(
                                'You are not a buyer, please sign in as Buyer'
                            );
                            this.router.navigateByUrl('/account/login').then();
                        } else {
                            this.authentication.onAuthentication.emit(true);
                            this.closeMenu.emit();
                            this.router.navigateByUrl('/account/profile').then();
                        }
                    }
                })
            }

            );
    }

    // signInWithFB(): void {
    //     this.authService
    //         .signIn(FacebookLoginProvider.PROVIDER_ID)
    //         .then((x) => console.log(x));
    // }

    // signOut(): void {
    //     this.authService
    //         .signOut()
    //         .then()
    //         .catch((err) => {
    //             //console.log("Error ya 7mar"+ err);
    //         });
    // }

    refreshToken(): void {
        this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    login(): void {
        if(!this.form.valid){
            this.toastr.error("Fill the content")
            return
        }
        this.loginInProgress = true;
        this.authentication.Login(this.form.value).subscribe((result) => {
            this.loginInProgress = false;
            if (result) {
                localStorage.setItem('token', result);
                var userType = this.auth.getUserType();
                if (userType != '003') {
                    localStorage.removeItem('token');
                    this.toastr.error(
                        'You are not a buyer, please sign in as Buyer'
                    );
                    this.router.navigateByUrl('/account/login').then();
                } else {
                    this.authentication.onAuthentication.emit(true);
                    this.closeMenu.emit();
                    this.router.navigateByUrl('/account/profile').then();
                }
                this.form.reset()
            }
        });
    }

    logout(): void {
        localStorage.removeItem('token');
        this.authentication.onAuthentication.emit(false);
        this.form.reset()
        this.router.navigateByUrl('/account/login').then();
        this.closeMenu.emit();
    }
}
