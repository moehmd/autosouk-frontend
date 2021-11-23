import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { Params_GetBestProducts, Params_GetTopRatedProducts, Params_Get_Product_By_OWNER_ID, Proxy } from '../../../services/proxy.service';

export interface BlockProductsColumnsItem {
    title: string;
    products: Product[];
}

@Component({
    selector: 'app-block-products-columns',
    templateUrl: './block-products-columns.component.html',
    styleUrls: ['./block-products-columns.component.scss'],
})
export class BlockProductsColumnsComponent implements OnInit{
    @Input() columns: BlockProductsColumnsItem[] = [];

    @HostBinding('class.block') classBlock = true;

    @HostBinding('class.block-products-columns') classBlockProductsColumns =
        true;

    topRatedProducts : any[] = [];
    bestProducts : any[] = [];

    constructor(private proxy : Proxy) {}

    ngOnInit(){
        this.getTopRatedProduct()
        this.getBestProducts()
    }

    getTopRatedProduct() {
        var params = new Params_GetTopRatedProducts();
        this.proxy.GetTopRatedProducts(params).subscribe((data) => {
            this.topRatedProducts = data;
        });
    }

    getBestProducts(){
        var params = new Params_GetBestProducts();
        this.proxy.GetBestProducts(params).subscribe(d =>{
            this.bestProducts = d;
        })
    }
}
