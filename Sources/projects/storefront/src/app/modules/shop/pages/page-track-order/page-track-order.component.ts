import {Component} from '@angular/core';
import {CommonService} from 'projects/storefront/src/app/services/common.service';
import {
    Params_takeLookOnTracking,
    Proxy,
    Tracking
} from 'projects/storefront/src/app/services/proxy.service';
import {Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({selector: 'app-page-track-order', templateUrl: './page-track-order.component.html', styleUrls: ['./page-track-order.component.scss']})
export class PageTrackOrderComponent {
    Get_Tracking_By_BUYER_ID_Subscription = new Subscription();
    searchModel : Params_takeLookOnTracking = new Params_takeLookOnTracking();
    orderItemSerialNb : string;
    data : Tracking[] = [];
    LoadingTracking : boolean = false

    constructor(private proxy : Proxy, private CmSvc : CommonService, private router: Router, private toater : ToastrService) {}

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.Get_Tracking_By_BUYER_ID_Subscription.unsubscribe();
    }

    fetchData() {
        this.LoadingTracking = true
        this.searchModel.SerialNb = this.orderItemSerialNb;
        if(this.searchModel.SerialNb == null){
            this.toater.error("Please fill the content.")
            this.LoadingTracking = false
            return
        }
        if(this.searchModel.SerialNb.charAt(0) == '#'){
            this.toater.error("Please remove the '#' from your order serial number.")
            this.LoadingTracking = false
            return
        }
        this.Get_Tracking_By_BUYER_ID_Subscription = this.proxy.takeLookOnTracking(this.searchModel).subscribe(result => {
            if (result != null) {
                result.forEach((element : any) => {
                    element.MyURL = this.CmSvc.APIUrl + '/Upload_Image?REL_ENTITY=[TBL_TRACKING]&REL_FIELD=TRACKING_IMAGE&REL_KEY=' + element.TRACKING_ID;
                    if (element.My_Uploaded_files != null) {
                        element.MyUploadedImages = [];
                        element.My_Uploaded_files.forEach(x => {
                            x.url = x.My_URL;
                            element.MyUploadedImages.push(x.My_URL);
                        });
                    }
                    this.LoadingTracking = false
                    this.router.navigate(['/shop/track-order/shipment-status/', this.orderItemSerialNb]);
                    this.data.push(element);
                });
            }
        });
    }

}
