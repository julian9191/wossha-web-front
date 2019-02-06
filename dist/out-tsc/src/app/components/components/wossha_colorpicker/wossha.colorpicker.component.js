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
var ntcjs_1 = require("ntcjs");
var clothing_service_1 = require("../../../providers/clothing/clothing.service");
var WosshaColorpickerComponent = /** @class */ (function () {
    function WosshaColorpickerComponent(clothingService) {
        this.clothingService = clothingService;
        this.color = { hexString: "" };
        // the method set in registerOnChange to emit changes back to the form
        this.propagateChange = function (_) { };
    }
    WosshaColorpickerComponent_1 = WosshaColorpickerComponent;
    // this is the initial value set to the component
    WosshaColorpickerComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.data = obj;
        }
    };
    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    WosshaColorpickerComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // validates the form, returns null when valid else the validation object
    WosshaColorpickerComponent.prototype.validate = function (c) {
        if (this.isValueValid()) {
            this.parseError = false;
        }
        else {
            this.parseError = true;
        }
        return (this.parseError === undefined || this.parseError) ? {
            error: {
                valid: false,
            },
        } : null;
    };
    WosshaColorpickerComponent.prototype.validateError = function () {
        if (this.isValueValid()) {
            this.parseError = false;
        }
        else {
            this.reset();
            this.parseError = true;
        }
        // update the form
        this.propagateChange(this.selectedColor);
    };
    WosshaColorpickerComponent.prototype.isValueValid = function () {
        if (this.selectedColor.baseColorId != "" && this.selectedColor.baseColorId !== undefined && this.selectedColor.baseColorId != null &&
            this.selectedColor.realColorHexa != "" && this.selectedColor.realColorHexa !== undefined && this.selectedColor.realColorHexa != null) {
            return true;
        }
        return false;
    };
    // not used, used for touch input
    WosshaColorpickerComponent.prototype.registerOnTouched = function () { };
    WosshaColorpickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reset();
        this.clothingService.getColorsMap().subscribe(function (data) {
            _this.colores = data;
        }, function (error) { });
        this.clothingService.getAllBaseColors().subscribe(function (data) {
            _this.baseColors = data;
        }, function (error) { });
    };
    WosshaColorpickerComponent.prototype.colorChanged = function ($event) {
        this.getApproximateColor();
        this.validateError();
    };
    WosshaColorpickerComponent.prototype.getApproximateColor = function () {
        if (!this.color) {
            return "";
        }
        var hexString = (' ' + this.color.hexString).slice(1);
        if (!hexString) {
            return "";
        }
        var n_match = ntcjs_1.default.name(hexString);
        var n_rgb = n_match[0]; // RGB value of closest match
        var n_name = n_match[1]; // Text string: Color name
        var n_exactmatch = n_match[2]; // True if exact color match
        return this.selectedColor = { "baseColorId": this.colores[n_rgb], "realColorHexa": hexString };
    };
    WosshaColorpickerComponent.prototype.reset = function () {
        this.selectedColor = { "baseColorId": "", "realColorHexa": "" };
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WosshaColorpickerComponent.prototype, "selectedColor", void 0);
    WosshaColorpickerComponent = WosshaColorpickerComponent_1 = __decorate([
        core_1.Component({
            selector: 'colorpicker-cmp',
            templateUrl: './wossha.colorpicker.component.html',
            styleUrls: ['./wossha.colorpicker.component.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return WosshaColorpickerComponent_1; }),
                    multi: true,
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return WosshaColorpickerComponent_1; }),
                    multi: true,
                }
            ]
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService])
    ], WosshaColorpickerComponent);
    return WosshaColorpickerComponent;
    var WosshaColorpickerComponent_1;
}());
exports.WosshaColorpickerComponent = WosshaColorpickerComponent;
//# sourceMappingURL=wossha.colorpicker.component.js.map