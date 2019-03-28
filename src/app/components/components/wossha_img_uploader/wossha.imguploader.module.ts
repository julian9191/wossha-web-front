import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { wosshaImgUploaderComponent } from './single-image/wossha.imguploader.component';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { Popup } from './single-image/popup.component'

import { wosshaMultipleImgUploaderComponent } from './multiple-images/wossha.multiple.imguploader.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BootstrapModalModule
    ],
    exports: [
        wosshaImgUploaderComponent,
        wosshaMultipleImgUploaderComponent,
        ImageCropperComponent
    ],
    entryComponents: [Popup],
    declarations: [
        wosshaImgUploaderComponent,
        wosshaMultipleImgUploaderComponent,
        ImageCropperComponent,
        Popup
    ]
})

export class WosshaImgUploaderModule {}
