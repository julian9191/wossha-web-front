import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { EditUserComponent } from './editUser/editUser.component';
import { UserRoutes } from './user.routing';

import { UserComponent } from './user/user.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ComponentsModule
    ],
    declarations: [EditUserComponent, UserComponent]
})

export class UserModule {}
