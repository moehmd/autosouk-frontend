import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { AccountApi } from '../../api/base';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { HeaderService } from '../../services/header.service';
import { TranslateService } from '@ngx-translate/core';
import { UrlService } from '../../services/url.service';
import { JwtAuthService } from '../../services/jwt-auth.service';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    //email$: Observable<string | null> = this.account.user$.pipe(map(x => x ? x.email : null));
    fullName : string = null
    departmentsLabel$: Observable<string>;
    isAuth: boolean

    constructor(
        private account: AccountApi,
        private translate: TranslateService,
        public wishlist: WishlistService,
        public cart: CartService,
        public header: HeaderService,
        public url: UrlService,
        private jwtAuth: JwtAuthService,
        private Auth : AuthenticationService
    ) { }

    ngOnInit(): void {
        this.isAuth = this.jwtAuth.isAuthenticated()
        if(this.jwtAuth.isAuthenticated()){
            this.fullName = this.jwtAuth.getFullName()
        }
        this.Auth.onAuthentication.subscribe(d =>{
            this.isAuth = this.jwtAuth.isAuthenticated()
            if(d){
               this.fullName = this.jwtAuth.getFullName()
            }else{
                this.fullName = null
            }
        })
        this.departmentsLabel$ = this.header.desktopLayout$.pipe(
            switchMap(layout => this.translate.stream(
                layout === 'spaceship' ? 'BUTTON_DEPARTMENTS' : 'BUTTON_DEPARTMENTS_LONG',
            )),
        );
    }
}
