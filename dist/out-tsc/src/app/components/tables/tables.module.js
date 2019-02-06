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
var jw_bootstrap_switch_ng2_1 = require("jw-bootstrap-switch-ng2");
var tables_routing_1 = require("./tables.routing");
var extendedtable_component_1 = require("./extendedtable/extendedtable.component");
var regulartable_component_1 = require("./regulartable/regulartable.component");
var datatable_component_1 = require("./datatable.net/datatable.component");
var TablesModule = /** @class */ (function () {
    function TablesModule() {
    }
    TablesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(tables_routing_1.TablesRoutes),
                forms_1.FormsModule,
                jw_bootstrap_switch_ng2_1.JwBootstrapSwitchNg2Module
            ],
            declarations: [
                extendedtable_component_1.ExtendedTableComponent,
                datatable_component_1.DataTableComponent,
                regulartable_component_1.RegularTableComponent
            ]
        })
    ], TablesModule);
    return TablesModule;
}());
exports.TablesModule = TablesModule;
//# sourceMappingURL=tables.module.js.map