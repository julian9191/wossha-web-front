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
var map_1 = require("@ngui/map");
var maps_routing_1 = require("./maps.routing");
var fullscreenmap_component_1 = require("./fullscreenmap/fullscreenmap.component");
var googlemaps_component_1 = require("./googlemaps/googlemaps.component");
var vectormaps_component_1 = require("./vectormaps/vectormaps.component");
var MapsModule = /** @class */ (function () {
    function MapsModule() {
    }
    MapsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(maps_routing_1.MapsRoutes),
                forms_1.FormsModule,
                map_1.NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE' })
            ],
            declarations: [
                fullscreenmap_component_1.FullScreenMapsComponent,
                googlemaps_component_1.GoogleMapsComponent,
                vectormaps_component_1.VectorMapsComponent
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], MapsModule);
    return MapsModule;
}());
exports.MapsModule = MapsModule;
//# sourceMappingURL=maps.module.js.map