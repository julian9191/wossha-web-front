import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './clickOutside.directive';
import { RouterModule } from '@angular/router';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { WosshaImgUploaderModule } from '../wossha_img_uploader/wossha.imguploader.module';
import {CrystalGalleryModule} from 'ngx-crystal-gallery';

//pipes
import { PipesModule } from "../../../pipes/pipes.module";

import { WosshaPostComponent } from './wossha.post.component';
import { WosshaPostCreatorComponent } from './components/wossha_post_creator/wossha.post.creator.component';
import { WosshaPostImagesComponent } from './components/wossha_post_images/wossha.post.images.component';

import { OneModalComponent } from './components/one-modal/one-modal.component';
import { ReactionsModalComponent } from './components/reactions-modal/reactions-modal.component';
import { ResizableDivDirective } from './directives/resizable-div.directive';
import { ResizableImgDirective } from './directives/resizable-img.directive';
import { LoadVideoDirective } from './directives/load-video.directive';
import { ResizableVideoDirective } from './directives/resizable-video.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule,
        WosshaImgUploaderModule,
        CrystalGalleryModule,
        NgxSmartModalModule.forChild()
    ],
    exports: [
        WosshaPostComponent,
        WosshaPostCreatorComponent,
        WosshaPostImagesComponent
    ],
    entryComponents: [],
    declarations: [
        WosshaPostComponent,
        ClickOutsideDirective,
        WosshaPostCreatorComponent,
        WosshaPostImagesComponent,
        OneModalComponent, 
        ReactionsModalComponent, 
        ResizableDivDirective,
        ResizableImgDirective,
        LoadVideoDirective,
        ResizableVideoDirective
    ],
    providers: [NgxSmartModalService]
})

export class WosshaPostModule {}
