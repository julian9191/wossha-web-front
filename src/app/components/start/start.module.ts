import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { StartComponent } from './start.component';
import { StartRoutes } from './start.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StartRoutes),
        FormsModule,
        TagInputModule,
    ],
    declarations: [StartComponent]
})

export class StartModule {}
