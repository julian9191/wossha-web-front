import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { CombinacionesComponent } from './combinaciones.component';
import { CombinacionesRoutes } from './combinaciones.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CombinacionesRoutes),
        FormsModule,
        TagInputModule,
    ],
    declarations: [CombinacionesComponent]
})

export class CombinacionesModule {}
