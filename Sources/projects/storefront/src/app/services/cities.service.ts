import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CitiesService{
    constructor(private http:HttpClient){}


    FetchCities(): Observable<Object>{
      return this.http.get('../../assets/data/cities.json');
    }
}
