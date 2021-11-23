import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { Params_Delete_Card_item, Params_Get_Card_item_By_BUYER_ID, Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartService } from '../../../../services/cart.service';
import { UrlService } from '../../../../services/url.service';

@Component({
    selector: 'app-dropcart',
    templateUrl: './dropcart.component.html',
    styleUrls: ['./dropcart.component.scss'],
})
export class DropcartComponent implements OnInit {
    @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

    @HostBinding('class.dropcart') classDropcart = true;

    listOfProduct : any[] = [];
    buyerId : number
    private onRefreshStatuses: EventEmitter<any> = new EventEmitter();

    constructor(
        public cart: CartService,
        public url: UrlService,
        private proxy : Proxy,
        private jwtAuth : JwtAuthService,
        private authen : AuthenticationService
    ) {

     }

    ngOnInit() : void {
        this.authen.onAuthentication.subscribe( result => {
            if(result){
                this.buyerId = this.jwtAuth.getId()
            }
        })
        if(this.jwtAuth.isAuthenticated()){
            this.buyerId = this.jwtAuth.getId()
        }
            this.handleRefreshStatuses().subscribe();
            this.proxy.RefreshDropCart.subscribe(d =>{
                this.refreshStatuses();
            });
            this.refreshStatuses();

    }

    GetListProductsAddedToCardByBuyer(){
        //
        var params = new Params_Get_Card_item_By_BUYER_ID();
        params.BUYER_ID = this.buyerId;

        this.proxy.Get_Card_item_By_BUYER_ID_Adv(params).subscribe((d : any) =>{
            this.listOfProduct = d;

        });
    }

    removeProductFromWishList(item : any){
        //
        var params = new Params_Delete_Card_item();
        params.CARD_ITEM_ID = item.CARD_ITEM_ID;
        this.proxy.Delete_Card_item(params).subscribe(d => {
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
      }
}
