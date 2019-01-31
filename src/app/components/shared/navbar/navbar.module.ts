import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SearchModule } from '../../components/search/search/search.module';
import { FormsModule } from '@angular/forms';
import { ClothingService } from "../../../providers/clothing/clothing.service";
import { FollowRequestNotifComponent } from './components/followRequestNotif/followRequestNotif.component';

//pipes
import { FromDatePipe } from "../../../pipes/fromDate.pipe";
import { PicturePipe } from "../../../pipes/picture.pipe";

@NgModule({
    imports: [ RouterModule, CommonModule, SearchModule, FormsModule ],
    declarations: [ 
        NavbarComponent, 
        FollowRequestNotifComponent, 
        FromDatePipe, 
        PicturePipe 
    ],
    providers: [ClothingService],
    exports: [ NavbarComponent, FollowRequestNotifComponent ]
})

export class NavbarModule {}
