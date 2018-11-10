import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ClothingService} from "../../providers/clothing/clothing.service";
import { CalendarService } from "../../providers/clothing/calendar.service";
import { NotificationsService } from "../../providers/notifications/notifications.service"
import { CalendarComponent } from './calendar.component';
import { CalendarRoutes } from './calendar.routing';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DayPopup } from './popup/dayPopup.component'
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NouisliderModule } from 'ng2-nouislider';
import { SearchCriteriaModule } from '../components/search_criteria/searchcriteria.module';
import { PhotoSwipeComponent } from '../components/photo-swipe/photo-swipe.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(CalendarRoutes),
        FormsModule,
        BootstrapModalModule,
        AngularMultiSelectModule,
        NouisliderModule,
        SearchCriteriaModule,
        //PhotoSwipeComponent
    ],
    entryComponents: [
        DayPopup
    ],
    declarations: [CalendarComponent, DayPopup],
    providers: [ClothingService, NotificationsService, CalendarService]
})

export class CalendarModule {}
