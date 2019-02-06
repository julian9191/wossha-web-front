"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var listClothing_component_1 = require("./list_clothing/listClothing.component");
var createClothe_component_1 = require("./create_clothe/createClothe.component");
var vieweClothe_component_1 = require("./viewe_clothe/vieweClothe.component");
var editClothe_component_1 = require("./edit_clothe/editClothe.component");
var statistics_component_1 = require("./statistics/statistics.component");
exports.ClothingRoutes = [{
        path: '',
        children: [{
                path: 'list-clothing',
                component: listClothing_component_1.ListClothingComponent
            },
            {
                path: 'statistics',
                component: statistics_component_1.StatisticsComponent
            },
            {
                path: 'create-clothe',
                component: createClothe_component_1.CreateClotheComponent
            },
            {
                path: 'view-clothe/:uuid',
                component: vieweClothe_component_1.VieweClotheComponent
            },
            {
                path: 'edit-clothe/:uuid',
                component: editClothe_component_1.EditClotheComponent
            }]
    }
];
//# sourceMappingURL=clothing.routing.js.map