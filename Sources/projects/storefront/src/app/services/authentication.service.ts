import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { Action_Result } from './proxy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    APIBaseUrl = '';
    url = '';
    constructor(public api: HttpClient, private common: CommonService) {
    this.APIBaseUrl = common.AuthAPIUrl;
    }
 public Login(i_Params_userLogin: Params_userLogin) : Observable<string> {
        this.url = this.APIBaseUrl + '/Login?Ticket=';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        return this.api.post<AuthResults>(this.url, JSON.stringify(i_Params_userLogin), options)
        .pipe(map(response => {if(response.authResults){return response.authResults.Token;}else{ this.common.Handle_Exception(response.ExceptionMsg);}}));
        }


public onAuthentication : EventEmitter<boolean> = new EventEmitter();
}
export class Params_userLogin
{
Email:string;
Password:string;
}
export class AuthResults extends Action_Result
{
authResults:Authentication_Result;
}
export class Authentication_Result
{
    Token:string;
}


