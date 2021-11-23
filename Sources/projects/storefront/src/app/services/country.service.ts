import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CountryService{
    constructor(private http:HttpClient){}


    FetchCountry(): Observable<Object>{
        return this.http.get('../../assets/data/Country.json');
    }
}
