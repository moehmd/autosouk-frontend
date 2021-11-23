import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountApi } from '../../../../api/base';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { mustMatchValidator } from '../../../../functions/validators/must-match';
import { Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { ToastrService } from 'ngx-toastr';
import { CitiesService } from 'projects/storefront/src/app/services/cities.service';
import { CountryService } from 'projects/storefront/src/app/services/country.service';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';

@Component({
    selector: 'app-page-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    AuthDisplay : boolean = false;
    loginForm: FormGroup;
    loginInProgress = false;
    registerForm: FormGroup;
    registerInProgress = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private auth : JwtAuthService,
        private proxy : Proxy,
        private toastr: ToastrService,
        private authentication : AuthenticationService,
    ) {}

    ngOnInit(): void {
        this.AuthDisplay = this.auth.isAuthenticated()
        this.loginForm = this.fb.group({
            EMAIL: ['', [Validators.required, Validators.email]],
            PASSWORD: ['', [Validators.required]]
        });


        this.registerForm = this.fb.group({
            BUYER_ID:[-1, Validators.required],
            FIRST_NAME: ['', Validators.required],
            LAST_NAME: ['', Validators.required],
            PHONE_NB:[Validators.required],
            EMAIL: ['', [Validators.required, Validators.email]],
            PASSWORD: ['', [Validators.required]],
        }, );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    login(): void {
        if(!this.loginForm.valid){
            this.toastr.error("Fill the content")
            return
        }
        this.loginInProgress = true;
        if(this.AuthDisplay != true){
        this.authentication.Login(this.loginForm.value).subscribe((result) => {
            this.loginInProgress = false;
            if (result) {
                this.loginForm.reset()
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
                    this.router.navigateByUrl('/account/profile').then();
                }
            }
        });
    }else{
        this.loginInProgress = false
        this.loginForm.reset()
        this.toastr.error("You're already signed In")
    }
    }

    register(): void {
        if(!this.registerForm.valid){
            this.toastr.error("Fill the content")
            return
        }
        this.registerInProgress = true;
        this.proxy.Edit_Buyer(this.registerForm.value).subscribe((data)=>{
            this.registerInProgress = false;
            if(data){
                this.registerForm.reset();
                this.toastr.success("Your Account has been Succefuly registered, Please check your email!")
            }
        })
    }
}
