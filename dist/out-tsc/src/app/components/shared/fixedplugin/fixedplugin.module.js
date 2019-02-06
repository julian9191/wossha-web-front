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
var fixedplugin_component_1 = require("./fixedplugin.component");
var jw_bootstrap_switch_ng2_1 = require("jw-bootstrap-switch-ng2");
var forms_1 = require("@angular/forms");
var FixedPluginModule = /** @class */ (function () {
    function FixedPluginModule() {
    }
    FixedPluginModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule, common_1.CommonModule, forms_1.FormsModule, jw_bootstrap_switch_ng2_1.JwBootstrapSwitchNg2Module],
            declarations: [fixedplugin_component_1.FixedPluginComponent],
            exports: [fixedplugin_component_1.FixedPluginComponent]
        })
    ], FixedPluginModule);
    return FixedPluginModule;
}());
exports.FixedPluginModule = FixedPluginModule;
//# sourceMappingURL=fixedplugin.module.js.map