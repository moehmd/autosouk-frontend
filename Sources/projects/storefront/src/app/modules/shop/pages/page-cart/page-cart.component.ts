import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../../../services/cart.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import {
    Card_item,
    Params_Delete_Card_item,
    Params_Get_Card_item_By_BUYER_ID,
    Params_Get_Shipment_By_OWNER_ID,
    Params_makeProcedToCkeckout,
    Proxy,
    Shipment,
} from 'projects/storefront/src/app/services/proxy.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';

@Component({
    selector: 'app-page-cart',
    templateUrl: './page-cart.component.html',
    styleUrls: ['./page-cart.component.scss'],
})
export class PageCartComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject();
    listOfProduct: any;
    OldCardItem: any;
    public shipments: Shipment[] = [];
    private onRefreshStatuses: EventEmitter<any> = new EventEmitter();
    items: CartItem[] = [];
    quantityControl: any;
    AddToCart: FormGroup;
    updating = false;
    buyerId : number

    constructor(
        public cart: CartService,
        public url: UrlService,
        private proxy: Proxy,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private router: Router,
        private JwtAuth : JwtAuthService,
        private Authen : AuthenticationService
    ) {}

    ngOnInit(): void {
        this.Authen.onAuthentication.subscribe(result =>{
            if(result){
                this.buyerId = this.JwtAuth.getId()
            }
        })
        if(this.JwtAuth.isAuthenticated()){
            this.buyerId = this.JwtAuth.getId()
        }
        this.handleRefreshStatuses().subscribe();
        this.refreshStatuses();
        this.getAllShipments();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    GetListProductsAddedToCardByBuyer() {
        //
        var params = new Params_Get_Card_item_By_BUYER_ID();
        params.BUYER_ID = this.buyerId;

        this.proxy.Get_Card_item_By_BUYER_ID_Adv(params).subscribe((d: any) => {
            this.listOfProduct = d;
        });
    }

    removeProductFromWishList(item: any) {
        var params = new Params_Delete_Card_item();
        params.CARD_ITEM_ID = item.CARD_ITEM_ID;
        this.proxy.Delete_Card_item(params).subscribe((d) => {
            this.refreshStatuses();
        });
    }

    public refreshStatuses() {
        this.onRefreshStatuses.emit();
    }

    public handleRefreshStatuses(): Observable<any> {
        return this.onRefreshStatuses.pipe(
            switchMap(() => {
                var params = new Params_Get_Card_item_By_BUYER_ID();
                params.BUYER_ID = this.buyerId;
                return this.proxy.Get_Card_item_By_BUYER_ID_Adv(params);
            }),
            switchMap((card) => {
                this.setStatuses(card);
                return of(true);
            })
        );
    }

    private setStatuses(card: any) {
        this.listOfProduct = card;
        this.OldCardItem = [...this.listOfProduct]
    }
    getAllShipments() {
        var params = new Params_Get_Shipment_By_OWNER_ID();
        params.OWNER_ID = 1;
        this.proxy.Get_Shipment_By_OWNER_ID(params).subscribe((d) => {
            this.shipments = d;
        });
    }
    // update(): void {
    //     const entries = [];

    //     for (let i = 0; i < this.items.length; i++) {
    //         const item = this.items[i];
    //         const quantityControl = this.quantityControls[i];

    //         if (item.quantity !== quantityControl.value) {
    //             entries.push({
    //                 item,
    //                 quantity: quantityControl.value,
    //             });
    //         }
    //     }

    //     if (entries.length <= 0) {
    //         return;
    //     }

    //     this.updating = true;
    //     this.cart.update(entries).pipe(takeUntil(this.destroy$)).subscribe({
    //         complete: () => this.updating = false,
    //     });
    // }

    needUpdate(): void {
        
        this.updating = true
        let NewArrayCardItem: Card_item[] = [];
        // this.OldCardItem.forEach((element, index) => {
        //     if (element.QUANTITY != this.listOfProduct[index].QUANTITY) {
        //         NewArrayCardItem.push(element);
        //     }
        // });
        if(this.OldCardItem.length > 0){
            var params: Params_makeProcedToCkeckout =
            new Params_makeProcedToCkeckout();
            params.CardItems = this.OldCardItem;
            this.proxy.makeProcedToCkeckout(params).subscribe((d) => {
            if ((d = true)) {
                this.updating = false
                this.router.navigateByUrl('/shop/checkout').then();
            }
        });
        }else{
            this.updating = false
            this.router.navigateByUrl('/shop/checkout').then();
        }

    }

    // UpdateCardList(Card: any) {
    //     this.proxy.Edit_Card_item(Card).subscribe((d) => {
    //         this.toastr.success('Your product is edit to Card');
    //     });
    // }
}
