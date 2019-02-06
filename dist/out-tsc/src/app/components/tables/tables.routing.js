"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extendedtable_component_1 = require("./extendedtable/extendedtable.component");
var regulartable_component_1 = require("./regulartable/regulartable.component");
var datatable_component_1 = require("./datatable.net/datatable.component");
exports.TablesRoutes = [{
        path: '',
        children: [{
                path: 'regular',
                component: regulartable_component_1.RegularTableComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'extended',
                component: extendedtable_component_1.ExtendedTableComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'datatables.net',
                component: datatable_component_1.DataTableComponent
            }]
    }
];
//# sourceMappingURL=tables.routing.js.map