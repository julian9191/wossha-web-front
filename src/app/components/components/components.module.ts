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


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ComponentsRoutes),
        FormsModule,
        NgColorModule
    ],
    exports: [
        WosshaDatepickerComponent,
        WosshaColorpickerComponent,
        SearchComponent
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
        SearchComponent
    ],
    providers: []
})

export class ComponentsModule {}
