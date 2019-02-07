import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }   from './app.component';
import { StorageServiceModule} from 'angular-webstorage-service';

import { SidebarModule } from './components/sidebar/sidebar.module'
import { FooterModule } from './components/shared/footer/footer.module';
import { NavbarModule} from './components/shared/navbar/navbar.module';
import { PagesnavbarModule} from './components/shared/pagesnavbar/pagesnavbar.module';
import { AdminLayoutComponent } from './components/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { NotificationsService } from './providers/notifications/notifications.service';
import { ActivateGuard } from './providers/auth/activateGuard.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpErrorHandlerService } from './providers/auth/httpErrorHandler.service';
//import { NgChatModule } from './components/wossha-chat/ng-chat.module'
import { NgChatModule } from "./components/components/ng-chat/ng-chat.module";
import { SocialService } from "./providers/social/social.service";

@NgModule({
    imports:      [
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        StorageServiceModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        SidebarModule,
        NgChatModule,
        NavbarModule,
        FooterModule,
        PagesnavbarModule,
        BrowserModule
        
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent
    ],
    providers: [NotificationsService, ActivateGuard, HttpErrorHandlerService, SocialService],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
