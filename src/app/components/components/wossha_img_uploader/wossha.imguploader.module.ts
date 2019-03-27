import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { wosshaImgUploaderComponent } from './wossha.imguploader.component';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { Popup } from './popup.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BootstrapModalModule
    ],
    exports: [
        wosshaImgUploaderComponent,
        ImageCropperComponent
    ],
    entryComponents: [Popup],
    declarations: [
        wosshaImgUploaderComponent,
        ImageCropperComponent,
        Popup
    ]
})

export class WosshaImgUploaderModule {}
