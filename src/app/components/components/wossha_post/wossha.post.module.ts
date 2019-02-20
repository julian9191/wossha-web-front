import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './clickOutside.directive';

//pipes
import { PipesModule } from "../../../pipes/pipes.module";

import { WosshaPostComponent } from './wossha.post.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule
    ],
    exports: [WosshaPostComponent],
    declarations: [
        WosshaPostComponent,
        ClickOutsideDirective
    ],
    providers: []
})

export class WosshaPostModule {}
