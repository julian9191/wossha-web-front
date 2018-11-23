import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './components/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth/auth-layout.component';
import { ActivateGuard } from './providers/auth/activateGuard.service';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'start',
        pathMatch: 'full',
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [ActivateGuard],
        children: [{
            path: '',
            loadChildren: './components/dashboard/dashboard.module#DashboardModule'
        },{
            path: 'calendar',
            loadChildren: './components/calendar/calendar.module#CalendarModule'
        },{
            path: 'clothing', 
            loadChildren: './components/clothing/clothing.module#ClothingModule'
        },{
            path: 'outfits',
            loadChildren: './components/outfits/outfits.module#OutfitsModule'
        },{
            path: 'start',
            loadChildren: './components/start/start.module#StartModule'
        },{
            path: 'components',
            loadChildren: './components/components/components.module#ComponentsModule'
        },{
            path: 'forms',
            loadChildren: './components/forms/forms.module#Forms'
        },{
            path: 'tables',
            loadChildren: './components/tables/tables.module#TablesModule'
        },{
            path: 'maps',
            loadChildren: './components/maps/maps.module#MapsModule'
        },{
            path: 'charts',
            loadChildren: './components/charts/charts.module#ChartsModule'
        },{
            path: '',
            loadChildren: './components/userpage/user.module#UserModule'
        }]
    },{
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './components/pages/pages.module#PagesModule'
        }]
    }
];
