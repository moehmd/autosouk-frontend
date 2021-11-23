import {
    Component,
    EventEmitter,
    forwardRef,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import {
    Brand,
    Category,
    Model,
    Params_Get_Brand_By_OWNER_ID,
    Params_Get_Category_By_OWNER_ID,
    Params_Get_Model_By_BRAND_ID,
    Params_Get_Year_By_OWNER_ID,
    Proxy,
    Year,
} from '../../../../services/proxy.service';

@Component({
    selector: 'app-vehicle-select',
    templateUrl: './vehicle-select.component.html',
    styleUrls: ['./vehicle-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => VehicleSelectComponent),
            multi: true,
        },
    ],
})
export class VehicleSelectComponent implements OnInit, OnDestroy {
    selectedYear: string = 'Select a Year';
    selectedBrand: string = 'Select a Brand';
    selectedModel: string = 'Select a Model';
    selectedCategory: string = 'Select a Category';
    selectValues: any[] = [];
    @Output() selectedYearEmitter = new EventEmitter<any>();
    @Output() selectedBrandEmitter = new EventEmitter<any>();
    @Output() selectedModelEmitter = new EventEmitter<any>();
    @Output() selectedCategoryEmitter = new EventEmitter<any>();

    CategoryList: Category[];
    _params_Get_Category_By_OWNER_ID = new Params_Get_Category_By_OWNER_ID();
    Get_Category_By_OWNER_ID_Subscription = new Subscription();

    YearList: Year[];
    _params_Get_Year_By_OWNER_ID = new Params_Get_Year_By_OWNER_ID();
    Get_Year_By_OWNER_ID_Subscription = new Subscription();

    ModelList: Model[];
    _params_Get_Model_By_BRAND_ID = new Params_Get_Model_By_BRAND_ID();
    Get_Model_By_BRAND_ID_Subscription = new Subscription();

    BrandList: Brand[];
    _params_Get_Brand_By_OWNER_ID = new Params_Get_Brand_By_OWNER_ID();
    Get_Brand_By_OWNER_ID_Subscription = new Subscription();

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private proxy: Proxy) {}

    ngOnInit(): void {
        this._params_Get_Category_By_OWNER_ID.OWNER_ID = 1;
        this.Get_Category_By_OWNER_ID_Subscription = this.proxy
            .Get_Category_By_OWNER_ID(this._params_Get_Category_By_OWNER_ID)
            .subscribe((result) => (this.CategoryList = result));

        this._params_Get_Year_By_OWNER_ID.OWNER_ID = 1;
        this.Get_Year_By_OWNER_ID_Subscription = this.proxy
            .Get_Year_By_OWNER_ID(this._params_Get_Year_By_OWNER_ID)
            .subscribe((result) => {
                this.YearList = result;
            });
        this._params_Get_Brand_By_OWNER_ID.OWNER_ID = 1;
        this.Get_Brand_By_OWNER_ID_Subscription = this.proxy
            .Get_Brand_By_OWNER_ID(this._params_Get_Brand_By_OWNER_ID)
            .subscribe((result) => (this.BrandList = result));
    }

    GetModelByBrand(selectedBrand: any) {
        
        // Event Emmiter
        this.selectedBrand = selectedBrand;
        this.selectedBrandEmitter.emit(this.selectedBrand);
        // Get Model By Brand
        this._params_Get_Model_By_BRAND_ID.BRAND_ID = selectedBrand;
        this.Get_Model_By_BRAND_ID_Subscription = this.proxy
            .Get_Model_By_BRAND_ID(this._params_Get_Model_By_BRAND_ID)
            .subscribe((result) => (this.ModelList = result));
        this.selectedModel = 'Select a Model';
        this.selectedYear = 'Select a Year';
    }

    SendSelectedValues($event) {
        
        this.selectedYear = $event;
        this.selectedYearEmitter.emit(this.selectedYear);
    }

    UpdateCategory($event) {
        
        this.selectedYear = $event;
        this.selectedCategoryEmitter.emit(this.selectedYear);
        this.selectedBrand = 'Select a Brand';
        this.selectedYear = 'Select a Year';
        this.selectedModel = 'Select a Model';
    }

    UpdateModel($event) {
        
        this.selectedModel = $event;
        this.selectedModelEmitter.emit(this.selectedModel);
        this.selectedYear = 'Select a Year';
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.Get_Category_By_OWNER_ID_Subscription.unsubscribe();
    }
}
