import { Routes } from '@angular/router';

import { ListClothingComponent } from './list_clothing/listClothing.component';
import { CreateClotheComponent } from './create_clothe/createClothe.component';
import { VieweClotheComponent } from './viewe_clothe/vieweClothe.component';
import { EditClotheComponent } from './edit_clothe/editClothe.component';


export const ClothingRoutes: Routes = [{
        path: '',
        children: [{
            path: 'list-clothing',
            component: ListClothingComponent
        },
        {
            path: 'create-clothe',
            component: CreateClotheComponent
        },
        {
            path: 'view-clothe/:uuid',
            component: VieweClotheComponent
        },
        {
            path: 'edit-clothe/:uuid',
            component: EditClotheComponent
        }]
    }
];
