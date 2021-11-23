import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { UrlService } from '../../../../services/url.service';
import { Params_Delete_Buyer_address, Params_Get_Buyer_address_By_BUYER_ID, Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { switchMap } from 'rxjs/operators';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';


@Component({
    selector: 'app-page-addresses',
    templateUrl: './page-addresses.component.html',
    styleUrls: ['./page-addresses.component.scss'],
})
export class PageAddressesComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    private onRefreshStatusess: EventEmitter<any> = new EventEmitter();
    ListOfAddresses : any[] = [];
    buyerId : number

    constructor(
        public url: UrlService,
        private proxy : Proxy,
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
        //this.getAddresses();
        this.handleRefreshStatuses().subscribe();
        this.refreshStatuses();

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getAddresses(){
        var params = new Params_Get_Buyer_address_By_BUYER_ID();
        params.BUYER_ID = this.buyerId;

        this.proxy.Get_Buyer_address_By_BUYER_ID(params).subscribe(d =>{
            this.ListOfAddresses = d;
        })
    }

    removeAddress(address){
        //
        var params = new Params_Delete_Buyer_address();
        params.BUYER_ADDRESS_ID = address.BUYER_ADDRESS_ID;
        this.proxy.Delete_Buyer_address(params).subscribe(d =>{
            this.refreshStatuses();
        });
    }

    public refreshStatuses() {
        //
        this.onRefreshStatusess.emit();
    }

    public handleRefreshStatuses(): Observable<any> {
        //
        return this.onRefreshStatusess.pipe(
            switchMap(() => {
                var params = new Params_Get_Buyer_address_By_BUYER_ID();
                params.BUYER_ID = this.buyerId;
                return this.proxy.Get_Buyer_address_By_BUYER_ID(params);
            }),
            switchMap((address) => {
                this.setStatuses(address);
                return of(true);
            })
        );
    }

    private setStatuses(address: any) {
        this.ListOfAddresses = address;
    }
}
