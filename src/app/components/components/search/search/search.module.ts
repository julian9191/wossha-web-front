import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from "../../../../providers/user/user.service";

import { SearchComponent } from './search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [SearchComponent],
    declarations: [SearchComponent],
    providers: [UserService]
})

export class SearchModule {}
