import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ClothingService} from "../../providers/clothing/clothing.service";
import { CalendarService } from "../../providers/clothing/calendar.service";
import { StatisticsService } from "../../providers/clothing/statistics.service";
import { NotificationsService } from "../../providers/notifications/notifications.service"
import { LbdModule } from '../lbd/lbd.module';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutes } from './statistics.routing';
import { PhotoSwipeModule } from '../components/photo-swipe/photo-swipe.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(StatisticsRoutes),
        FormsModule,
        LbdModule,
        PhotoSwipeModule
    ],
    entryComponents: [],
    declarations: [StatisticsComponent],
    providers: [ClothingService, NotificationsService, CalendarService, StatisticsService]
})

export class StatisticsModule {}
