import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonsComponent } from './buttons/buttons.component';
import { ComponentsRoutes } from './components.routing';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';
import { NgColorModule } from 'ng-color';
import { WosshaDatepickerComponent } from "./wossha_datepicker/wossha.datepicker.component"
import { WosshaColorpickerComponent } from "./wossha_colorpicker/wossha.colorpicker.component"
import { SearchComponent } from './search/search.component';
import { wosshaImgUploaderComponent } from './wossha_img_uploader/wossha.imguploader.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { Popup } from './wossha_img_uploader/popup.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ComponentsRoutes),
        FormsModule,
        NgColorModule,
        BootstrapModalModule
    ],
    exports: [
        WosshaDatepickerComponent,
        WosshaColorpickerComponent,
        SearchComponent,
        wosshaImgUploaderComponent,
        ImageCropperComponent
    ],
    entryComponents: [
        Popup
    ],
    declarations: [
        ButtonsComponent,
        GridSystemComponent,
        IconsComponent,
        PanelsComponent,
        SweetAlertComponent,
        TypographyComponent,
        WosshaDatepickerComponent,
        WosshaColorpickerComponent,
        SearchComponent,
        wosshaImgUploaderComponent,
        ImageCropperComponent,
        Popup
    ],
    providers: []
})

export class ComponentsModule {}
