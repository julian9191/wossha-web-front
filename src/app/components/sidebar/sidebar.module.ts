import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { UrlDecodePipe } from '../../pipes/urlDecode.pipe.';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarComponent, UrlDecodePipe ],
    exports: [ SidebarComponent ]
})

export class SidebarModule {}
