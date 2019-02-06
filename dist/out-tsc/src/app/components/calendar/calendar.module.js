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
var clothing_service_1 = require("../../providers/clothing/clothing.service");
var calendar_service_1 = require("../../providers/clothing/calendar.service");
var notifications_service_1 = require("../../providers/notifications/notifications.service");
var calendar_component_1 = require("./calendar.component");
var calendar_routing_1 = require("./calendar.routing");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var dayPopup_component_1 = require("./popup/dayPopup.component");
var angular2_multiselect_dropdown_1 = require("angular2-multiselect-dropdown/angular2-multiselect-dropdown");
var ng2_nouislider_1 = require("ng2-nouislider");
var searchcriteria_module_1 = require("../components/search_criteria/searchcriteria.module");
var addCalendar_component_1 = require("./popup/addcalendar/addCalendar.component");
var photo_swipe_module_1 = require("../components/photo-swipe/photo-swipe.module");
var CalendarModule = /** @class */ (function () {
    function CalendarModule() {
    }
    CalendarModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(calendar_routing_1.CalendarRoutes),
                forms_1.FormsModule,
                ng2_bootstrap_modal_1.BootstrapModalModule,
                angular2_multiselect_dropdown_1.AngularMultiSelectModule,
                ng2_nouislider_1.NouisliderModule,
                searchcriteria_module_1.SearchCriteriaModule,
                photo_swipe_module_1.PhotoSwipeModule
            ],
            entryComponents: [
                dayPopup_component_1.DayPopup,
                addCalendar_component_1.AddCalendarComponent
            ],
            declarations: [
                calendar_component_1.CalendarComponent,
                dayPopup_component_1.DayPopup,
                addCalendar_component_1.AddCalendarComponent
            ],
            providers: [clothing_service_1.ClothingService, notifications_service_1.NotificationsService, calendar_service_1.CalendarService]
        })
    ], CalendarModule);
    return CalendarModule;
}());
exports.CalendarModule = CalendarModule;
//# sourceMappingURL=calendar.module.js.map