import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from "../../providers/user/user.service";
import { SocialService } from '../../providers/social/social.service';
import { PagesRoutes } from './pages.routing';

import { RegisterComponent } from './register/register.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        LockComponent
    ],
    providers: [UserService, SocialService]
})

export class PagesModule {}
