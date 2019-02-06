"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editUser_component_1 = require("./editUser/editUser.component");
var user_component_1 = require("./user/user.component");
exports.UserRoutes = [{
        path: '',
        children: [{
                path: 'pages/user/:username',
                component: user_component_1.UserComponent
            },
            {
                path: 'pages/user',
                component: user_component_1.UserComponent
            },
            {
                path: 'pages/edit-profile',
                component: editUser_component_1.EditUserComponent
            }]
    }];
//# sourceMappingURL=user.routing.js.map