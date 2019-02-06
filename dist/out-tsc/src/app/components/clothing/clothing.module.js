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
var clothing_service_1 = require("../../providers/clothing/clothing.service");
var pictures_service_1 = require("../../providers/pictures/pictures.service");
var ng2_nouislider_1 = require("ng2-nouislider");
var listClothing_component_1 = require("./list_clothing/listClothing.component");
var createClothe_component_1 = require("./create_clothe/createClothe.component");
var vieweClothe_component_1 = require("./viewe_clothe/vieweClothe.component");
var editClothe_component_1 = require("./edit_clothe/editClothe.component");
var clothing_routing_1 = require("./clothing.routing");
var photo_swipe_module_1 = require("../components/photo-swipe/photo-swipe.module");
var searchcriteria_module_1 = require("../components/search_criteria/searchcriteria.module");
var lbd_module_1 = require("../lbd/lbd.module");
var calendar_service_1 = require("../../providers/clothing/calendar.service");
var statistics_service_1 = require("../../providers/clothing/statistics.service");
var statistics_component_1 = require("./statistics/statistics.component");
var ClothingModule = /** @class */ (function () {
    function ClothingModule() {
    }
    ClothingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(clothing_routing_1.ClothingRoutes),
                forms_1.FormsModule,
                ng2_nouislider_1.NouisliderModule,
                components_module_1.ComponentsModule,
                photo_swipe_module_1.PhotoSwipeModule,
                searchcriteria_module_1.SearchCriteriaModule,
                lbd_module_1.LbdModule
            ],
            declarations: [
                listClothing_component_1.ListClothingComponent,
                createClothe_component_1.CreateClotheComponent,
                vieweClothe_component_1.VieweClotheComponent,
                editClothe_component_1.EditClotheComponent,
                statistics_component_1.StatisticsComponent
            ],
            providers: [clothing_service_1.ClothingService, pictures_service_1.PicturesService, calendar_service_1.CalendarService, statistics_service_1.StatisticsService]
        })
    ], ClothingModule);
    return ClothingModule;
}());
exports.ClothingModule = ClothingModule;
//# sourceMappingURL=clothing.module.js.map