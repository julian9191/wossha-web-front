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
import { PhotoSwipeModule } from '../components/photo-swipe/photo-swipe.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ClothingRoutes),
        FormsModule,
        NouisliderModule,
        ComponentsModule,
        PhotoSwipeModule
    ],
    declarations: [
        ListClothingComponent,
        CreateClotheComponent,
        VieweClotheComponent,
        EditClotheComponent
    ],
    providers: [ClothingService, PicturesService]
})

export class ClothingModule {}
