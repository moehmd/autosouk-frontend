import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable()
export class Proxy {
    APIBaseUrl = '';
    url = '';
    constructor(public api: HttpClient, private common: CommonService) {
        this.APIBaseUrl = common.APIUrl;
    }
    Get_Order_By_OWNER_ID(
        i_Params_Get_Order_By_OWNER_ID: Params_Get_Order_By_OWNER_ID
    ): Observable<Order[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Order_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Order_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Order_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    VerifyAccount(
        i_Params_VerifyAccount: Params_VerifyAccount
    ): Observable<User> {
        this.url =
            this.APIBaseUrl + '/VerifyAccount?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_VerifyAccount>(
                this.url,
                JSON.stringify(i_Params_VerifyAccount),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    ActivateAccount(
        i_Params_ActivateAccount: Params_ActivateAccount
    ): Observable<User> {
        this.url =
            this.APIBaseUrl + '/ActivateAccount?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_ActivateAccount>(
                this.url,
                JSON.stringify(i_Params_ActivateAccount),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Admin(i_Admin: Admin): Observable<Admin> {
        this.url = this.APIBaseUrl + '/Edit_Admin?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Admin>(this.url, JSON.stringify(i_Admin), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Admin;
                })
            );
    }
    Delete_Admin(
        i_Params_Delete_Admin: Params_Delete_Admin
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Admin?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(this.url, JSON.stringify(i_Params_Delete_Admin), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Admin_By_OWNER_ID(
        i_Params_Get_Admin_By_OWNER_ID: Params_Get_Admin_By_OWNER_ID
    ): Observable<Admin[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Admin_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Admin_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Admin_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Store_By_STORE_ID(
        i_Params_Get_Store_By_STORE_ID: Params_Get_Store_By_STORE_ID
    ): Observable<Store> {
        this.url =
            this.APIBaseUrl +
            '/Get_Store_By_STORE_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Store_By_STORE_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Store_By_STORE_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Store_By_SELLER_ID(
        i_Params_Get_Store_By_SELLER_ID: Params_Get_Store_By_SELLER_ID
    ): Observable<Store[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Store_By_SELLER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Store_By_SELLER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Store_By_SELLER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Seller_By_OWNER_ID(
        i_Params_Get_Seller_By_OWNER_ID: Params_Get_Seller_By_OWNER_ID
    ): Observable<Seller[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Seller_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Seller_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Seller_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_User_By_OWNER_ID(
        i_Params_Get_User_By_OWNER_ID: Params_Get_User_By_OWNER_ID
    ): Observable<User[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_User_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_User_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_User_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    GetFilteredProducts(
        i_Params_GetFilteredProducts: Params_GetFilteredProducts
    ): Observable<Product[]> {
        this.url =
            this.APIBaseUrl +
            '/GetFilteredProducts?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetFilteredProducts>(
                this.url,
                JSON.stringify(i_Params_GetFilteredProducts),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    GetFilteredOrderItems(
        i_Params_GetFilteredOrderItems: Params_GetFilteredOrderItems
    ): Observable<Order_item[]> {
        this.url =
            this.APIBaseUrl +
            '/GetFilteredOrderItems?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetFilteredOrderItems>(
                this.url,
                JSON.stringify(i_Params_GetFilteredOrderItems),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Category_By_OWNER_ID(
        i_Params_Get_Category_By_OWNER_ID: Params_Get_Category_By_OWNER_ID
    ): Observable<Category[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Category_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Category_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Category_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Product_By_OWNER_ID(
        i_Params_Get_Product_By_OWNER_ID: Params_Get_Product_By_OWNER_ID
    ): Observable<Product[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Product_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Product_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Product_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Brand_By_OWNER_ID(
        i_Params_Get_Brand_By_OWNER_ID: Params_Get_Brand_By_OWNER_ID
    ): Observable<Brand[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Brand_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Brand_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Brand_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Year_By_OWNER_ID(
        i_Params_Get_Year_By_OWNER_ID: Params_Get_Year_By_OWNER_ID
    ): Observable<Year[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Year_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Year_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Year_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Model_By_OWNER_ID(
        i_Params_Get_Model_By_OWNER_ID: Params_Get_Model_By_OWNER_ID
    ): Observable<Model[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Model_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Model_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Model_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Product_By_Where_Adv(
        i_Params_Get_Product_By_Where: Params_Get_Product_By_Where
    ): Observable<Product[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Product_By_Where_Adv?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Product_By_Where_Adv>(
                this.url,
                JSON.stringify(i_Params_Get_Product_By_Where),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Product_By_STORE_ID(
        i_Params_Get_Product_By_STORE_ID: Params_Get_Product_By_STORE_ID
    ): Observable<Product[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Product_By_STORE_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Product_By_STORE_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Product_By_STORE_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Product_By_CATEGORY_ID(
        i_Params_Get_Product_By_CATEGORY_ID: Params_Get_Product_By_CATEGORY_ID
    ): Observable<Product[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Product_By_CATEGORY_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Product_By_CATEGORY_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Product_By_CATEGORY_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Buyer(i_Buyer: Buyer): Observable<Buyer> {
        this.url = this.APIBaseUrl + '/Edit_Buyer?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Buyer>(this.url, JSON.stringify(i_Buyer), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Buyer;
                })
            );
    }
    Edit_Year(i_Year: Year): Observable<Year> {
        this.url = this.APIBaseUrl + '/Edit_Year?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Year>(this.url, JSON.stringify(i_Year), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Year;
                })
            );
    }
    makeProcedToCkeckout(i_Params_makeProcedToCkeckout: Params_makeProcedToCkeckout): Observable<boolean> {
        this.url = this.APIBaseUrl + '/makeProcedToCkeckout?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'ticket': this.common.ticket });
        const options = { headers: headers };
        return this.api.post<Result_makeProcedToCkeckout>(this.url, JSON.stringify(i_Params_makeProcedToCkeckout), options)
            .pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Result; }));
    }
    Delete_Year(i_Params_Delete_Year: Params_Delete_Year): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Year?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(this.url, JSON.stringify(i_Params_Delete_Year), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Edit_Model(i_Model: Model): Observable<Model> {
        this.url = this.APIBaseUrl + '/Edit_Model?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Model>(this.url, JSON.stringify(i_Model), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Model;
                })
            );
    }
    Delete_Model(
        i_Params_Delete_Model: Params_Delete_Model
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Model?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(this.url, JSON.stringify(i_Params_Delete_Model), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Delete_Brand(
        i_Params_Delete_Brand: Params_Delete_Brand
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Brand?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(this.url, JSON.stringify(i_Params_Delete_Brand), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Delete_Category(
        i_Params_Delete_Category: Params_Delete_Category
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Category?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Category),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Edit_Seller(i_Seller: Seller): Observable<Seller> {
        this.url =
            this.APIBaseUrl + '/Edit_Seller?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Seller>(
                this.url,
                JSON.stringify(i_Seller),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Seller;
                })
            );
    }
    Edit_Category(i_Category: Category): Observable<Category> {
        this.url =
            this.APIBaseUrl + '/Edit_Category?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Category>(
                this.url,
                JSON.stringify(i_Category),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Category;
                })
            );
    }
    Edit_Brand(i_Brand: Brand): Observable<Brand> {
        this.url = this.APIBaseUrl + '/Edit_Brand?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Brand>(this.url, JSON.stringify(i_Brand), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Brand;
                })
            );
    }
    Edit_Status(i_Status: Status): Observable<Status> {
        this.url =
            this.APIBaseUrl + '/Edit_Status?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Status>(
                this.url,
                JSON.stringify(i_Status),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Status;
                })
            );
    }
    Delete_Status(
        i_Params_Delete_Status: Params_Delete_Status
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Status?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Status),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Edit_Shipment(i_Shipment: Shipment): Observable<Shipment> {
        this.url =
            this.APIBaseUrl + '/Edit_Shipment?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Shipment>(
                this.url,
                JSON.stringify(i_Shipment),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Shipment;
                })
            );
    }
    Delete_Shipment(
        i_Params_Delete_Shipment: Params_Delete_Shipment
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Shipment?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Shipment),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Shipment_By_OWNER_ID(
        i_Params_Get_Shipment_By_OWNER_ID: Params_Get_Shipment_By_OWNER_ID
    ): Observable<Shipment[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Shipment_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Shipment_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Shipment_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Store(i_Store: Store): Observable<Store> {
        this.url = this.APIBaseUrl + '/Edit_Store?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Store>(this.url, JSON.stringify(i_Store), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Store;
                })
            );
    }
    Delete_Store(
        i_Params_Delete_Store: Params_Delete_Store
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Store?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(this.url, JSON.stringify(i_Params_Delete_Store), options)
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Store_By_OWNER_ID(
        i_Params_Get_Store_By_OWNER_ID: Params_Get_Store_By_OWNER_ID
    ): Observable<Store[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Store_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Store_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Store_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Vehicle_By_OWNER_ID(
        i_Params_Get_Vehicle_By_OWNER_ID: Params_Get_Vehicle_By_OWNER_ID
    ): Observable<Vehicle[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Vehicle_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Vehicle_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Vehicle_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Store_By_Where(
        i_Params_Get_Store_By_Where: Params_Get_Store_By_Where
    ): Observable<Store[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Store_By_Where?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Store_By_Where>(
                this.url,
                JSON.stringify(i_Params_Get_Store_By_Where),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Product(i_Product: Product): Observable<Product> {
        this.url =
            this.APIBaseUrl + '/Edit_Product?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Product>(
                this.url,
                JSON.stringify(i_Product),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Product;
                })
            );
    }
    Delete_Product(
        i_Params_Delete_Product: Params_Delete_Product
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Product?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Product),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Status_By_OWNER_ID(
        i_Params_Get_Status_By_OWNER_ID: Params_Get_Status_By_OWNER_ID
    ): Observable<Status[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Status_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Status_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Status_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Order_item(i_Order_item: Order_item): Observable<Order_item> {
        this.url =
            this.APIBaseUrl + '/Edit_Order_item?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Order_item>(
                this.url,
                JSON.stringify(i_Order_item),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Order_item;
                })
            );
    }
    Delete_Order_item(
        i_Params_Delete_Order_item: Params_Delete_Order_item
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Order_item?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Order_item),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Order_item_By_STORE_ID(
        i_Params_Get_Order_item_By_STORE_ID: Params_Get_Order_item_By_STORE_ID
    ): Observable<Order_item[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Order_item_By_STORE_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Order_item_By_STORE_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Order_item_By_STORE_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Order_item_By_Where_Adv(
        i_Params_Get_Order_item_By_Where: Params_Get_Order_item_By_Where
    ): Observable<Order_item[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Order_item_By_Where_Adv?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Order_item_By_Where_Adv>(
                this.url,
                JSON.stringify(i_Params_Get_Order_item_By_Where),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Currency_rate(
        i_Currency_rate: Currency_rate
    ): Observable<Currency_rate> {
        this.url =
            this.APIBaseUrl +
            '/Edit_Currency_rate?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Currency_rate>(
                this.url,
                JSON.stringify(i_Currency_rate),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Currency_rate;
                })
            );
    }
    Delete_Currency_rate(
        i_Params_Delete_Currency_rate: Params_Delete_Currency_rate
    ): Observable<string> {
        this.url =
            this.APIBaseUrl +
            '/Delete_Currency_rate?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Currency_rate),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Currency_rate_By_STORE_ID(
        i_Params_Get_Currency_rate_By_STORE_ID: Params_Get_Currency_rate_By_STORE_ID
    ): Observable<Currency_rate[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Currency_rate_By_STORE_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Currency_rate_By_STORE_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Currency_rate_By_STORE_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Model_By_BRAND_ID(
        i_Params_Get_Model_By_BRAND_ID: Params_Get_Model_By_BRAND_ID
    ): Observable<Model[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Model_By_BRAND_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Model_By_BRAND_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Model_By_BRAND_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    GetBestProducts(
        i_Params_GetBestProducts: Params_GetBestProducts
    ): Observable<Product[]> {
        this.url =
            this.APIBaseUrl + '/GetBestProducts?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetBestProducts>(
                this.url,
                JSON.stringify(i_Params_GetBestProducts),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Wish_list_item_By_BUYER_ID_Adv(
        i_Params_Get_Wish_list_item_By_BUYER_ID: Params_Get_Wish_list_item_By_BUYER_ID
    ): Observable<Wish_list_item[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Wish_list_item_By_BUYER_ID_Adv?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Wish_list_item_By_BUYER_ID_Adv>(
                this.url,
                JSON.stringify(i_Params_Get_Wish_list_item_By_BUYER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Wish_list_item_By_OWNER_ID(
        i_Params_Get_Wish_list_item_By_OWNER_ID: Params_Get_Wish_list_item_By_OWNER_ID
    ): Observable<Wish_list_item[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Wish_list_item_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Wish_list_item_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Wish_list_item_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Wish_list_item(
        i_Wish_list_item: Wish_list_item
    ): Observable<Wish_list_item> {
        this.url =
            this.APIBaseUrl +
            '/Edit_Wish_list_item?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Wish_list_item>(
                this.url,
                JSON.stringify(i_Wish_list_item),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Wish_list_item;
                })
            );
    }
    Delete_Wish_list_item(
        i_Params_Delete_Wish_list_item: Params_Delete_Wish_list_item
    ): Observable<string> {
        this.url =
            this.APIBaseUrl +
            '/Delete_Wish_list_item?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Wish_list_item),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Order_item_By_Criteria_InList_Adv(
        i_Params_Get_Order_item_By_Criteria_InList: Params_Get_Order_item_By_Criteria_InList
    ): Observable<Order_item[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Order_item_By_Criteria_InList_Adv?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Order_item_By_Criteria_InList_Adv>(
                this.url,
                JSON.stringify(i_Params_Get_Order_item_By_Criteria_InList),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    GetTopRatedProducts(
        i_Params_GetTopRatedProducts: Params_GetTopRatedProducts
    ): Observable<Product[]> {
        this.url =
            this.APIBaseUrl +
            '/GetTopRatedProducts?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetTopRatedProducts>(
                this.url,
                JSON.stringify(i_Params_GetTopRatedProducts),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Card_item(i_Card_item: Card_item): Observable<Card_item> {
        this.url =
            this.APIBaseUrl + '/Edit_Card_item?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Card_item>(
                this.url,
                JSON.stringify(i_Card_item),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Card_item;
                })
            );
    }
    Delete_Card_item(
        i_Params_Delete_Card_item: Params_Delete_Card_item
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/Delete_Card_item?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Card_item),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Card_item_By_BUYER_ID_Adv(
        i_Params_Get_Card_item_By_BUYER_ID: Params_Get_Card_item_By_BUYER_ID
    ): Observable<Card_item[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Card_item_By_BUYER_ID_Adv?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Card_item_By_BUYER_ID_Adv>(
                this.url,
                JSON.stringify(i_Params_Get_Card_item_By_BUYER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Buyer_address(
        i_Buyer_address: Buyer_address
    ): Observable<Buyer_address> {
        this.url =
            this.APIBaseUrl +
            '/Edit_Buyer_address?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Buyer_address>(
                this.url,
                JSON.stringify(i_Buyer_address),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Buyer_address;
                })
            );
    }
    Delete_Buyer_address(
        i_Params_Delete_Buyer_address: Params_Delete_Buyer_address
    ): Observable<string> {
        this.url =
            this.APIBaseUrl +
            '/Delete_Buyer_address?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Buyer_address),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Get_Buyer_address_By_BUYER_ID(
        i_Params_Get_Buyer_address_By_BUYER_ID: Params_Get_Buyer_address_By_BUYER_ID
    ): Observable<Buyer_address[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Buyer_address_By_BUYER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Buyer_address_By_BUYER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Buyer_address_By_BUYER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Tracking(i_Tracking: Tracking): Observable<Tracking> {
        this.url =
            this.APIBaseUrl + '/Edit_Tracking?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Tracking>(
                this.url,
                JSON.stringify(i_Tracking),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Tracking;
                })
            );
    }
    Get_Product_By_Criteria_InList_Adv(
        i_Params_Get_Product_By_Criteria_InList: Params_Get_Product_By_Criteria_InList
    ): Observable<Product[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Product_By_Criteria_InList_Adv?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Product_By_Criteria_InList_Adv>(
                this.url,
                JSON.stringify(i_Params_Get_Product_By_Criteria_InList),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    GetTotalNumberOfOrderItems(
        i_Params_GetTotalNumberOfOrderItems: Params_GetTotalNumberOfOrderItems
    ): Observable<Order_item> {
        this.url =
            this.APIBaseUrl +
            '/GetTotalNumberOfOrderItems?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetTotalNumberOfOrderItems>(
                this.url,
                JSON.stringify(i_Params_GetTotalNumberOfOrderItems),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    GetTotalNumberOfProducts(
        i_Params_GetTotalNumberOfProducts: Params_GetTotalNumberOfProducts
    ): Observable<Product> {
        this.url =
            this.APIBaseUrl +
            '/GetTotalNumberOfProducts?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetTotalNumberOfProducts>(
                this.url,
                JSON.stringify(i_Params_GetTotalNumberOfProducts),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    GetWishListAndOrderItemCounts(
        i_Params_GetWishListAndOrderItemCounts: Params_GetWishListAndOrderItemCounts
    ): Observable<OrderItemsAndWishListItemsCount> {
        this.url =
            this.APIBaseUrl +
            '/GetWishListAndOrderItemCounts?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetWishListAndOrderItemCounts>(
                this.url,
                JSON.stringify(i_Params_GetWishListAndOrderItemCounts),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Notification_By_STORE_ID(
        i_Params_Get_Notification_By_STORE_ID: Params_Get_Notification_By_STORE_ID
    ): Observable<Notification[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Notification_By_STORE_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Notification_By_STORE_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Notification_By_STORE_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Notification(i_Notification: Notification): Observable<Notification> {
        this.url =
            this.APIBaseUrl + '/Edit_Notification?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Notification>(
                this.url,
                JSON.stringify(i_Notification),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Notification;
                })
            );
    }
    Delete_Notification(
        i_Params_Delete_Notification: Params_Delete_Notification
    ): Observable<string> {
        this.url =
            this.APIBaseUrl +
            '/Delete_Notification?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Notification),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Checkout_Buyer(
        i_Params_Checkout_Buyer: Params_Checkout_Buyer
    ): Observable<boolean> {
        this.url =
            this.APIBaseUrl + '/Checkout_Buyer?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Checkout_Buyer>(
                this.url,
                JSON.stringify(i_Params_Checkout_Buyer),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    AuthByFbAndGoogle(
        i_Params_AuthByFbAndGoogle: Params_AuthByFbAndGoogle
    ): Observable<string> {
        this.url =
            this.APIBaseUrl + '/AuthByFbAndGoogle?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_AuthByFbAndGoogle>(
                this.url,
                JSON.stringify(i_Params_AuthByFbAndGoogle),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result.Token;
                })
            );
    }
    StoreProfitInvoice(
        i_Params_StoreProfitInvoice: Params_StoreProfitInvoice
    ): Observable<StoreProfitInvoice> {
        this.url =
            this.APIBaseUrl +
            '/StoreProfitInvoice?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_StoreProfitInvoice>(
                this.url,
                JSON.stringify(i_Params_StoreProfitInvoice),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    PayOrderItemsToStore(
        i_Params_PayOrderItemsToStore: Params_PayOrderItemsToStore
    ): Observable<void> {
        this.url =
            this.APIBaseUrl +
            '/PayOrderItemsToStore?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_PayOrderItemsToStore>(
                this.url,
                JSON.stringify(i_Params_PayOrderItemsToStore),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                })
            );
    }
    GetStoreTotalProfit(
        i_Params_GetStoreTotalProfit: Params_GetStoreTotalProfit
    ): Observable<StoreProfit> {
        this.url =
            this.APIBaseUrl +
            '/GetStoreTotalProfit?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetStoreTotalProfit>(
                this.url,
                JSON.stringify(i_Params_GetStoreTotalProfit),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    takeLookOnTracking(
        i_Params_takeLookOnTracking: Params_takeLookOnTracking
    ): Observable<Tracking[]> {
        this.url =
            this.APIBaseUrl +
            '/takeLookOnTracking?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_takeLookOnTracking>(
                this.url,
                JSON.stringify(i_Params_takeLookOnTracking),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    GetStoresRate(
        i_Params_GetStoresRate: Params_GetStoresRate
    ): Observable<StoreRate[]> {
        this.url =
            this.APIBaseUrl + '/GetStoresRate?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_GetStoresRate>(
                this.url,
                JSON.stringify(i_Params_GetStoresRate),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Profit_By_OWNER_ID(
        i_Params_Get_Profit_By_OWNER_ID: Params_Get_Profit_By_OWNER_ID
    ): Observable<Profit[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Profit_By_OWNER_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Profit_By_OWNER_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Profit_By_OWNER_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Get_Profit_By_STORE_ID(
        i_Params_Get_Profit_By_STORE_ID: Params_Get_Profit_By_STORE_ID
    ): Observable<Profit[]> {
        this.url =
            this.APIBaseUrl +
            '/Get_Profit_By_STORE_ID?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Get_Profit_By_STORE_ID>(
                this.url,
                JSON.stringify(i_Params_Get_Profit_By_STORE_ID),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Result;
                })
            );
    }
    Edit_Profit(i_Profit: Profit): Observable<Profit> {
        this.url =
            this.APIBaseUrl + '/Edit_Profit?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Profit>(
                this.url,
                JSON.stringify(i_Profit),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Profit;
                })
            );
    }
    Edit_Review(i_Review: Review): Observable<Review> {
        this.url = this.APIBaseUrl + '/Edit_Review?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'ticket': this.common.ticket });
        const options = { headers: headers };
        return this.api.post<Result_Edit_Review>(this.url, JSON.stringify(i_Review), options)
            .pipe(map(response => { this.common.Handle_Exception(response.ExceptionMsg); return response.My_Review; }));
    }
    Edit_Uploaded_file(
        i_Uploaded_file: Uploaded_file
    ): Observable<Uploaded_file> {
        this.url =
            this.APIBaseUrl +
            '/Edit_Uploaded_file?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_Edit_Uploaded_file>(
                this.url,
                JSON.stringify(i_Uploaded_file),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.My_Uploaded_file;
                })
            );
    }
    Delete_Uploaded_file(
        i_Params_Delete_Uploaded_file: Params_Delete_Uploaded_file
    ): Observable<string> {
        this.url =
            this.APIBaseUrl +
            '/Delete_Uploaded_file?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(i_Params_Delete_Uploaded_file),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD(
        i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD: Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD
    ): Observable<string> {
        this.url =
            this.APIBaseUrl +
            '/Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD?Ticket=' +
            this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<any>(
                this.url,
                JSON.stringify(
                    i_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD
                ),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                    return response.ExceptionMsg;
                })
            );
    }
    SendFeedback(i_Params_SendFeedback: Params_SendFeedback): Observable<void> {
        this.url =
            this.APIBaseUrl + '/SendFeedback?Ticket=' + this.common.ticket;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ticket: this.common.ticket,
        });
        const options = { headers: headers };
        return this.api
            .post<Result_SendFeedback>(
                this.url,
                JSON.stringify(i_Params_SendFeedback),
                options
            )
            .pipe(
                map((response) => {
                    this.common.Handle_Exception(response.ExceptionMsg);
                })
            );
    }
    public RefreshDropCart: EventEmitter<any> = new EventEmitter();
}
export class Params_Get_Order_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Order {
    ORDER_ID?: number;
    ORDER_CODE_NB?: number;
    BUYER_ID?: number;
    TOTAL_NET?: number;
    TOTAL_AMOUNT?: number;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    DESCRIPTION: string;
    My_Buyer: Buyer;
    My_Order_Item: Order_item[];
}
export class Buyer {
    BUYER_ID?: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    PHONE_NB?: number;
    EMAIL: string;
    PASSWORD: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Buyer_address: Buyer_address[];
}
export class Review {
    REVIEW_ID?: number;
    PRODUCT_ID?: number;
    RATE?: number;
    IS_RATED?: boolean;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    DESCRIPTION: string;
    My_Product: Product;
}
export class Order_item {
    ORDER_ITEM_ID?: number;
    PRODUCT_ID?: number;
    STATUS_ID?: number;
    STORE_ID?: number;
    BUYER_ID?: number;
    BUYER_ADDRESS_ID?: number;
    SERIAL_NB: string;
    QUANTITY?: number;
    TOTAL_WEIGHT?: number;
    TOTAL_NET?: number;
    TOTAL_ITEM_PRICE: number;
    AVAILIBILTY_STATUS: string;
    DESCRIPTION: string;
    ENTRY_USER_ID?: number;
    IS_PAID_TO_STORE: string;
    ORDER_ITEM_DATE: string;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Product: Product;
    My_Status: Status;
    My_Store: Store;
    My_Buyer: Buyer;
    My_Buyer_address: Buyer_address;
    totalCount: number;
    DISPLAY_REFUND?: boolean
    refundable?: boolean
    is_rated? : boolean = false
}
export class Params_SendFeedback {
    fullName: string;
    email: string;
    message: string;
    flag?: string
}
export class Buyer_address {
    BUYER_ADDRESS_ID?: number;
    COUNTRY: string;
    CITY: string;
    STREET: string;
    PHONE_NUMBER: string;
    LANDLINE_NUMBER: string;
    BUILDING: string;
    FLOOR: string;
    BUYER_ID?: number;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Buyer: Buyer;
}
export class Product {
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
    AVAILIBILTY_STATUS: string;
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
    Brand_Name: string;
    Category_Name: string;
    Year_Name: string;
    Model_Name: string;
    totalCount: number;
    My_Uploaded_files: Uploaded_file[];
}
export class Status {
    STATUS_ID?: number;
    STATUS_TYPE: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Store {
    STORE_ID?: number;
    STORE_NAME: string;
    LOCATION: string;
    STORE_URL: string;
    DESCRIPTION: string;
    SELLER_ID?: number;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Seller: Seller;
}
export class Params_VerifyAccount {
    UserName: string;
}
export class User {
    USER_ID?: number;
    OWNER_ID?: number;
    USERNAME: string;
    PASSWORD: string;
    USER_TYPE_CODE: string;
    IS_ACTIVE?: boolean;
    ENTRY_DATE: string;
}
export class Params_ActivateAccount {
    USER_ID: number;
    IS_ACTIVE: boolean;
}
export class Admin {
    ADMIN_ID?: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    PASSWORD: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Params_Delete_Admin {
    ADMIN_ID?: number;
}
export class Params_Get_Admin_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Params_Get_Store_By_STORE_ID {
    STORE_ID?: number;
}
export class Params_Get_Store_By_SELLER_ID {
    SELLER_ID?: number;
}
export class Params_Get_Seller_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Params_makeProcedToCkeckout {
    CardItems: Card_item[];
}
export class Seller {
    SELLER_ID?: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    PASSWORD: string;
    PHONE_NB?: number;
    COUNTRY: string;
    SHIP_TIME_ID?: number;
    IS_AUTHORIZED?: boolean;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Ship_time: Ship_time;
}
export class Ship_time {
    SHIP_TIME_ID?: number;
    SHIP_TIME_TYPE: string;
    DESCRIPTION: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Params_Get_User_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Params_GetFilteredProducts {
    BrandId: number;
    CategoryId: number;
    ModelId: number;
    YearId: number;
}
export class Params_GetFilteredOrderItems {
    StatusId: number;
    Date: string;
}
export class Params_Get_Category_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Category {
    CATEGORY_ID?: number;
    NAME: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Params_Get_Product_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Params_Get_Brand_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Brand {
    BRAND_ID?: number;
    NAME: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Params_Get_Year_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Year {
    YEAR_ID?: number;
    NAME: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Params_Get_Model_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Model {
    MODEL_ID?: number;
    NAME: string;
    BRAND_ID?: number;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Brand: Brand;
}
export class Params_Get_Product_By_Where {
    OWNER_ID?: number;
    PRODUCT_NAME: string;
    PRODUCT_DESCRIPTION: string;
    PRODUCT_CONDITION: string;
    AVAILIBILTY_STATUS: string;
    START_ROW?: number;
    END_ROW?: number;
    TOTAL_COUNT?: number;
}
export class Params_Get_Product_By_STORE_ID {
    STORE_ID?: number;
}
export class Params_Get_Product_By_CATEGORY_ID {
    CATEGORY_ID?: number;
}
export class Params_Delete_Year {
    YEAR_ID?: number;
}
export class Params_Delete_Model {
    MODEL_ID?: number;
}
export class Params_Delete_Brand {
    BRAND_ID?: number;
}
export class Params_Delete_Category {
    CATEGORY_ID?: number;
}
export class Params_Delete_Status {
    STATUS_ID?: number;
}
export class Shipment {
    SHIPMENT_ID?: number;
    SHIPMENT_NAME: string;
    MIN_RANGE?: number;
    MAX_RANGE?: number;
    PRICE?: number;
    DESCRIPTION: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Params_Delete_Shipment {
    SHIPMENT_ID?: number;
}
export class Params_Get_Shipment_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Params_Delete_Store {
    STORE_ID?: number;
}
export class Params_Get_Store_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Params_Get_Vehicle_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Vehicle {
    VEHICLE_ID?: number;
    VEHICLE_TYPE: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Params_Get_Store_By_Where {
    OWNER_ID?: number;
    STORE_NAME: string;
    LOCATION: string;
    STORE_URL: string;
    DESCRIPTION: string;
    START_ROW?: number;
    END_ROW?: number;
    TOTAL_COUNT?: number;
}
export class Params_Delete_Product {
    PRODUCT_ID?: number;
}
export class Params_Get_Status_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Params_Delete_Order_item {
    ORDER_ITEM_ID?: number;
}
export class Params_Get_Order_item_By_STORE_ID {
    STORE_ID?: number;
}
export class Params_Get_Order_item_By_Where {
    OWNER_ID?: number;
    SERIAL_NB: string;
    AVAILIBILTY_STATUS: string;
    DESCRIPTION: string;
    IS_PAID_TO_STORE: string;
    START_ROW?: number;
    END_ROW?: number;
    TOTAL_COUNT?: number;
}
export class Currency_rate {
    CURRENCY_RATE_ID?: number;
    CURRENCY_ID?: number;
    RATE: number;
    STORE_ID?: number;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    DESCRIPTION: string;
    My_Currency: Currency;
    My_Store: Store;
}
export class Currency {
    CURRENCY_ID?: number;
    CURRENCY_NAME: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
}
export class Params_Delete_Currency_rate {
    CURRENCY_RATE_ID?: number;
}
export class Params_Get_Currency_rate_By_STORE_ID {
    STORE_ID?: number;
}
export class Params_Get_Model_By_BRAND_ID {
    BRAND_ID?: number;
}
export class Params_GetBestProducts { }
export class Params_Get_Wish_list_item_By_BUYER_ID {
    BUYER_ID?: number;
}
export class Wish_list_item {
    WISH_LIST_ITEM_ID?: number;
    PRODUCT_ID?: number;
    BUYER_ID?: number;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    DESCRIPTION: string;
    My_Product: Product;
    My_Buyer: Buyer;
    totalCount: number;
}
export class Params_Get_Wish_list_item_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Params_Delete_Wish_list_item {
    WISH_LIST_ITEM_ID?: number;
}
export class Params_Get_Order_item_By_Criteria_InList {
    OWNER_ID?: number;
    SERIAL_NB: string;
    AVAILIBILTY_STATUS: string;
    DESCRIPTION: string;
    IS_PAID_TO_STORE: string;
    PRODUCT_ID_LIST: number[];
    STATUS_ID_LIST: number[];
    STORE_ID_LIST: number[];
    BUYER_ID_LIST: number[];
    BUYER_ADDRESS_ID_LIST: number[];
    START_ROW?: number;
    END_ROW?: number;
    TOTAL_COUNT?: number;
}
export class Params_GetTopRatedProducts { }
export class Card_item {
    CARD_ITEM_ID?: number;
    PRODUCT_ID?: number;
    BUYER_ID?: number;
    QUANTITY?: number;
    TOTAL?: number;
    DESCRIPTION: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Product: Product;
    My_Buyer: Buyer;
    rate: number;
}
export class Params_Delete_Card_item {
    CARD_ITEM_ID?: number;
}
export class Params_Get_Card_item_By_BUYER_ID {
    BUYER_ID?: number;
}
export class Params_Delete_Buyer_address {
    BUYER_ADDRESS_ID?: number;
}
export class Params_Get_Buyer_address_By_BUYER_ID {
    BUYER_ID?: number;
}
export class Tracking {
    TRACKING_ID?: number;
    BUYER_ID?: number;
    ORDER_ITEM_ID?: number;
    STATUS_ID?: number;
    DESCRIPTION: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Buyer: Buyer;
    My_Order_item: Order_item;
    My_Status: Status;
}
export class Params_Get_Product_By_Criteria_InList {
    OWNER_ID?: number;
    PRODUCT_NAME: string;
    PRODUCT_DESCRIPTION: string;
    PRODUCT_CONDITION: string;
    AVAILIBILTY_STATUS: string;
    VEHICLE_ID_LIST: number[];
    CATEGORY_ID_LIST: number[];
    BRAND_ID_LIST: number[];
    YEAR_ID_LIST: number[];
    MODEL_ID_LIST: number[];
    STORE_ID_LIST: number[];
    START_ROW?: number;
    END_ROW?: number;
    TOTAL_COUNT?: number;
    pricingFlag: string
}
export class Params_GetTotalNumberOfOrderItems { }
export class Params_GetTotalNumberOfProducts { }
export class Params_GetWishListAndOrderItemCounts {
    buyerId: number;
}
export class OrderItemsAndWishListItemsCount {
    orderItemTotalCount: number;
    wishListItemTotalCount: number;
}
export class Params_Get_Notification_By_STORE_ID {
    STORE_ID?: number;
}
export class Notification {
    NOTIFICATION_ID?: number;
    STORE_ID?: number;
    MESSAGE: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Store: Store;
}
export class Params_Delete_Notification {
    NOTIFICATION_ID?: number;
}
export class Params_Checkout_Buyer {
    Description: string;
    adressId: number;
    cardItemList: Card_item[];
}
export class Params_AuthByFbAndGoogle {
    BuyerId: number;
    FirstName: string;
    LastName: string;
    EmailAddress: string;
    Provider: string;
}
export class Authentication_Result {
    Token: string;
}
export class Params_StoreProfitInvoice {
    storeId: number;
    orderItemDate: string;
}
export class StoreProfitInvoice {
    totalNet: number;
    orderItemId: number;
    quantity: number;
    productName: string;
    productSerialNb: string;
    productPrice: number;
}
export class Params_PayOrderItemsToStore {
    storeId: number;
    orderItemDate: string;
}
export class Params_GetStoreTotalProfit {
    storeId: number;
}
export class Params_takeLookOnTracking {
    SerialNb: string;
}
export class StoreProfit {
    SumOfTotalNet: number;
}
export class Params_GetStoresRate {
    cardItems: Card_item[];
}
export class StoreRate {
    productName: string;
    rate: number;
}
export class Params_Get_Profit_By_OWNER_ID {
    OWNER_ID?: number;
}
export class Profit {
    PROFIT_ID?: number;
    STORE_ID?: number;
    REQUEST_DATE: string;
    AMMOUNT: number;
    ISACCEPTED: string;
    ISPAID: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_Store: Store;
}
export class Params_Get_Profit_By_STORE_ID {
    STORE_ID?: number;
}
export class Uploaded_file {
    UPLOADED_FILE_ID?: number;
    REL_ENTITY: string;
    REL_KEY?: number;
    REL_FIELD: string;
    SIZE?: number;
    EXTENSION: string;
    STAMP: string;
    ENTRY_USER_ID?: number;
    ENTRY_DATE: string;
    OWNER_ID?: number;
    My_URL: string;
}
export class Params_Delete_Uploaded_file {
    UPLOADED_FILE_ID?: number;
}
export class Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD {
    REL_ENTITY: string;
    REL_KEY?: number;
    REL_FIELD: string;
}
export class Action_Result {
    ExceptionMsg: string;
}
export class Result_Get_Order_By_OWNER_ID extends Action_Result {
    My_Result: Order[];
    My_Params_Get_Order_By_OWNER_ID: Params_Get_Order_By_OWNER_ID;
}
export class Result_VerifyAccount extends Action_Result {
    My_Result: User;
    My_Params_VerifyAccount: Params_VerifyAccount;
}
export class Result_ActivateAccount extends Action_Result {
    My_Result: User;
    My_Params_ActivateAccount: Params_ActivateAccount;
}
export class Result_Edit_Admin extends Action_Result {
    My_Admin: Admin;
}
export class Result_Delete_Admin extends Action_Result {
    My_Params_Delete_Admin: Params_Delete_Admin;
}
export class Result_Get_Admin_By_OWNER_ID extends Action_Result {
    My_Result: Admin[];
    My_Params_Get_Admin_By_OWNER_ID: Params_Get_Admin_By_OWNER_ID;
}
export class Result_Get_Store_By_STORE_ID extends Action_Result {
    My_Result: Store;
    My_Params_Get_Store_By_STORE_ID: Params_Get_Store_By_STORE_ID;
}
export class Result_makeProcedToCkeckout extends Action_Result {
    My_Result: boolean;
    My_Params_makeProcedToCkeckout: Params_makeProcedToCkeckout;
}
export class Result_Get_Store_By_SELLER_ID extends Action_Result {
    My_Result: Store[];
    My_Params_Get_Store_By_SELLER_ID: Params_Get_Store_By_SELLER_ID;
}
export class Result_Get_Seller_By_OWNER_ID extends Action_Result {
    My_Result: Seller[];
    My_Params_Get_Seller_By_OWNER_ID: Params_Get_Seller_By_OWNER_ID;
}
export class Result_Get_User_By_OWNER_ID extends Action_Result {
    My_Result: User[];
    My_Params_Get_User_By_OWNER_ID: Params_Get_User_By_OWNER_ID;
}
export class Result_GetFilteredProducts extends Action_Result {
    My_Result: Product[];
    My_Params_GetFilteredProducts: Params_GetFilteredProducts;
}
export class Result_GetFilteredOrderItems extends Action_Result {
    My_Result: Order_item[];
    My_Params_GetFilteredOrderItems: Params_GetFilteredOrderItems;
}
export class Result_Get_Category_By_OWNER_ID extends Action_Result {
    My_Result: Category[];
    My_Params_Get_Category_By_OWNER_ID: Params_Get_Category_By_OWNER_ID;
}
export class Result_Get_Product_By_OWNER_ID extends Action_Result {
    My_Result: Product[];
    My_Params_Get_Product_By_OWNER_ID: Params_Get_Product_By_OWNER_ID;
}
export class Result_Get_Brand_By_OWNER_ID extends Action_Result {
    My_Result: Brand[];
    My_Params_Get_Brand_By_OWNER_ID: Params_Get_Brand_By_OWNER_ID;
}
export class Result_Get_Year_By_OWNER_ID extends Action_Result {
    My_Result: Year[];
    My_Params_Get_Year_By_OWNER_ID: Params_Get_Year_By_OWNER_ID;
}
export class Result_Get_Model_By_OWNER_ID extends Action_Result {
    My_Result: Model[];
    My_Params_Get_Model_By_OWNER_ID: Params_Get_Model_By_OWNER_ID;
}
export class Result_Get_Product_By_Where_Adv extends Action_Result {
    My_Result: Product[];
    My_Params_Get_Product_By_Where: Params_Get_Product_By_Where;
}
export class Result_Get_Product_By_STORE_ID extends Action_Result {
    My_Result: Product[];
    My_Params_Get_Product_By_STORE_ID: Params_Get_Product_By_STORE_ID;
}
export class Result_Get_Product_By_CATEGORY_ID extends Action_Result {
    My_Result: Product[];
    My_Params_Get_Product_By_CATEGORY_ID: Params_Get_Product_By_CATEGORY_ID;
}
export class Result_Edit_Buyer extends Action_Result {
    My_Buyer: Buyer;
}
export class Result_Edit_Year extends Action_Result {
    My_Year: Year;
}
export class Result_Delete_Year extends Action_Result {
    My_Params_Delete_Year: Params_Delete_Year;
}
export class Result_Edit_Model extends Action_Result {
    My_Model: Model;
}
export class Result_Delete_Model extends Action_Result {
    My_Params_Delete_Model: Params_Delete_Model;
}
export class Result_Delete_Brand extends Action_Result {
    My_Params_Delete_Brand: Params_Delete_Brand;
}
export class Result_Delete_Category extends Action_Result {
    My_Params_Delete_Category: Params_Delete_Category;
}
export class Result_Edit_Seller extends Action_Result {
    My_Seller: Seller;
}
export class Result_Edit_Category extends Action_Result {
    My_Category: Category;
}
export class Result_Edit_Brand extends Action_Result {
    My_Brand: Brand;
}
export class Result_Edit_Status extends Action_Result {
    My_Status: Status;
}
export class Result_Delete_Status extends Action_Result {
    My_Params_Delete_Status: Params_Delete_Status;
}
export class Result_Edit_Shipment extends Action_Result {
    My_Shipment: Shipment;
}
export class Result_Delete_Shipment extends Action_Result {
    My_Params_Delete_Shipment: Params_Delete_Shipment;
}
export class Result_Get_Shipment_By_OWNER_ID extends Action_Result {
    My_Result: Shipment[];
    My_Params_Get_Shipment_By_OWNER_ID: Params_Get_Shipment_By_OWNER_ID;
}
export class Result_Edit_Store extends Action_Result {
    My_Store: Store;
}
export class Result_Delete_Store extends Action_Result {
    My_Params_Delete_Store: Params_Delete_Store;
}
export class Result_Get_Store_By_OWNER_ID extends Action_Result {
    My_Result: Store[];
    My_Params_Get_Store_By_OWNER_ID: Params_Get_Store_By_OWNER_ID;
}
export class Result_Get_Vehicle_By_OWNER_ID extends Action_Result {
    My_Result: Vehicle[];
    My_Params_Get_Vehicle_By_OWNER_ID: Params_Get_Vehicle_By_OWNER_ID;
}
export class Result_Get_Store_By_Where extends Action_Result {
    My_Result: Store[];
    My_Params_Get_Store_By_Where: Params_Get_Store_By_Where;
}
export class Result_Edit_Product extends Action_Result {
    My_Product: Product;
}
export class Result_Delete_Product extends Action_Result {
    My_Params_Delete_Product: Params_Delete_Product;
}
export class Result_Get_Status_By_OWNER_ID extends Action_Result {
    My_Result: Status[];
    My_Params_Get_Status_By_OWNER_ID: Params_Get_Status_By_OWNER_ID;
}
export class Result_Edit_Order_item extends Action_Result {
    My_Order_item: Order_item;
}
export class Result_Edit_Review extends Action_Result {
    My_Review: Review;
}
export class Result_Delete_Order_item extends Action_Result {
    My_Params_Delete_Order_item: Params_Delete_Order_item;
}
export class Result_Get_Order_item_By_STORE_ID extends Action_Result {
    My_Result: Order_item[];
    My_Params_Get_Order_item_By_STORE_ID: Params_Get_Order_item_By_STORE_ID;
}
export class Result_Get_Order_item_By_Where_Adv extends Action_Result {
    My_Result: Order_item[];
    My_Params_Get_Order_item_By_Where: Params_Get_Order_item_By_Where;
}
export class Result_Edit_Currency_rate extends Action_Result {
    My_Currency_rate: Currency_rate;
}
export class Result_Delete_Currency_rate extends Action_Result {
    My_Params_Delete_Currency_rate: Params_Delete_Currency_rate;
}
export class Result_Get_Currency_rate_By_STORE_ID extends Action_Result {
    My_Result: Currency_rate[];
    My_Params_Get_Currency_rate_By_STORE_ID: Params_Get_Currency_rate_By_STORE_ID;
}
export class Result_Get_Model_By_BRAND_ID extends Action_Result {
    My_Result: Model[];
    My_Params_Get_Model_By_BRAND_ID: Params_Get_Model_By_BRAND_ID;
}
export class Result_GetBestProducts extends Action_Result {
    My_Result: Product[];
    My_Params_GetBestProducts: Params_GetBestProducts;
}
export class Result_Get_Wish_list_item_By_BUYER_ID_Adv extends Action_Result {
    My_Result: Wish_list_item[];
    My_Params_Get_Wish_list_item_By_BUYER_ID: Params_Get_Wish_list_item_By_BUYER_ID;
}
export class Result_Get_Wish_list_item_By_OWNER_ID extends Action_Result {
    My_Result: Wish_list_item[];
    My_Params_Get_Wish_list_item_By_OWNER_ID: Params_Get_Wish_list_item_By_OWNER_ID;
}
export class Result_Edit_Wish_list_item extends Action_Result {
    My_Wish_list_item: Wish_list_item;
}
export class Result_Delete_Wish_list_item extends Action_Result {
    My_Params_Delete_Wish_list_item: Params_Delete_Wish_list_item;
}
export class Result_Get_Order_item_By_Criteria_InList_Adv extends Action_Result {
    My_Result: Order_item[];
    My_Params_Get_Order_item_By_Criteria_InList: Params_Get_Order_item_By_Criteria_InList;
}
export class Result_GetTopRatedProducts extends Action_Result {
    My_Result: Product[];
    My_Params_GetTopRatedProducts: Params_GetTopRatedProducts;
}
export class Result_Edit_Card_item extends Action_Result {
    My_Card_item: Card_item;
}
export class Result_Delete_Card_item extends Action_Result {
    My_Params_Delete_Card_item: Params_Delete_Card_item;
}
export class Result_Get_Card_item_By_BUYER_ID_Adv extends Action_Result {
    My_Result: Card_item[];
    My_Params_Get_Card_item_By_BUYER_ID: Params_Get_Card_item_By_BUYER_ID;
}
export class Result_Edit_Buyer_address extends Action_Result {
    My_Buyer_address: Buyer_address;
}
export class Result_Delete_Buyer_address extends Action_Result {
    My_Params_Delete_Buyer_address: Params_Delete_Buyer_address;
}
export class Result_Get_Buyer_address_By_BUYER_ID extends Action_Result {
    My_Result: Buyer_address[];
    My_Params_Get_Buyer_address_By_BUYER_ID: Params_Get_Buyer_address_By_BUYER_ID;
}
export class Result_Edit_Tracking extends Action_Result {
    My_Tracking: Tracking;
}
export class Result_Get_Product_By_Criteria_InList_Adv extends Action_Result {
    My_Result: Product[];
    My_Params_Get_Product_By_Criteria_InList: Params_Get_Product_By_Criteria_InList;
}
export class Result_GetTotalNumberOfOrderItems extends Action_Result {
    My_Result: Order_item;
    My_Params_GetTotalNumberOfOrderItems: Params_GetTotalNumberOfOrderItems;
}
export class Result_SendFeedback extends Action_Result {
    My_Params_SendFeedback: Params_SendFeedback;
}
export class Result_GetTotalNumberOfProducts extends Action_Result {
    My_Result: Product;
    My_Params_GetTotalNumberOfProducts: Params_GetTotalNumberOfProducts;
}
export class Result_GetWishListAndOrderItemCounts extends Action_Result {
    My_Result: OrderItemsAndWishListItemsCount;
    My_Params_GetWishListAndOrderItemCounts: Params_GetWishListAndOrderItemCounts;
}
export class Result_Get_Notification_By_STORE_ID extends Action_Result {
    My_Result: Notification[];
    My_Params_Get_Notification_By_STORE_ID: Params_Get_Notification_By_STORE_ID;
}
export class Result_Edit_Notification extends Action_Result {
    My_Notification: Notification;
}
export class Result_Delete_Notification extends Action_Result {
    My_Params_Delete_Notification: Params_Delete_Notification;
}
export class Result_Checkout_Buyer extends Action_Result {
    My_Result: boolean;
    My_Params_Checkout_Buyer: Params_Checkout_Buyer;
}
export class Result_AuthByFbAndGoogle extends Action_Result {
    My_Result: Authentication_Result;
    My_Params_AuthByFbAndGoogle: Params_AuthByFbAndGoogle;
}
export class Result_StoreProfitInvoice extends Action_Result {
    My_Result: StoreProfitInvoice;
    My_Params_StoreProfitInvoice: Params_StoreProfitInvoice;
}
export class Result_PayOrderItemsToStore extends Action_Result {
    My_Params_PayOrderItemsToStore: Params_PayOrderItemsToStore;
}
export class Result_GetStoreTotalProfit extends Action_Result {
    My_Result: StoreProfit;
    My_Params_GetStoreTotalProfit: Params_GetStoreTotalProfit;
}
export class Result_takeLookOnTracking extends Action_Result {
    My_Result: Tracking[];
    My_Params_takeLookOnTracking: Params_takeLookOnTracking;
}
export class Result_GetStoresRate extends Action_Result {
    My_Result: StoreRate[];
    My_Params_GetStoresRate: Params_GetStoresRate;
}
export class Result_Get_Profit_By_OWNER_ID extends Action_Result {
    My_Result: Profit[];
    My_Params_Get_Profit_By_OWNER_ID: Params_Get_Profit_By_OWNER_ID;
}
export class Result_Get_Profit_By_STORE_ID extends Action_Result {
    My_Result: Profit[];
    My_Params_Get_Profit_By_STORE_ID: Params_Get_Profit_By_STORE_ID;
}
export class Result_Edit_Profit extends Action_Result {
    My_Profit: Profit;
}
export class Result_Edit_Uploaded_file extends Action_Result {
    My_Uploaded_file: Uploaded_file;
}
export class Result_Delete_Uploaded_file extends Action_Result {
    My_Params_Delete_Uploaded_file: Params_Delete_Uploaded_file;
}
export class Result_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD extends Action_Result {
    My_Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD: Params_Delete_Uploaded_file_By_REL_ENTITY_REL_KEY_REL_FIELD;
}
