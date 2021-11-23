import { CustomFields } from './custom-fields';
import { Brand } from './brand';
import { Category, ShopCategory } from './category';
import { Model, Store, Uploaded_file, Vehicle, Year } from '../services/proxy.service';


export interface BaseAttributeGroup {
    name: string;
    slug: string;
    customFields?: CustomFields;
}

export type ProductAttributeGroup = BaseAttributeGroup & { attributes: ProductAttribute[]; };
export type ProductTypeAttributeGroup = BaseAttributeGroup & { attributes: string[]; };

export interface ProductType {
    name: string;
    slug: string;
    attributeGroups: ProductTypeAttributeGroup[];
    customFields?: CustomFields;
}

export interface ProductAttributeValue {
    name: string;
    slug: string;
    customFields?: CustomFields;
}

export interface ProductAttribute {
    name: string;
    slug: string;
    featured: boolean;
    values: ProductAttributeValue[];
    customFields?: CustomFields;
}

export interface ProductOptionValueBase {
    name: string;
    slug: string;
    customFields?: CustomFields;
}

export interface ProductOptionValueColor extends ProductOptionValueBase {
    color: string;
}

export interface ProductOptionBase {
    type: string;
    name: string;
    slug: string;
    values: ProductOptionValueBase[];
    customFields?: CustomFields;
}

export interface ProductOptionDefault extends ProductOptionBase {
    type: 'default';
}

export interface ProductOptionColor extends ProductOptionBase {
    type: 'color';
    values: ProductOptionValueColor[];
}

export type ProductOption = ProductOptionDefault | ProductOptionColor;

export type ProductStock = 'in-stock' | 'out-of-stock' | 'on-backorder';

export type ProductCompatibilityResult = 'all' | 'fit' | 'not-fit' | 'unknown';

export interface Product {
    id: number;
    name: string;
    /**
     * A short product description without HTML tags.
     */
    excerpt: string;
    description: string;
    slug: string;
    sku?: string;
    partNumber: string;
    stock: ProductStock;
    price: number;
    compareAtPrice: number|null;
    images?: string[];
    badges?: string[];
    rating?: number;
    reviews?: number;
    availability?: string;
    /**
     * 'all'     - Compatible with all vehicles.
     * 'unknown' - No compatibility information. Part may not fit the specified vehicle.
     * number[]  - An array of vehicle identifiers with which this part is compatible.
     */
    compatibility: 'all' | 'unknown' | number[];
    brand?: Brand|null;
    tags?: string[];
    type: ProductType;
    categories?: ShopCategory[];
    attributes: ProductAttribute[];
    options: ProductOption[];
    customFields?: CustomFields;
}

export interface Productt
{
    badges?: string[];
PRODUCT_ID?: number;
VEHICLE_ID?: number;
CATEGORY_ID?: number;
PRODUCT_NAME: string;
PRODUCT_SERIAL_NB?: number;
BRAND_ID?: number;
YEAR_ID?: number;
MODEL_ID?: number;
PRODUCT_DESCRIPTION: string;
STORE_ID?: number;
WEIGHT?: number;
PRODUCT_CONDITION: string;
PRODUCT_PRICE?: number;
DISCOUNTED_PRICE?: number;
IS_REFUNDABLE?: boolean;
IS_AVAILABLE?: boolean;
AVERAGE_RATE_REVIEW?: number;
ENTRY_USER_ID?: number;
ENTRY_DATE: string;
OWNER_ID?: number;
My_Vehicle: Vehicle;
My_Category: Category;
My_Brand: Brand;
My_Year: Year;
My_Model: Model;
My_Store: Store;
My_Uploaded_files: Uploaded_file[];
}
