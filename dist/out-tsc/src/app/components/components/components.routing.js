"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buttons_component_1 = require("./buttons/buttons.component");
var grid_component_1 = require("./grid/grid.component");
var icons_component_1 = require("./icons/icons.component");
var panels_component_1 = require("./panels/panels.component");
var sweetalert_component_1 = require("./sweetalert/sweetalert.component");
var typography_component_1 = require("./typography/typography.component");
exports.ComponentsRoutes = [{
        path: '',
        children: [{
                path: 'buttons',
                component: buttons_component_1.ButtonsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'grid',
                component: grid_component_1.GridSystemComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'icons',
                component: icons_component_1.IconsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'panels',
                component: panels_component_1.PanelsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'sweet-alert',
                component: sweetalert_component_1.SweetAlertComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'typography',
                component: typography_component_1.TypographyComponent
            }]
    }
];
//# sourceMappingURL=components.routing.js.map