import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { PhotoSwipeModule } from '../components/photo-swipe/photo-swipe.module';

import { EditUserComponent } from './editUser/editUser.component';
import { UserRoutes } from './user.routing';
import { SocialService } from '../../providers/social/social.service';
import { UserComponent } from './user/user.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ComponentsModule,
        PhotoSwipeModule
    ],
    declarations: [EditUserComponent, UserComponent],
    providers: [SocialService]
})

export class UserModule {}
