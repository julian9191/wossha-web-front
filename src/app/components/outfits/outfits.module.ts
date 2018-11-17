import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { SearchCriteriaModule } from '../components/search_criteria/searchcriteria.module';
import { OutfitsComponent } from './outfits.component';
import { OutfitsRoutes } from './outfits.routing';
import {ClothingService} from "../../providers/clothing/clothing.service";
import { PhotoSwipeModule } from '../components/photo-swipe/photo-swipe.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(OutfitsRoutes),
        FormsModule,
        TagInputModule,
        SearchCriteriaModule,
        PhotoSwipeModule
    ],
    declarations: [OutfitsComponent],
    providers: [ClothingService]
})

export class OutfitsModule {}
