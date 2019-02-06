import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { EditUserComponent } from './editUser/editUser.component';
import { UserRoutes } from './user.routing';
import { SocialService } from '../../providers/social/social.service';
import { UserComponent } from './user/user.component';
import {CrystalGalleryModule} from 'ngx-crystal-gallery';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ComponentsModule,
        CrystalGalleryModule
    ],
    declarations: [EditUserComponent, UserComponent],
    providers: [SocialService]
})

export class UserModule {}
