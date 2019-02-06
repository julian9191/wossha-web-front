import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { SearchCriteriaModule } from '../components/search_criteria/searchcriteria.module';
import { OutfitsComponent } from './outfits.component';
import { OutfitsRoutes } from './outfits.routing';
import {ClothingService} from "../../providers/clothing/clothing.service";
import {CrystalGalleryModule} from 'ngx-crystal-gallery';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DatePopup } from './popup/datePopup.component'
import { CalendarService } from "../../providers/clothing/calendar.service";
import { NotificationsService } from "../../providers/notifications/notifications.service"

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OutfitsRoutes),
        FormsModule,
        TagInputModule,
        SearchCriteriaModule,
        CrystalGalleryModule,
        BootstrapModalModule
    ],
    entryComponents: [
        DatePopup
    ],
    declarations: [OutfitsComponent, DatePopup],
    providers: [ClothingService, CalendarService, NotificationsService]
})

export class OutfitsModule {}
