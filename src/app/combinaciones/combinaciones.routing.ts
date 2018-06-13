import { Routes } from '@angular/router';

import { CombinacionesComponent } from './combinaciones.component';

export const CombinacionesRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: CombinacionesComponent
    }]
}];
