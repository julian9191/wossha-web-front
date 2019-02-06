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
var forms_1 = require("@angular/forms");
var angular2_multiselect_dropdown_1 = require("angular2-multiselect-dropdown/angular2-multiselect-dropdown");
var ng2_nouislider_1 = require("ng2-nouislider");
var wossha_searchcriteria_component_1 = require("./wossha.searchcriteria.component");
var SearchCriteriaModule = /** @class */ (function () {
    function SearchCriteriaModule() {
    }
    SearchCriteriaModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular2_multiselect_dropdown_1.AngularMultiSelectModule,
                ng2_nouislider_1.NouisliderModule
            ],
            exports: [wossha_searchcriteria_component_1.SearchCriteriaComponent],
            declarations: [wossha_searchcriteria_component_1.SearchCriteriaComponent],
            providers: []
        })
    ], SearchCriteriaModule);
    return SearchCriteriaModule;
}());
exports.SearchCriteriaModule = SearchCriteriaModule;
//# sourceMappingURL=searchcriteria.module.js.map