"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin_layout_component_1 = require("./components/layouts/admin/admin-layout.component");
var auth_layout_component_1 = require("./components/layouts/auth/auth-layout.component");
var activateGuard_service_1 = require("./providers/auth/activateGuard.service");
exports.AppRoutes = [{
        path: '',
        redirectTo: 'start',
        pathMatch: 'full',
    },
    { path: '**', pathMatch: 'full', redirectTo: 'login' },
    {
        path: '',
        component: admin_layout_component_1.AdminLayoutComponent,
        canActivate: [activateGuard_service_1.ActivateGuard],
        children: [{
                path: '',
                loadChildren: './components/dashboard/dashboard.module#DashboardModule'
            }, {
                path: 'calendar',
                loadChildren: './components/calendar/calendar.module#CalendarModule'
            }, {
                path: 'clothing',
                loadChildren: './components/clothing/clothing.module#ClothingModule'
            }, {
                path: 'outfits',
                loadChildren: './components/outfits/outfits.module#OutfitsModule'
            }, {
                path: 'start',
                loadChildren: './components/start/start.module#StartModule'
            }, {
                path: 'components',
                loadChildren: './components/components/components.module#ComponentsModule'
            }, {
                path: 'forms',
                loadChildren: './components/forms/forms.module#Forms'
            }, {
                path: 'tables',
                loadChildren: './components/tables/tables.module#TablesModule'
            }, {
                path: 'maps',
                loadChildren: './components/maps/maps.module#MapsModule'
            }, {
                path: 'charts',
                loadChildren: './components/charts/charts.module#ChartsModule'
            }, {
                path: '',
                loadChildren: './components/userpage/user.module#UserModule'
            }]
    }, {
        path: '',
        component: auth_layout_component_1.AuthLayoutComponent,
        children: [{
                path: 'pages',
                loadChildren: './components/pages/pages.module#PagesModule'
            }]
    }
];
//# sourceMappingURL=app.routing.js.map