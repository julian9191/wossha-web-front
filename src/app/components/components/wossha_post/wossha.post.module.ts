import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './clickOutside.directive';
import { RouterModule } from '@angular/router';

//pipes
import { PipesModule } from "../../../pipes/pipes.module";

import { WosshaPostComponent } from './wossha.post.component';
import { WosshaPostCreatorComponent } from './components/wossha_post_creator/wossha.post.creator.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule
    ],
    exports: [
        WosshaPostComponent,
        WosshaPostCreatorComponent
    ],
    declarations: [
        WosshaPostComponent,
        ClickOutsideDirective,
        WosshaPostCreatorComponent
    ],
    providers: []
})

export class WosshaPostModule {}
