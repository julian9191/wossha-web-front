"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var navbar_component_1 = require("./navbar.component");
var search_module_1 = require("../../components/search/search/search.module");
var forms_1 = require("@angular/forms");
var clothing_service_1 = require("../../../providers/clothing/clothing.service");
var followRequestNotif_component_1 = require("./components/followRequestNotif/followRequestNotif.component");
var acceptFollowNotif_component_1 = require("./components/acceptFollowNotif/acceptFollowNotif.component");
var dropdownDirective_1 = require("./dropdownDirective");
//pipes
var fromDate_pipe_1 = require("../../../pipes/fromDate.pipe");
var picture_pipe_1 = require("../../../pipes/picture.pipe");
var NavbarModule = /** @class */ (function () {
    function NavbarModule() {
    }
    NavbarModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule, common_1.CommonModule, search_module_1.SearchModule, forms_1.FormsModule],
            declarations: [
                navbar_component_1.NavbarComponent,
                followRequestNotif_component_1.FollowRequestNotifComponent,
                acceptFollowNotif_component_1.AcceptFollowNotifComponent,
                dropdownDirective_1.DropdownDirective,
                fromDate_pipe_1.FromDatePipe,
                picture_pipe_1.PicturePipe
            ],
            providers: [clothing_service_1.ClothingService],
            exports: [
                navbar_component_1.NavbarComponent,
                followRequestNotif_component_1.FollowRequestNotifComponent,
                acceptFollowNotif_component_1.AcceptFollowNotifComponent,
                dropdownDirective_1.DropdownDirective
            ]
        })
    ], NavbarModule);
    return NavbarModule;
}());
exports.NavbarModule = NavbarModule;
//# sourceMappingURL=navbar.module.js.map