import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './clickOutside.directive';
import { RouterModule } from '@angular/router';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { WosshaImgUploaderModule } from '../wossha_img_uploader/wossha.imguploader.module';

//pipes
import { PipesModule } from "../../../pipes/pipes.module";

import { WosshaPostComponent } from './wossha.post.component';
import { WosshaPostCreatorComponent } from './components/wossha_post_creator/wossha.post.creator.component';

import { OneModalComponent } from './components/one-modal/one-modal.component';
import { ReactionsModalComponent } from './components/reactions-modal/reactions-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PipesModule,
        RouterModule,
        WosshaImgUploaderModule,
        NgxSmartModalModule.forChild()
    ],
    exports: [
        WosshaPostComponent,
        WosshaPostCreatorComponent
    ],
    entryComponents: [],
    declarations: [
        WosshaPostComponent,
        ClickOutsideDirective,
        WosshaPostCreatorComponent,
        OneModalComponent, ReactionsModalComponent
    ],
    providers: [NgxSmartModalService]
})

export class WosshaPostModule {}
