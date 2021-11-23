import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { finalize, map, switchMap, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressFormComponent } from '../../../shared/components/address-form/address-form.component';
import { AccountApi, EditAddressData } from '../../../../api/base';
import { Address } from '../../../../interfaces/address';
import { CitiesService } from 'projects/storefront/src/app/services/cities.service';
import { Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { ToastrService } from 'ngx-toastr';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';

@Component({
    selector: 'app-page-edit-address',
    templateUrl: './page-edit-address.component.html',
    styleUrls: ['./page-edit-address.component.scss'],
})
export class PageEditAddressComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    form: FormGroup;
    submitted: boolean = false;
    @ViewChild(AddressFormComponent) addressForm: AddressFormComponent;
    addressId: number = null;
    saveInProgress = false;
    firstOrDefaultAddress = false;
    cities$;
    buyerId : number

    constructor(
        private accountApi: AccountApi,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private CitiesService: CitiesService,
        private proxy: Proxy,
        private toastr: ToastrService,
        private jwtAuth : JwtAuthService,
        private Authen : AuthenticationService
    ) {
        this.Authen.onAuthentication.subscribe(result =>{
            if(result){
                this.buyerId = this.jwtAuth.getId()
            }
        })
        if(this.jwtAuth.isAuthenticated()){
            this.buyerId = this.jwtAuth.getId()
        }
    }

    ngOnInit(): void {
        this.fetchCities();


        this.form = this.fb.group({
            BUYER_ADDRESS_ID: [-1],
            COUNTRY: ['Lebanon'],
            CITY: [this.cities$, Validators.required],
            STREET: ['', Validators.required],
            BUILDING: ['', Validators.required],
            FLOOR: ['', Validators.required],
            PHONE_NUMBER: ['', Validators.required],
            LANDLINE_NUMBER: ['', Validators.required],
            BUYER_ID: [this.buyerId],
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    fetchCities() {
        this.cities$ = this.CitiesService.FetchCities();
    }

    saveNewAddress() {
        
        if(!this.form.valid){
            this.toastr.error("Fill the content")
            return
        }
        this.saveInProgress = true;
        this.proxy.Edit_Buyer_address(this.form.value).subscribe((d) => {
            this.saveInProgress = false;
            this.submitted = true;
            if (this.submitted) {
                this.router.navigateByUrl('/account/addresses');
                this.toastr.success('Your new address was succefully added');
            } else {
                this.toastr.error('Entry Error, Check your entry data');
            }
        });
    }
}
