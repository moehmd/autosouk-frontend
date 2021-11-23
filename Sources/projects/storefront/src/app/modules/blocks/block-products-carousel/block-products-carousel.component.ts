import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges, OnDestroy, OnInit,
    Output,
    SimpleChanges, ViewChild,
} from '@angular/core';
import { ProductCardElement, ProductCardLayout } from '../../shared/components/product-card/product-card.component';
import { SectionHeaderGroup, SectionHeaderLink } from '../../shared/components/section-header/section-header.component';
import { OwlCarouselOConfig } from 'ngx-owl-carousel-o/lib/carousel/owl-carousel-o-config';
import { LanguageService } from '../../language/services/language.service';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { Params_Get_Product_By_Criteria_InList, Params_Get_Product_By_OWNER_ID, Proxy } from '../../../services/proxy.service';
import { Productt } from '../../../interfaces/product';

export type BlockProductsCarouselLayout = 'grid-4' | 'grid-4-sidebar' | 'grid-5' | 'grid-6' | 'horizontal' | 'horizontal-sidebar';

const carouselLayoutOptions = {
    'grid-4': {
        items: 4,
        responsive: {
            1110: { items: 4 },
            930: { items: 4, margin: 16 },
            690: { items: 3, margin: 16 },
            430: { items: 2, margin: 16 },
            0: { items: 1 },
        },
    },
    'grid-4-sidebar': {
        items: 4,
        responsive: {
            1040: { items: 4 },
            818: { items: 3 },
            638: { items: 3, margin: 16 },
            430: { items: 2, margin: 16 },
            0: { items: 1 },
        },
    },
    'grid-5': {
        items: 5,
        responsive: {
            1350: { items: 5 },
            1110: { items: 4 },
            930: { items: 4, margin: 16 },
            690: { items: 3, margin: 16 },
            430: { items: 2, margin: 16 },
            0: { items: 1 },
        },
    },
    'grid-6': {
        items: 6,
        margin: 16,
        responsive: {
            1350: { items: 6 },
            1110: { items: 5 },
            930: { items: 4, margin: 16 },
            690: { items: 3, margin: 16 },
            430: { items: 2, margin: 16 },
            0: { items: 1 },
        },
    },
    horizontal: {
        items: 4,
        responsive: {
            1350: { items: 4, margin: 14 },
            930: { items: 3, margin: 14 },
            690: { items: 2, margin: 14 },
            0: { items: 1, margin: 14 },
        },
    },
    'horizontal-sidebar': {
        items: 3,
        responsive: {
            1040: { items: 3, margin: 14 },
            638: { items: 2, margin: 14 },
            0: { items: 1, margin: 14 },
        },
    },
};

const productCardLayoutMap: { [layout: string]: ProductCardLayout } = {
    'grid-4': 'grid',
    'grid-4-sidebar': 'grid',
    'grid-5': 'grid',
    'grid-6': 'grid',
    horizontal: 'horizontal',
    'horizontal-sidebar': 'horizontal',
};

const productCardExcludeMap = {
    grid: ['features', 'list-buttons'],
    horizontal: ['actions', 'status-badge', 'features', 'buttons', 'meta'],
};

@Component({
    selector: 'app-block-products-carousel',
    templateUrl: './block-products-carousel.component.html',
    styleUrls: ['./block-products-carousel.component.scss'],
})
export class BlockProductsCarouselComponent implements OnChanges, OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    allProducts: any;
    showCarousel = true;

    private _params = new Params_Get_Product_By_Criteria_InList();

    carouselOptions: Partial<OwlCarouselOConfig>;

    columns: any[] = [];

    @Input() products = [];

    @Input() blockTitle: string;

    @Input() @HostBinding('attr.data-layout') layout: BlockProductsCarouselLayout = 'grid-4';

    @Input() rows = 1;

    @Input() groups: SectionHeaderGroup[] = [];

    @Input() currentGroup: SectionHeaderGroup;

    @Input() links: SectionHeaderLink[] = [];

    @Input() loading = false;

    @Output() changeGroup: EventEmitter<SectionHeaderGroup> = new EventEmitter<SectionHeaderGroup>();

    @HostBinding('class.block') classBlock = true;

    @HostBinding('class.block-products-carousel') classBlockProductsCarousel = true;

    @ViewChild(CarouselComponent) carousel: CarouselComponent;

    get productCardLayout(): ProductCardLayout {
        return productCardLayoutMap[this.layout];
    }

    get productCardExclude(): ProductCardElement[] {
        return productCardExcludeMap[this.productCardLayout];
    }

    constructor(
        private language: LanguageService,
        private cd: ChangeDetectorRef,
        private proxy: Proxy
    ) { }

    public moveNext() {
        //this.GetLatestProducts(1)
        this.carousel.next();
    }
    public movePrev() {
        //this.GetLatestProducts(-1)
        this.carousel.prev();
    }
    GetLatestProducts(addition?: number) {
        if (addition && this._params.START_ROW >= 0 && this._params.END_ROW >= 6 && this.columns.length == 6) {
            this._params.START_ROW += addition;
            this._params.END_ROW += addition;
            
        } else {
            this._params.START_ROW = 0;
            this._params.END_ROW = 6;
        }
        this._params.OWNER_ID = 1;
        this._params.AVAILIBILTY_STATUS = "Available"
        this.proxy.Get_Product_By_Criteria_InList_Adv(this._params).subscribe((data: any) => {
            this.columns = data;
            //console.log("---------------------> " + this.columns);
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        //const properties = Object.keys(changes);

        // if (properties.includes('products') || properties.includes('row')) {
        //     this.columns = [];

        //     if (this.products && this.rows > 0) {
        //         const products = this.products.slice();

        //         while (products.length > 0) {
        //             this.columns.push(products.splice(0, this.rows));
        //         }
        //     }
        // }

        //if (changes.products) {
        // Well, this is just another hack to get owl-carousel-o to work as expected
        setTimeout(() => {
            this.initOptions();

            this.showCarousel = false;
            this.cd.detectChanges();
            this.showCarousel = true;
        }, 0);
        //}

        //if (changes.layout) {
        this.initOptions();
        //}
    }

    ngOnInit(): void {
        // Since ngx-owl-carousel-o cannot re-initialize itself, we will do it manually when the direction changes.
        this.language.directionChange$.pipe(
            switchMap(() => timer(250)),
            takeUntil(this.destroy$),
        ).subscribe(() => {
            this.initOptions();
            this.showCarousel = false;
            this.cd.detectChanges();
            this.showCarousel = true;
        });
        this.GetLatestProducts();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initOptions(): void {
        this.carouselOptions = Object.assign({
            dots: false,
            margin: 20,
            loop: true,
            rtl: this.language.isRTL(),
        }, carouselLayoutOptions[this.layout]);
    }
}
