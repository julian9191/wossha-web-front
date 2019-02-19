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
import { NgChatModule } from "./components/components/ng-chat/ng-chat.module";
import { SocialService } from "./providers/social/social.service";

// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

// Environment
import { environment } from '../environments/environment';

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
        BrowserModule,
        StoreModule.forRoot(appReducers),
        StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
        }),
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
