import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import {UserService} from "../../../providers/user/user.service";

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ NavbarComponent ],
    providers: [UserService],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
