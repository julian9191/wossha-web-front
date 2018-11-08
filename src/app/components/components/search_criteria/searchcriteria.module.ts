import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NouisliderModule } from 'ng2-nouislider';
import { SearchCriteriaComponent } from './wossha.searchcriteria.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularMultiSelectModule,
        NouisliderModule
    ],
    exports: [SearchCriteriaComponent],
    declarations: [SearchCriteriaComponent],
    providers: []
})

export class SearchCriteriaModule {}
