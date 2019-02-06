"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extendedforms_component_1 = require("./extendedforms/extendedforms.component");
var regularforms_component_1 = require("./regularforms/regularforms.component");
var validationforms_component_1 = require("./validationforms/validationforms.component");
var wizard_component_1 = require("./wizard/wizard.component");
exports.FormsRoutes = [
    {
        path: '',
        children: [{
                path: 'regular',
                component: regularforms_component_1.RegularFormsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'extended',
                component: extendedforms_component_1.ExtendedFormsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'validation',
                component: validationforms_component_1.ValidationFormsComponent
            }]
    }, {
        path: '',
        children: [{
                path: 'wizard',
                component: wizard_component_1.WizardComponent
            }]
    }
];
//# sourceMappingURL=forms.routing.js.map