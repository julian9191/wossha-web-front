import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListarPrendasComponent } from './listar_prendas/listarPrendas.component';
import { CrearPrendasComponent } from './crear_prendas/crearPrendas.component';
import { PrendasRoutes } from './prendas.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PrendasRoutes),
        FormsModule
    ],
    declarations: [
        ListarPrendasComponent,
        CrearPrendasComponent
    ]
})

export class PrendasModule {}
