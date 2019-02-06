"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations"); // this is needed!
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var http_2 = require("@angular/common/http");
var app_component_1 = require("./app.component");
var angular_webstorage_service_1 = require("angular-webstorage-service");
var sidebar_module_1 = require("./components/sidebar/sidebar.module");
var footer_module_1 = require("./components/shared/footer/footer.module");
var navbar_module_1 = require("./components/shared/navbar/navbar.module");
var pagesnavbar_module_1 = require("./components/shared/pagesnavbar/pagesnavbar.module");
var admin_layout_component_1 = require("./components/layouts/admin/admin-layout.component");
var auth_layout_component_1 = require("./components/layouts/auth/auth-layout.component");
var app_routing_1 = require("./app.routing");
var notifications_service_1 = require("./providers/notifications/notifications.service");
var activateGuard_service_1 = require("./providers/auth/activateGuard.service");
var platform_browser_1 = require("@angular/platform-browser");
var httpErrorHandler_service_1 = require("./providers/auth/httpErrorHandler.service");
var ng_chat_module_1 = require("./components/components/ng-chat/ng-chat.module");
var social_service_1 = require("./providers/social/social.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                animations_1.BrowserAnimationsModule,
                http_2.HttpClientModule,
                forms_1.FormsModule,
                angular_webstorage_service_1.StorageServiceModule,
                router_1.RouterModule.forRoot(app_routing_1.AppRoutes),
                http_1.HttpModule,
                sidebar_module_1.SidebarModule,
                navbar_module_1.NavbarModule,
                footer_module_1.FooterModule,
                pagesnavbar_module_1.PagesnavbarModule,
                platform_browser_1.BrowserModule,
                ng_chat_module_1.NgChatModule
            ],
            declarations: [
                app_component_1.AppComponent,
                admin_layout_component_1.AdminLayoutComponent,
                auth_layout_component_1.AuthLayoutComponent
            ],
            providers: [notifications_service_1.NotificationsService, activateGuard_service_1.ActivateGuard, httpErrorHandler_service_1.HttpErrorHandlerService, social_service_1.SocialService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map