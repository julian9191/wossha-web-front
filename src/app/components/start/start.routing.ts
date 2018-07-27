import { Routes } from '@angular/router';

import { StartComponent } from './start.component';

export const StartRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: StartComponent
    }]
}];
