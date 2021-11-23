import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// modules (third-party)
import { TranslateModule } from '@ngx-translate/core';
// modules
import { RadioModule } from '../radio/radio.module';
import { SharedModule } from '../shared/shared.module';

// components
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DropcartComponent } from './components/dropcart/dropcart.component';
import { HeaderComponent } from './header.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { LogoComponent } from './components/logo/logo.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MegamenuComponent } from './components/megamenu/megamenu.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchComponent } from './components/search/search.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AuthenticationService } from '../../services/authentication.service';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        // components
        AccountMenuComponent,
        DepartmentsComponent,
        DropcartComponent,
        HeaderComponent,
        IndicatorComponent,
        IndicatorComponent,
        LogoComponent,
        MainMenuComponent,
        MegamenuComponent,
        MenuComponent,
        SearchComponent,
        TopbarComponent,
    ],
    providers: [
        AuthenticationService,
    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AvatarModule,
        HttpClientModule,
        RouterModule,
        // modules (third-party)
        TranslateModule.forChild(),
        // modules
        RadioModule,
        SharedModule,
    ],
    exports: [
        HeaderComponent,
    ],
})
export class HeaderModule { }
