"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var user_service_1 = require("../../providers/user/user.service");
var social_service_1 = require("../../providers/social/social.service");
var pages_routing_1 = require("./pages.routing");
var register_component_1 = require("./register/register.component");
var lock_component_1 = require("./lock/lock.component");
var login_component_1 = require("./login/login.component");
var components_module_1 = require("../components/components.module");
var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(pages_routing_1.PagesRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                components_module_1.ComponentsModule
            ],
            declarations: [
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                lock_component_1.LockComponent
            ],
            providers: [user_service_1.UserService, social_service_1.SocialService]
        })
    ], PagesModule);
    return PagesModule;
}());
exports.PagesModule = PagesModule;
//# sourceMappingURL=pages.module.js.map