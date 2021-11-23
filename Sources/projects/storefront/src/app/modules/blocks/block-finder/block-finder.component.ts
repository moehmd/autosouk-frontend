import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Vehicle } from '../../../interfaces/vehicle';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import {
    Params_GetFilteredProducts,
    Proxy,
} from '../../../services/proxy.service';

@Component({
    selector: 'app-block-finder',
    templateUrl: './block-finder.component.html',
    styleUrls: ['./block-finder.component.scss'],
})
export class BlockFinderComponent {
    vehicleControl: FormControl = new FormControl(null);
    returnedFilteredProducts : any;
    get vehicle(): Vehicle {
        return this.vehicleControl.value;
    }

    @HostBinding('class.block') classBlock = true;

    @HostBinding('class.block-finder') classBlockFinder = true;

    receivedBrand: any;
    receivedYear: any;
    receivedModel: any;
    receivedCategory: any;

    constructor(
        private router: Router,
        private url: UrlService,
        private proxy: Proxy
    ) {}

    ReceivedBrand($event) {
        this.receivedBrand = $event;
    }

    ReceivedYear($event) {
        this.receivedYear = $event;
    }

    ReceivedModel($event) {
        this.receivedModel = $event;
    }

    ReceivedCategory($event) {
        
        this.receivedCategory = $event;
    }

    submit(): void {
         //
        // var filteredProducts = new Params_GetFilteredProducts();
        // filteredProducts.BrandId = this.receivedBrand;
        // filteredProducts.YearId = this.receivedYear;
        // filteredProducts.ModelId = this.receivedModel;
        // filteredProducts.CategoryId = this.receivedCategory;
        // this.proxy.GetFilteredProducts(filteredProducts).subscribe((data) => {
        //     console.log('---------------------->' + data);
        //     this.returnedFilteredProducts = data;
        // });
        
        this.router.navigate([this.url.allProducts()], {

            queryParams: {
                brandId: this.receivedBrand,
                yearId :this.receivedYear,
                modelId : this.receivedModel,
                categoryId : this.receivedCategory
            },
        }).then();
    }
}
