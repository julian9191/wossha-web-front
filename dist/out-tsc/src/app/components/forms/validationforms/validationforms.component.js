"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValidationFormsComponent = /** @class */ (function () {
    function ValidationFormsComponent() {
    }
    ValidationFormsComponent.prototype.ngOnInit = function () {
        this.register = {
            email: '',
            password: '',
            confirmPassword: ''
        };
        this.login = {
            email: '',
            password: ''
        };
        this.typeValidation = {
            text: '',
            email: '',
            idSource: '',
            idDestination: '',
            url: ''
        };
    };
    ValidationFormsComponent.prototype.save = function (model, isValid) {
        // call API to save customer
        if (isValid) {
            console.log(model, isValid);
        }
    };
    ValidationFormsComponent.prototype.save1 = function (model, isValid) {
        // call API to save customer
        if (isValid) {
            console.log(model, isValid);
        }
    };
    ValidationFormsComponent.prototype.save2 = function (model, isValid) {
        // call API to save customer
        if (isValid) {
            console.log(model, isValid);
        }
    };
    ValidationFormsComponent.prototype.onSubmit = function (value) {
        console.log(value);
    };
    ValidationFormsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'validationforms-cmp',
            templateUrl: 'validationforms.component.html'
        })
    ], ValidationFormsComponent);
    return ValidationFormsComponent;
}());
exports.ValidationFormsComponent = ValidationFormsComponent;
//# sourceMappingURL=validationforms.component.js.map