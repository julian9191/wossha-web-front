import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SearchModule } from '../../components/search/search/search.module';
import { FormsModule } from '@angular/forms';
import {ClothingService} from "../../../providers/clothing/clothing.service";

@NgModule({
    imports: [ RouterModule, CommonModule, SearchModule, FormsModule ],
    declarations: [ NavbarComponent ],
    providers: [ClothingService],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
