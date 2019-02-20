import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { WosshaPostModule } from '../components/wossha_post/wossha.post.module';

import { StartComponent } from './start.component';
import { StartRoutes } from './start.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StartRoutes),
        FormsModule,
        TagInputModule,
        WosshaPostModule
    ],
    declarations: [StartComponent]
})

export class StartModule {}
