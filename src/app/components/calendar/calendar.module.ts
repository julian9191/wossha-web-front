import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ClothingService} from "../../providers/clothing/clothing.service";
import { CalendarComponent } from './calendar.component';
import { CalendarRoutes } from './calendar.routing';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DayPopup } from './popup/dayPopup.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CalendarRoutes),
        FormsModule,
        BootstrapModalModule
        
    ],
    entryComponents: [
        DayPopup
    ],
    declarations: [CalendarComponent, DayPopup],
    providers: [ClothingService]
})

export class CalendarModule {}
