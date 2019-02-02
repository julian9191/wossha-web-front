import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SearchModule } from '../../components/search/search/search.module';
import { FormsModule } from '@angular/forms';
import { ClothingService } from "../../../providers/clothing/clothing.service";
import { FollowRequestNotifComponent } from './components/followRequestNotif/followRequestNotif.component';
import { AcceptFollowNotifComponent } from './components/acceptFollowNotif/acceptFollowNotif.component';
import { DropdownDirective } from './dropdownDirective';

//pipes
import { FromDatePipe } from "../../../pipes/fromDate.pipe";
import { PicturePipe } from "../../../pipes/picture.pipe";

@NgModule({
    imports: [ RouterModule, CommonModule, SearchModule, FormsModule ],
    declarations: [ 
        NavbarComponent, 
        FollowRequestNotifComponent,
        AcceptFollowNotifComponent,
        DropdownDirective, 
        FromDatePipe, 
        PicturePipe 
    ],
    providers: [ClothingService],
    exports: [ 
        NavbarComponent, 
        FollowRequestNotifComponent, 
        AcceptFollowNotifComponent,
        DropdownDirective
    ]
})

export class NavbarModule {}
