import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { CurrencyService } from '../../../currency/services/currency.service';
import { Subject } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';
import { QuickviewService } from '../../../../services/quickview.service';
import { UrlService } from '../../../../services/url.service';
import {
    Productt,
    ProductAttribute,
    ProductCompatibilityResult,
} from '../../../../interfaces/product';
import { Vehicle } from '../../../../interfaces/vehicle';
import { CurrentVehicleService } from '../../../../services/current-vehicle.service';
import { Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';

export type ProductCardElement =
    | 'actions'
    | 'status-badge'
    | 'meta'
    | 'features'
    | 'buttons'
    | 'list-buttons';

export type ProductCardLayout = 'grid' | 'list' | 'table' | 'horizontal';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnChanges, OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();

    showingQuickview = false;

    featuredAttributes: ProductAttribute[] = [];

    vehicle: Vehicle = null;

    @Input() product: any;

    @Input() layout: ProductCardLayout;

    @Input() exclude: ProductCardElement[] = [];

    @HostBinding('class.product-card') classProductCard = true;

    @HostBinding('class.product-card--layout--grid')
    get classProductCardLayoutGrid(): boolean {
        return this.layout === 'grid';
    }

    @HostBinding('class.product-card--layout--list')
    get classProductCardLayoutList(): boolean {
        return this.layout === 'list';
    }

    @HostBinding('class.product-card--layout--table')
    get classProductCardLayoutTable(): boolean {
        return this.layout === 'table';
    }

    @HostBinding('class.product-card--layout--horizontal')
    get classProductCardLayoutHorizontal(): boolean {
        return this.layout === 'horizontal';
    }

    WishList: any;
    buyerId : number
    AddToCard: any;

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private quickview: QuickviewService,
        public currency: CurrencyService,
        public url: UrlService,
        public currentVehicle: CurrentVehicleService,
        private proxy: Proxy,
        private toastr: ToastrService,
        private authJWT: JwtAuthService,
        private router: Router,
        private Authen : AuthenticationService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes.product) {
        //     this.featuredAttributes = this.product.attributes.filter(x => x.featured);
        // }
    }

    ngOnInit(): void {
        this.Authen.onAuthentication.subscribe(result =>{
            if(result){
            this.buyerId = this.authJWT.getId()
            }
        })
        if(this.authJWT.isAuthenticated()){
            this.buyerId = this.authJWT.getId()
        }
        this.currency.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.cd.markForCheck();
        });

        this.currentVehicle.value$
            .pipe(
                tap((vehicle) => (this.vehicle = vehicle)),
                skip(1),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                this.cd.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    showQuickview(): void {
        if (this.showingQuickview) {
            return;
        }

        this.showingQuickview = true;
        this.quickview.show(this.product).subscribe({
            complete: () => {
                this.showingQuickview = false;
                this.cd.markForCheck();
            },
        });
    }

    compatibility(): ProductCompatibilityResult {
        if (!this.vehicle) {
            return null;
        }

        // if (this.product.compatibility === 'all') {
        //     return 'all';
        // }
        // if (this.product.compatibility === 'unknown') {
        //     return 'unknown';
        // }
        // if (this.product.compatibility.includes(this.vehicle.id)) {
        //     return 'fit';
        // } else {
        //     return 'not-fit';
        // }
    }

    AddToWishList(product: any) {

        this.WishList = this.fb.group({
            WISH_LIST_ITEM_ID: [-1],
            PRODUCT_ID: [product.PRODUCT_ID],
            BUYER_ID: [this.buyerId],
            DESCRIPTION: ['11'],
        });

        if (this.authJWT.isAuthenticated()) {
            this.proxy
                .Edit_Wish_list_item(this.WishList.value)
                .subscribe((d) => {
                    if(d){
                        this.toastr.success('Your product is edit to wish list');
                    }

                });
        } else {
            this.toastr.info('Please Login');
            this.router.navigateByUrl('/account/login').then();
        }
    }

    AddToCardList(product: any) {
        
        this.AddToCard = this.fb.group({
            CARD_ITEM_ID: [-1],
            PRODUCT_ID: [product.PRODUCT_ID],
            BUYER_ID: [this.buyerId],
            QUANTITY: [1],
            DESCRIPTION: ['11'],
        });
        if (this.authJWT.isAuthenticated()) {
            this.proxy.Edit_Card_item(this.AddToCard.value).subscribe((d) => {
                if(d){
                this.proxy.RefreshDropCart.emit(d);
                this.toastr.success('Your product is edit to cart');
                }
            });
        } else {
            this.toastr.info('Please Login');
            this.router.navigateByUrl('/account/login').then();
        }
    }
}
