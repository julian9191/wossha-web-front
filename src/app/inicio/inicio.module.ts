import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { InicioComponent } from './inicio.component';
import { InicioRoutes } from './inicio.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InicioRoutes),
        FormsModule,
        TagInputModule,
    ],
    declarations: [InicioComponent]
})

export class InicioModule {}
