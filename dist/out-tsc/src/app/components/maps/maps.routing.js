"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fullscreenmap_component_1 = require("./fullscreenmap/fullscreenmap.component");
var googlemaps_component_1 = require("./googlemaps/googlemaps.component");
var vectormaps_component_1 = require("./vectormaps/vectormaps.component");
exports.MapsRoutes = [{
        path: '',
        children: [{
                path: 'fullscreen',
                component: fullscreenmap_component_1.FullScreenMapsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'google',
                component: googlemaps_component_1.GoogleMapsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'vector',
                component: vectormaps_component_1.VectorMapsComponent
            }]
    }
];
//# sourceMappingURL=maps.routing.js.map