import { Component, EventEmitter, OnInit } from '@angular/core';
import { WishlistService } from '../../../../services/wishlist.service';
import { UrlService } from '../../../../services/url.service';
import { Params_Delete_Wish_list_item, Params_Get_Wish_list_item_By_BUYER_ID, Params_Get_Wish_list_item_By_OWNER_ID, Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';

@Component({
    selector: 'app-page-wishlist',
    templateUrl: './page-wishlist.component.html',
    styleUrls: ['./page-wishlist.component.scss'],
})
export class PageWishlistComponent implements OnInit {
    listOfProduct : any[] = [];
    private onRefreshStatuses: EventEmitter<any> = new EventEmitter();
    AddToCard : FormGroup
    buyerId : number
    CardInProgress = false
    DeleteInProgress = false

    constructor(
        private fb: FormBuilder,
        public wishlist: WishlistService,
        public url: UrlService,
        private proxy : Proxy,
        private toastr : ToastrService,
        private jwtAuth : JwtAuthService,
        private Authen: AuthenticationService
    ) { }

    ngOnInit(): void {

        this.Authen.onAuthentication.subscribe(result =>{
            if(result){
                this.buyerId = this.jwtAuth.getId()
            }
        })
        if(this.jwtAuth.isAuthenticated()){
            this.buyerId = this.jwtAuth.getId()
        }
        this.handleRefreshStatuses().subscribe();
        this.refreshStatuses();

    }

    GetListProductsWishListByBuyer(){
        var params = new Params_Get_Wish_list_item_By_BUYER_ID();
        params.BUYER_ID = this.buyerId;

        this.proxy.Get_Wish_list_item_By_BUYER_ID_Adv(params).subscribe((d : any) =>{
            //console.log("-----------------> " + d)
            this.listOfProduct = d;

        });
    }

    removeProductFromWishList(item : any){
        this.DeleteInProgress = true
        var params = new Params_Delete_Wish_list_item();
        params.WISH_LIST_ITEM_ID = item.WISH_LIST_ITEM_ID;

        this.proxy.Delete_Wish_list_item(params).subscribe(d => {
            this.refreshStatuses();
            this.DeleteInProgress = false
        });

    }

    public refreshStatuses() {
        this.onRefreshStatuses.emit();
      }

      public handleRefreshStatuses(): Observable<any> {
          //
        return this.onRefreshStatuses.pipe(
          switchMap(() => {
            var params = new Params_Get_Wish_list_item_By_BUYER_ID();
            params.BUYER_ID = this.buyerId;
            return this.proxy.Get_Wish_list_item_By_BUYER_ID_Adv(params);
          }),
          switchMap((wishList) => {
            this.setStatuses(wishList);
            return of(true);
          })
        );
      }

      private setStatuses(wishlist: any) {
        this.listOfProduct = wishlist;
      }



      AddToCardList(product : any){
          this.CardInProgress = true
        this.AddToCard = this.fb.group({
            CARD_ITEM_ID : [-1],
            PRODUCT_ID : [product.PRODUCT_ID],
            BUYER_ID : [this.buyerId],
            QUANTITY : [1],
            DESCRIPTION : ["11"]
          })

        this.proxy.Edit_Card_item(this.AddToCard.value).subscribe(d => {
            if(d){
                this.CardInProgress = false
                this.proxy.RefreshDropCart.emit(d);
                this.toastr.success("Your product is edit to wish list");
            }
        })

        this.removeProductFromWishList(product);
    }
}
