"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/filter");
var navbar_component_1 = require("../../shared/navbar/navbar.component");
var AdminLayoutComponent = /** @class */ (function () {
    function AdminLayoutComponent(router, location) {
        this.router = router;
        this.location = location;
    }
    AdminLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._router = this.router.events.filter(function (event) { return event instanceof router_1.NavigationEnd; }).subscribe(function (event) {
            //   this.url = event.url;
            _this.navbar.sidebarClose();
        });
        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows) {
            // if we are on windows OS we activate the perfectScrollbar function
            var $main_panel = $('.main-panel');
            $main_panel.perfectScrollbar();
        }
    };
    AdminLayoutComponent.prototype.isMap = function () {
        if (window.location.pathname.indexOf("/maps/fullscreen") !== -1) {
            return true;
        }
        else {
            return false;
        }
    };
    __decorate([
        core_1.ViewChild('sidebar'),
        __metadata("design:type", Object)
    ], AdminLayoutComponent.prototype, "sidebar", void 0);
    __decorate([
        core_1.ViewChild(navbar_component_1.NavbarComponent),
        __metadata("design:type", navbar_component_1.NavbarComponent)
    ], AdminLayoutComponent.prototype, "navbar", void 0);
    AdminLayoutComponent = __decorate([
        core_1.Component({
            selector: 'app-layout',
            templateUrl: './admin-layout.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, common_1.Location])
    ], AdminLayoutComponent);
    return AdminLayoutComponent;
}());
exports.AdminLayoutComponent = AdminLayoutComponent;
//# sourceMappingURL=admin-layout.component.js.map