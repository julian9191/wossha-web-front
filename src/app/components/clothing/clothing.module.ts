import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import {ClothingService} from "../../providers/clothing/clothing.service";
import { PicturesService } from "../../providers/pictures/pictures.service";
import { NouisliderModule } from 'ng2-nouislider';
import { ListClothingComponent } from './list_clothing/listClothing.component';
import { CreateClotheComponent } from './create_clothe/createClothe.component';
import { VieweClotheComponent } from './viewe_clothe/vieweClothe.component';
import { EditClotheComponent } from './edit_clothe/editClothe.component';
import { ClothingRoutes } from './clothing.routing';
import {CrystalGalleryModule} from 'ngx-crystal-gallery';
import { SearchCriteriaModule } from '../components/search_criteria/searchcriteria.module';
import { LbdModule } from '../lbd/lbd.module';
import { CalendarService } from "../../providers/clothing/calendar.service";
import { StatisticsService } from "../../providers/clothing/statistics.service";
import { StatisticsComponent } from './statistics/statistics.component';
import { NgChatModule } from '../components/ng-chat/ng-chat.module';
import { WosshaImgUploaderModule } from '../components/wossha_img_uploader/wossha.imguploader.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NouisliderModule,
        ComponentsModule,
        WosshaImgUploaderModule,
        CrystalGalleryModule,
        SearchCriteriaModule,
        LbdModule,
        NgChatModule,
        RouterModule.forChild(ClothingRoutes),
    ],
    declarations: [
        ListClothingComponent,
        CreateClotheComponent,
        VieweClotheComponent,
        EditClotheComponent,
        StatisticsComponent
    ],
    providers: [ClothingService, PicturesService, CalendarService, StatisticsService]
})

export class ClothingModule {}
