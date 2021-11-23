import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-block-banners',
    templateUrl: './block-banners.component.html',
    styleUrls: ['./block-banners.component.scss'],
})
export class BlockBannersComponent {
    @HostBinding('class.block') classBlock = true;

    @HostBinding('class.block-banners') classBlockBanners = true;

    constructor(
        private router: Router
    ) { }

    goToSeller(){
        window.open("http://seller.autosouk.co/")
    }

    goToShop(){
        window.open("/shop/shop-grid-4-sidebar")

    }

}
