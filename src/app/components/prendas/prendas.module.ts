import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import {ClothingService} from "../../providers/clothing/clothing.service";
import { PicturesService } from "../../providers/pictures/pictures.service";
import { NouisliderModule } from 'ng2-nouislider';
import { ListarPrendasComponent } from './listar_prendas/listarPrendas.component';
import { CrearPrendasComponent } from './crear_prendas/crearPrendas.component';
import { PrendasRoutes } from './prendas.routing';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PrendasRoutes),
        FormsModule,
        NouisliderModule,
        ComponentsModule
    ],
    declarations: [
        ListarPrendasComponent,
        CrearPrendasComponent
    ],
    providers: [ClothingService, PicturesService]
})

export class PrendasModule {}
