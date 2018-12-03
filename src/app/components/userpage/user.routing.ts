import { Routes } from '@angular/router';

import { EditUserComponent } from './editUser/editUser.component';
import { UserComponent } from './user/user.component';

export const UserRoutes: Routes = [{
    path: '',
    children: [{
        path: 'pages/user/:username',
        component: UserComponent
    },
    {
        path: 'pages/user',
        component: UserComponent
    },
    {
        path: 'pages/edit-profile',
        component: EditUserComponent
    }]
}];
