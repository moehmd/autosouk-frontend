import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Params_Get_Category_By_OWNER_ID, Params_Get_Product_By_CATEGORY_ID, Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { CategoryFilter } from '../../../../interfaces/filter';
import { UrlService } from '../../../../services/url.service';

@Component({
    selector: 'app-filter-category',
    templateUrl: './filter-category.component.html',
    styleUrls: ['./filter-category.component.scss'],
})
export class FilterCategoryComponent implements OnInit {
    // @Input() options: CategoryFilter;
    options: any[] = [];
    products : any[] = [];
    @HostBinding('class.filter-category') classFilterCategories = true;

    constructor(
        private proxy : Proxy
    ) { }

    ngOnInit() : void{
        this.FilteredCategory();
    }

    FilteredCategory(){
        var paramsCategory = new Params_Get_Category_By_OWNER_ID();
        paramsCategory.OWNER_ID = 1 ;
        this.proxy.Get_Category_By_OWNER_ID(paramsCategory).subscribe(d => {
            this.options = d;
        })
    }

    GetProductByCategory(category : number){
        //
        var ParamsProducts = new Params_Get_Product_By_CATEGORY_ID();
        ParamsProducts.CATEGORY_ID = category;

        this.proxy.Get_Product_By_CATEGORY_ID(ParamsProducts).subscribe(d =>{
            this.products = d;
        })
    }
}
