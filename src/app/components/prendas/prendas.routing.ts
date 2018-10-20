import { Routes } from '@angular/router';

import { ListarPrendasComponent } from './listar_prendas/listarPrendas.component';
import { CrearPrendasComponent } from './crear_prendas/crearPrendas.component';
import { VieweClotheComponent } from './viewe_clothe/vieweClothe.component';


export const PrendasRoutes: Routes = [{
        path: '',
        children: [{
            path: 'listar-prendas',
            component: ListarPrendasComponent
        },
        {
            path: 'crear-prendas',
            component: CrearPrendasComponent
        },
        {
            path: 'view-clothe/:uuid',
            component: VieweClotheComponent
        }]
    }
];
