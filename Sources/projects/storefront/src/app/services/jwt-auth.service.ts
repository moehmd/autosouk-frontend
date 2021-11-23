import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JwtAuthService {

    private decodedToken!: { [key: string]: string };
    private token: any;
    constructor(public jwtHelper: JwtHelperService, public router: Router) {}

    public isAuthenticated(): boolean {
        this.token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(this.token);
    }

    public decodeToken() {
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.decodedToken = this.jwtHelper.decodeToken(this.token);
        } else {
            this.router.createUrlTree(['account/login']);
        }
    }

    public getId() {
        this.decodeToken();
        return Number(this.decodedToken.Id);
    }

    public getUserType() : string{
        this.decodeToken();
        return this.decodedToken.UserType;
    }

    public getFullName(): string {
        this.decodeToken();
        return this.decodedToken.FullName;
    }

    public getEmail(): string {
        this.decodeToken();
        return this.decodedToken.email;
    }
}
