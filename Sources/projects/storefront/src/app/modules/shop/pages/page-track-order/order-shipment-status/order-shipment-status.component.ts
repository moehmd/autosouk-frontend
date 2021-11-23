import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'projects/storefront/src/app/services/common.service';
import { Subscription } from 'rxjs';
import { Params_takeLookOnTracking, Proxy, Tracking } from '../../../../../services/proxy.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-shipment-status',
  templateUrl: './order-shipment-status.component.html',
  styleUrls: ['./order-shipment-status.component.scss']
})
export class OrderShipmentStatusComponent implements OnInit, OnDestroy {
    Get_Tracking_By_BUYER_ID_Subscription = new Subscription();
    searchModel : Params_takeLookOnTracking = new Params_takeLookOnTracking();
        orderItemSerialNb : string;
        data: Tracking[] = [];
  constructor(private proxy : Proxy, private CmSvc : CommonService, private router:ActivatedRoute) { }

  ngOnInit(): void {
      this.router.params.subscribe(params => {
          this.orderItemSerialNb = params['orderItemSerialNb'];
      })

      this.fetchData();
  }
 fetchData() {
        this.searchModel.SerialNb = this.orderItemSerialNb;
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
                    this.data.push(element);
                });
            }
        });
    }
  ngOnDestroy() {
    this.Get_Tracking_By_BUYER_ID_Subscription.unsubscribe();
  }

}
