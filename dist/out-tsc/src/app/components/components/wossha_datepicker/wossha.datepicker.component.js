"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var WosshaDatepickerComponent = /** @class */ (function () {
    function WosshaDatepickerComponent() {
        // the method set in registerOnChange to emit changes back to the form
        this.propagateChange = function (_) { };
    }
    WosshaDatepickerComponent_1 = WosshaDatepickerComponent;
    WosshaDatepickerComponent.prototype.ngOnInit = function () {
        this.dateAux = this.date;
        this.resetDatepicker();
        this.datepickerColor = !this.date ? "#aaa" : "#565656";
    };
    // this is the initial value set to the component
    WosshaDatepickerComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.data = obj;
        }
    };
    WosshaDatepickerComponent.prototype.resetDatepicker = function () {
        this.date = this.dateSelected ? "" : this.dateAux;
        this.datePickerPlaceHolder = this.placeholder;
        this.datepickerColor = "#aaa";
        this.dateSelected = false;
    };
    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    WosshaDatepickerComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // validates the form, returns null when valid else the validation object
    WosshaDatepickerComponent.prototype.validate = function (c) {
        return (this.parseError === undefined || this.parseError) ? {
            error: {
                valid: false,
            },
        } : null;
    };
    // not used, used for touch input
    WosshaDatepickerComponent.prototype.registerOnTouched = function () { };
    // change events from the datepicker
    WosshaDatepickerComponent.prototype.onChange = function (event) {
        // get value from datepicker
        var newValue = event.target.value;
        if (newValue != "") {
            this.parseError = false;
        }
        else {
            this.parseError = true;
        }
        if (!newValue) {
            this.resetDatepicker();
        }
        else if (!this.dateSelected) {
            this.datePickerPlaceHolder = "";
            this.datepickerColor = "#565656";
            this.dateSelected = true;
        }
        // update the form
        this.propagateChange(newValue);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WosshaDatepickerComponent.prototype, "date", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WosshaDatepickerComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WosshaDatepickerComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WosshaDatepickerComponent.prototype, "placeholder", void 0);
    WosshaDatepickerComponent = WosshaDatepickerComponent_1 = __decorate([
        core_1.Component({
            selector: 'datepicker-cmp',
            templateUrl: './wossha.datepicker.component.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return WosshaDatepickerComponent_1; }),
                    multi: true,
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return WosshaDatepickerComponent_1; }),
                    multi: true,
                }
            ]
        })
    ], WosshaDatepickerComponent);
    return WosshaDatepickerComponent;
    var WosshaDatepickerComponent_1;
}());
exports.WosshaDatepickerComponent = WosshaDatepickerComponent;
//# sourceMappingURL=wossha.datepicker.component.js.map