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
var lbd_module_1 = require("../lbd/lbd.module");
var charts_component_1 = require("./charts.component");
var charts_routing_1 = require("./charts.routing");
var ChartsModule = /** @class */ (function () {
    function ChartsModule() {
    }
    ChartsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(charts_routing_1.ChartsRoutes),
                forms_1.FormsModule,
                lbd_module_1.LbdModule
            ],
            declarations: [charts_component_1.ChartsComponent]
        })
    ], ChartsModule);
    return ChartsModule;
}());
exports.ChartsModule = ChartsModule;
//# sourceMappingURL=charts.module.js.map