import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { Product, Productt } from '../../../../interfaces/product';
import { QuickviewService } from '../../../../services/quickview.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { filter, finalize, switchMap, takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../../services/cart.service';
import { NavigationStart, Router } from '@angular/router';
import {
    Params_Get_Currency_rate_By_STORE_ID,
    Proxy,
} from 'projects/storefront/src/app/services/proxy.service';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';

@Component({
    selector: 'app-quickview',
    templateUrl: './quickview.component.html',
    styleUrls: ['./quickview.component.scss'],
})
export class QuickviewComponent implements OnDestroy, AfterViewInit {
    private destroy$: Subject<void> = new Subject();
    rateOfProduct: any[] = [];
    showGallery = false;

    product: any = null;

    form: FormGroup;

    addToCartInProgress = false;

    @ViewChild('modal') modal: ModalDirective;

    WishList: FormGroup;
    buyerId: number
    AddToCart: FormGroup;

    constructor(
        private fb: FormBuilder,
        private quickview: QuickviewService,
        private translate: TranslateService,
        private router: Router,
        public url: UrlService,
        private proxy: Proxy,
        private toastr: ToastrService,
        private jwtAuth : JwtAuthService,
        private Authen: AuthenticationService
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

    ngAfterViewInit(): void {
        //
        this.quickview.show$
            .pipe(
                switchMap((product) => {
                    this.modal.show();
                    this.product = product;
                    this.form = this.fb.group({
                        options: [{}],
                        quantity: [1, [Validators.required]],
                    });
                    this.WishList = this.fb.group({
                        WISH_LIST_ITEM_ID: [-1],
                        PRODUCT_ID: [this.product.PRODUCT_ID],
                        BUYER_ID: [this.buyerId],
                        DESCRIPTION: ['11'],
                    });

                    this.AddToCart = this.fb.group({
                        CARD_ITEM_ID: [-1],
                        PRODUCT_ID: [this.product.PRODUCT_ID],
                        BUYER_ID: [this.buyerId],
                        QUANTITY: [1, [Validators.required]],
                        DESCRIPTION: ['...'],
                    });
                    // We are waiting for when the content will be rendered.
                    // 150 = BACKDROP_TRANSITION_DURATION
                    this.getRateByStore();
                    return timer(150);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                // Show gallery only after content is rendered.
                this.showGallery = this.product !== null;
            });

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationStart),
                takeUntil(this.destroy$)
            )
            .subscribe(() => {
                if (this.modal && this.modal.isShown) {
                    this.modal.hide();
                }
            });

        this.modal.onHidden.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.product = null;
            this.showGallery = false;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }


    AddToWishList() {
        if(this.jwtAuth.isAuthenticated()){
            this.proxy.Edit_Wish_list_item(this.WishList.value).subscribe((d) => {

                this.toastr.success('Your product is edit to wish list');
                if (this.modal && this.modal.isShown) {
                    this.modal.hide();
                }
            });
        }else{
            this.toastr.info('Please Login');
            this.router.navigateByUrl('/account/login').then();
        }

    }

    AddToCardList() {
        if(this.jwtAuth.isAuthenticated()){
            this.addToCartInProgress = true;
            this.proxy.Edit_Card_item(this.AddToCart.value).subscribe((d) => {
                this.addToCartInProgress = false;
                this.proxy.RefreshDropCart.emit(d);
                this.toastr.success('Your product is edit to Card');
                if (this.modal && this.modal.isShown) {
                    this.modal.hide();
                }
            });
        }
        else{
            this.toastr.info('Please Login');
            this.router.navigateByUrl('/account/login').then();
        }
    }

    getRateByStore() {
        //
        var params: Params_Get_Currency_rate_By_STORE_ID =
            new Params_Get_Currency_rate_By_STORE_ID();
        params.STORE_ID = this.product.STORE_ID;
        this.proxy.Get_Currency_rate_By_STORE_ID(params).subscribe((d) => {
            this.rateOfProduct = d;
        });
    }
}
