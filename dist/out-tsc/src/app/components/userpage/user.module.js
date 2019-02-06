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
var components_module_1 = require("../components/components.module");
var photo_swipe_module_1 = require("../components/photo-swipe/photo-swipe.module");
var editUser_component_1 = require("./editUser/editUser.component");
var user_routing_1 = require("./user.routing");
var social_service_1 = require("../../providers/social/social.service");
var user_component_1 = require("./user/user.component");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(user_routing_1.UserRoutes),
                forms_1.FormsModule,
                components_module_1.ComponentsModule,
                photo_swipe_module_1.PhotoSwipeModule
            ],
            declarations: [editUser_component_1.EditUserComponent, user_component_1.UserComponent],
            providers: [social_service_1.SocialService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map