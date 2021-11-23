import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountApi } from '../../../../api/base';
import { merge, of, Subject } from 'rxjs';
import { OrdersList } from '../../../../interfaces/list';
import { distinctUntilChanged, mergeMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UrlService } from '../../../../services/url.service';
import { Order, Order_item, Params_Get_Order_item_By_Criteria_InList, Params_SendFeedback, Proxy, Review } from 'projects/storefront/src/app/services/proxy.service';
import { ToastrService } from 'ngx-toastr';
import { JwtAuthService } from 'projects/storefront/src/app/services/jwt-auth.service';
import { AuthenticationService } from 'projects/storefront/src/app/services/authentication.service';

@Component({
    selector: 'app-page-orders',
    templateUrl: './page-orders.component.html',
    styleUrls: ['./page-orders.component.scss'],
})
export class PageOrdersComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    currentPage: FormControl = new FormControl(1);
    list: OrdersList;
    OrderList: Order_item[] = [];
    email : string
    fullname : string
    RateNumber: number
    displayRate : boolean = true
    displayRefund : boolean = false
    buyerId : number
    obj : Order_item
    isRated = false

    constructor(
        private accountApi: AccountApi,
        public url: UrlService,
        private proxy: Proxy,
        private toastr : ToastrService,
        private auth : JwtAuthService,
        private Authen : AuthenticationService
    ) { }

    ngOnInit(): void {
        merge(
            of(this.currentPage.value),
            this.currentPage.valueChanges,
        ).pipe(
            distinctUntilChanged(),
            mergeMap(page => this.accountApi.getOrdersList({
                limit: 5,
                page,
            })),
            takeUntil(this.destroy$),
        ).subscribe(x => this.list = x);


        this.Authen.onAuthentication.subscribe(result =>{
            this.buyerId = this.auth.getId()
        })
        if(this.auth.isAuthenticated()){
            this.buyerId = this.auth.getId()
        }
        this.email = this.auth.getEmail()
        this.fullname = this.auth.getFullName()

        this.getAllOrderItemByBuyer();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getAllOrderItemByBuyer(){
        
        var params = new Params_Get_Order_item_By_Criteria_InList()
        params.BUYER_ID_LIST = [this.buyerId]

        this.proxy.Get_Order_item_By_Criteria_InList_Adv(params).subscribe(d=>{
            this.OrderList = d;
            this.OrderList.forEach(element => {
                
                if(element.My_Product.IS_REFUNDABLE == false || element.My_Status.STATUS_TYPE != "Delivered" || element.DISPLAY_REFUND == true){
                    element.refundable = false
                }else{
                    element.refundable = true
                }
            });
        })
    }

    refundOrder(order: Order_item){

        var params : Params_SendFeedback = new Params_SendFeedback()
        params.email = this.email
        params.fullName = this.fullname
        params.flag = "R"
        params.message = "Refund the order of serial number: " + order.SERIAL_NB + " of Product: " + order.My_Product.PRODUCT_NAME
        + " Delivered in: " + order.ENTRY_DATE + " Ordered in: " + order.ORDER_ITEM_DATE + " from buyer "+ order.My_Buyer.FIRST_NAME + " " + order.My_Buyer.LAST_NAME +
        " Phone Number "+ order.My_Buyer.PHONE_NB

        this.proxy.SendFeedback(params).subscribe(d => {
            this.toastr.info("The support team will call you in 48 hours about your refund order! ")
            order.DISPLAY_REFUND = true
            order.STATUS_ID = 12
            this.proxy.Edit_Order_item(order).subscribe(d=>{
                this.refresh()
            })
        })
    }

    refresh(): void {
        window.location.reload();
    }

    updateRating(order : Order_item){
        
        var review = new Review()
        review.REVIEW_ID = -1
        review.PRODUCT_ID = order.PRODUCT_ID
        review.RATE = this.RateNumber
        //review.IS_RATED = true
        // bass tenzed 3al order item => btekhod true ta mishen ma ye2der ya3mel marten review
        if(this.RateNumber == null){
            this.toastr.error("Please fill the content")
            return
        }
        if(this.RateNumber > 5){
            this.toastr.error("The rate number should be less then 5.")
            return
        }
        this.proxy.Edit_Review(review).subscribe(d => {
            this.toastr.success("Review edit succefully")
            //this.isRated = true
        })
    }
}
