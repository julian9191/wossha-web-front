import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PhotoSwipeComponent } from './photo-swipe.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [PhotoSwipeComponent],
    declarations: [PhotoSwipeComponent],
    providers: []
})

export class PhotoSwipeModule {}
