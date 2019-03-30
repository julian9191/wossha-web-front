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
import { AutocompleteComponent } from './search/autocomplete/autocomplete.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NouisliderModule } from 'ng2-nouislider';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ComponentsRoutes),
        FormsModule,
        NgColorModule,
        BootstrapModalModule,
        AngularMultiSelectModule,
        NouisliderModule
    ],
    exports: [
        WosshaDatepickerComponent,
        WosshaColorpickerComponent,
        AutocompleteComponent,
    ],
    entryComponents: [],
    declarations: [
        ButtonsComponent,
        GridSystemComponent,
        IconsComponent,
        PanelsComponent,
        SweetAlertComponent,
        TypographyComponent,
        WosshaDatepickerComponent,
        WosshaColorpickerComponent,
        AutocompleteComponent
    ],
    providers: []
})

export class ComponentsModule {}
