"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var register_component_1 = require("./register/register.component");
var lock_component_1 = require("./lock/lock.component");
var login_component_1 = require("./login/login.component");
exports.PagesRoutes = [{
        path: '',
        children: [{
                path: 'login',
                component: login_component_1.LoginComponent
            }, {
                path: 'lock',
                component: lock_component_1.LockComponent
            }, {
                path: 'register',
                component: register_component_1.RegisterComponent
            }]
    }];
//# sourceMappingURL=pages.routing.js.map