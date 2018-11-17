import { Routes } from '@angular/router';

import { OutfitsComponent } from './outfits.component';

export const OutfitsRoutes: Routes = [{
    path: '',
    children: [{
        path: '',
        component: OutfitsComponent
    }]
}];
