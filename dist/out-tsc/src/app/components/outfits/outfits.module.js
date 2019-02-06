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
var ngx_chips_1 = require("ngx-chips");
var searchcriteria_module_1 = require("../components/search_criteria/searchcriteria.module");
var outfits_component_1 = require("./outfits.component");
var outfits_routing_1 = require("./outfits.routing");
var clothing_service_1 = require("../../providers/clothing/clothing.service");
var photo_swipe_module_1 = require("../components/photo-swipe/photo-swipe.module");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var datePopup_component_1 = require("./popup/datePopup.component");
var calendar_service_1 = require("../../providers/clothing/calendar.service");
var notifications_service_1 = require("../../providers/notifications/notifications.service");
var OutfitsModule = /** @class */ (function () {
    function OutfitsModule() {
    }
    OutfitsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(outfits_routing_1.OutfitsRoutes),
                forms_1.FormsModule,
                ngx_chips_1.TagInputModule,
                searchcriteria_module_1.SearchCriteriaModule,
                photo_swipe_module_1.PhotoSwipeModule,
                ng2_bootstrap_modal_1.BootstrapModalModule
            ],
            entryComponents: [
                datePopup_component_1.DatePopup
            ],
            declarations: [outfits_component_1.OutfitsComponent, datePopup_component_1.DatePopup],
            providers: [clothing_service_1.ClothingService, calendar_service_1.CalendarService, notifications_service_1.NotificationsService]
        })
    ], OutfitsModule);
    return OutfitsModule;
}());
exports.OutfitsModule = OutfitsModule;
//# sourceMappingURL=outfits.module.js.map