import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ShopSidebarService } from '../../services/shop-sidebar.service';
import { PageShopService } from '../../services/page-shop.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShopApi } from '../../../../api/base';
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { UrlService } from '../../../../services/url.service';
import { Breadcrumb } from '../../../shared/components/block-header/block-header.component';
import { getCategoryPath } from '../../../../functions/utils';
import { ShopCategory } from '../../../../interfaces/category';
import { LanguageService } from '../../../language/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductsList } from '../../../../interfaces/list';
import { CurrentVehicleService } from '../../../../services/current-vehicle.service';
import { filterHandlers } from '../../filters/filter-handlers';
import { Params_GetFilteredProducts, Params_Get_Product_By_Criteria_InList, Product, Proxy } from 'projects/storefront/src/app/services/proxy.service';

export type PageShopLayout =
    'grid' |
    'grid-with-features' |
    'list' |
    'table';

export type PageShopGridLayout =
    'grid-3-sidebar' |
    'grid-4-sidebar' |
    'grid-4-full' |
    'grid-5-full' |
    'grid-6-full';

export type PageShopSidebarPosition = 'start' | 'end' | false;

export type PageShopOffCanvasSidebar = 'always' | 'mobile';

export interface PageShopData {
    layout: PageShopLayout;
    gridLayout: PageShopGridLayout;
    sidebarPosition: PageShopSidebarPosition;
    category: ShopCategory;
    productsList: ProductsList;
}

@Component({
    selector: 'app-page-shop',
    templateUrl: './page-shop.component.html',
    styleUrls: ['./page-shop.component.scss'],
    providers: [
        ShopSidebarService,
        PageShopService,
        CurrentVehicleService,
    ],
})
export class PageShopComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();

    layout: PageShopLayout = 'grid';

    public hasNoProducts : boolean = false;

    gridLayout: PageShopGridLayout = 'grid-4-sidebar';

    sidebarPosition: PageShopSidebarPosition = 'start';

    pageTitle$: Observable<string>;

    breadcrumbs$: Observable<Breadcrumb[]>;

    get offCanvasSidebar(): PageShopOffCanvasSidebar {
        return ['grid-4-full', 'grid-5-full', 'grid-6-full'].includes(this.gridLayout) ? 'always' : 'mobile';
    }

    get hasSidebar(): boolean {
        return this.sidebarPosition && ['grid-3-sidebar', 'grid-4-sidebar'].includes(this.gridLayout);
    }

    brandId : number;
    yearId : number;
    modelId : number;
    categoryId : number;
    productt: string =''
    filteredProducts : any[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private page: PageShopService,
        private shop: ShopApi,
        private location: Location,
        public url: UrlService,
        private language: LanguageService,
        private translate: TranslateService,
        private proxy : Proxy
    ) { }

    ngOnInit(): void {
  
        this.route.queryParams.subscribe((d)=>{
            this.brandId = d.brandId;
            this.modelId = d.modelId;
            this.yearId = d.yearId;
            this.categoryId = d.categoryId;
            this.productt = d.productt
        })
        // Filtered Products
        this.getFilteredProducts();

        const data$: Observable<PageShopData> = this.route.data as Observable<PageShopData>;

        const category$: Observable<ShopCategory> = data$.pipe(map(data => data.category));
        var pageHeader : BehaviorSubject<string> = new BehaviorSubject('Shop');


        this.pageTitle$ = pageHeader.asObservable()
        // category$.pipe(
        //     switchMap(category => category ? of(category.name) : this.translate.stream('HEADER_SHOP')),
        // );

        this.breadcrumbs$ = this.language.current$.pipe(
            switchMap(() => category$.pipe(
                map(category => [
                    {label: this.translate.instant('LINK_HOME'), url: this.url.home()},
                    {label: this.translate.instant('LINK_SHOP'), url: this.url.home()}
                ]),
            )),
        );

        this.route.data.subscribe((data: PageShopData) => {
            this.layout = data.layout;
            this.gridLayout = data.gridLayout;
            this.sidebarPosition = data.sidebarPosition;
        });

        this.route.data.pipe(
            switchMap((data: PageShopData) => merge(
                of(data.productsList),
                this.page.optionsChange$.pipe(
                    map(() => {
                        this.updateUrl();

                        const categorySlug = this.route.snapshot.params.categorySlug || this.route.snapshot.data.categorySlug || null;

                        return {
                            ...this.page.options,
                            filters: {
                                ...this.page.options.filters,
                                category: categorySlug,
                            },
                        };
                    }),
                    tap(() => this.page.isLoading = true),
                    switchMap(options => this.shop.getProductsList(options)),
                ),
            )),
            takeUntil(this.destroy$),
        ).subscribe(list => {
            //
            this.page.isLoading = false;
            this.page.setList(list);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getFilteredProducts(sort? : string){
        
        var productsParams = new Params_Get_Product_By_Criteria_InList();
        productsParams.BRAND_ID_LIST = [this.brandId]
        productsParams.YEAR_ID_LIST = [this.yearId];
        productsParams.MODEL_ID_LIST = [this.modelId];
        productsParams.CATEGORY_ID_LIST = [this.categoryId];
        productsParams.PRODUCT_NAME = this.productt;
        productsParams.AVAILIBILTY_STATUS = "Available";
        productsParams.pricingFlag = sort? sort : ''

        this.proxy.Get_Product_By_Criteria_InList_Adv(productsParams).subscribe(d =>{
            this.filteredProducts = d;
            if(d.length == 0){
                this.hasNoProducts = true;
            }
        })
    }


    private updateUrl(): void {
        const tree = this.router.parseUrl(this.router.url);
        tree.queryParams = this.getQueryParams();
        this.location.replaceState(tree.toString());
    }

    private getQueryParams(): Params {
        const params: Params = {};
        const options = this.page.options;
        const filterValues = options.filters;

        if ('page' in options && options.page !== this.page.defaultOptions.page) {
            params.page = options.page;
        }
        if ('limit' in options && options.limit !== this.page.defaultOptions.limit) {
            params.limit = options.limit;
        }
        if ('sort' in options && options.sort !== this.page.defaultOptions.sort) {
            params.sort = options.sort;
        }
        if ('filters' in options) {
            this.page.filters
                .map(filter => ({
                    filter,
                    handler: filterHandlers.find(x => x.type === filter.type),
                }))
                .filter(x => x.handler && filterValues[x.filter.slug])
                .forEach(({filter, handler}) => {
                    const value = handler.deserialize(filterValues[filter.slug]);

                    if (!handler.isDefaultValue(filter, value)) {
                        params[`filter_${filter.slug}`] = handler.serialize(value);
                    }
                });
        }

        return params;
    }
}
