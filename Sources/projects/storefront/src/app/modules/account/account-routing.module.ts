import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
// pages
import { PageAddressesComponent } from './pages/page-addresses/page-addresses.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { PageEditAddressComponent } from './pages/page-edit-address/page-edit-address.component';
import { PageGarageComponent } from './pages/page-garage/page-garage.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { PageOrdersComponent } from './pages/page-orders/page-orders.component';
import { PagePasswordComponent } from './pages/page-password/page-password.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { AuthGuardService } from '../../services/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            },
            // {
            //     path: 'dashboard',
            //     component: PageDashboardComponent,
            // },
            // {
            //     path: 'garage',
            //     component: PageGarageComponent,
            // },
            {
                path: 'profile',
                component: PageProfileComponent,
            },
            {
                path: 'orders',
                component: PageOrdersComponent,
            },
            {
                path: 'orders/:id',
                component: PageOrderDetailsComponent,
            },
            {
                path: 'addresses',
                component: PageAddressesComponent,
            },
            {
                path: 'addresses/new',
                component: PageEditAddressComponent,
            },
            {
                path: 'addresses/:id',
                component: PageEditAddressComponent,
            },
            {
                path: 'password',
                component: PagePasswordComponent,
            },
            {
                path: 'order-details',
                component: PageOrderDetailsComponent,
                data: {
                    orderId: 1,
                },
            },
            {
                path: 'edit-address',
                component: PageEditAddressComponent,
            },
            // --- END ---
        ],
        canActivate: [AuthGuardService],
    },
    {
        path: 'login',
        component: PageLoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule { }
