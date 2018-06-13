import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'pages/login',
        pathMatch: 'full',
    },{
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './dashboard/dashboard.module#DashboardModule'
        },{
            path: 'calendar',
            loadChildren: './calendar/calendar.module#CalendarModule'
        },{
            path: 'prendas',
            loadChildren: './prendas/prendas.module#PrendasModule'
        },{
            path: 'combinaciones',
            loadChildren: './combinaciones/combinaciones.module#CombinacionesModule'
        },{
            path: 'inicio',
            loadChildren: './inicio/inicio.module#InicioModule'
        },{
            path: 'components',
            loadChildren: './components/components.module#ComponentsModule'
        },{
            path: 'forms',
            loadChildren: './forms/forms.module#Forms'
        },{
            path: 'tables',
            loadChildren: './tables/tables.module#TablesModule'
        },{
            path: 'maps',
            loadChildren: './maps/maps.module#MapsModule'
        },{
            path: 'charts',
            loadChildren: './charts/charts.module#ChartsModule'
        },{
            path: '',
            loadChildren: './userpage/user.module#UserModule'
        }]
        },{
            path: '',
            component: AuthLayoutComponent,
            children: [{
                path: 'pages',
                loadChildren: './pages/pages.module#PagesModule'
            }]
        }
];
