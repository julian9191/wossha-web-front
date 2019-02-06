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
var clothing_service_1 = require("../../../../providers/clothing/clothing.service");
var forms_1 = require("@angular/forms");
var user_service_1 = require("app/providers/user/user.service");
var AutocompleteComponent = /** @class */ (function () {
    function AutocompleteComponent(clothingService, userService) {
        this.clothingService = clothingService;
        this.userService = userService;
        this.matches = [];
        this.currentValue = { "id": -1, "name": this.searchValue };
        this.focusIndexElement = 0;
        this.focusIdElement = 0;
        this.showListTab = false;
        // the method set in registerOnChange to emit changes back to the form
        this.propagateChange = function (_) { };
    }
    AutocompleteComponent_1 = AutocompleteComponent;
    // this is the initial value set to the component
    AutocompleteComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.data = obj;
        }
    };
    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    AutocompleteComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // validates the form, returns null when valid else the validation object
    AutocompleteComponent.prototype.validate = function (c) {
        ;
        if (!this.required || this.searchValue) {
            this.parseError = false;
        }
        return (this.parseError === undefined || this.parseError) ? {
            error: {
                valid: false,
            },
        } : null;
    };
    // not used, used for touch input
    AutocompleteComponent.prototype.registerOnTouched = function () { };
    // change events from the datepicker
    AutocompleteComponent.prototype.onChange = function (event) {
        // get value from datepicker
        var newValue = event.target.value;
        this.verifyValue(newValue);
    };
    AutocompleteComponent.prototype.verifyValue = function (value) {
        if (value != "") {
            this.parseError = false;
        }
        else {
            this.parseError = true;
        }
        // update the form
        this.propagateChange(value);
    };
    AutocompleteComponent.prototype.search = function (word, event) {
        var _this = this;
        if (event.key == "Enter" || event.key == "ArrowDown" ||
            event.key == "ArrowUp" || event.key == "ArrowLeft" ||
            event.key == "ArrowRight") {
            return;
        }
        if (word == "") {
            this.reset();
            return;
        }
        this.loading = true;
        switch (this.searchKey) {
            case "clothing-type":
                this.clothingService.searchClothingType(word).subscribe(function (data) {
                    _this.processResponse(data);
                });
            case "clothing-category":
                this.clothingService.searchClothingCategory(word).subscribe(function (data) {
                    _this.processResponse(data);
                });
            case "brand":
                return this.clothingService.searchBrand(word).subscribe(function (data) {
                    _this.processResponse(data);
                });
            default:
        }
    };
    AutocompleteComponent.prototype.processResponse = function (data) {
        this.matches = data;
        this.loading = false;
        if (this.matches.length > 0) {
            this.focusIdElement = this.matches[this.focusIndexElement].id;
        }
    };
    AutocompleteComponent.prototype.selectItem = function (idItem) {
        var item = this.matches.filter(function (x) { return x.id == idItem; });
        if (item.length > 0) {
            this.currentValue = item[0];
            this.verifyValue(this.currentValue.name);
            this.reset();
        }
    };
    AutocompleteComponent.prototype.onArrowUp = function () {
        if (this.matches.length == 0) {
            return;
        }
        if (this.focusIndexElement > 0) {
            this.focusIndexElement--;
            this.focusIdElement = this.matches[this.focusIndexElement].id;
        }
    };
    AutocompleteComponent.prototype.onArrowDown = function () {
        if (this.matches.length == 0) {
            return;
        }
        if (this.focusIndexElement <= this.matches.length - 2) {
            this.focusIndexElement++;
            this.focusIdElement = this.matches[this.focusIndexElement].id;
        }
    };
    AutocompleteComponent.prototype.onFocusMethod = function () {
        this.showListTab = true;
    };
    AutocompleteComponent.prototype.onBlurMethod = function (e) {
        try {
            if (!e.relatedTarget.className.includes("item-search-list")) {
                this.showListTab = false;
            }
        }
        catch (err) {
            this.showListTab = false;
        }
    };
    AutocompleteComponent.prototype.reset = function () {
        this.matches = [];
        this.focusIndexElement = 0;
        this.focusIdElement = 0;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutocompleteComponent.prototype, "searchKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutocompleteComponent.prototype, "placeHolder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AutocompleteComponent.prototype, "searchValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AutocompleteComponent.prototype, "required", void 0);
    AutocompleteComponent = AutocompleteComponent_1 = __decorate([
        core_1.Component({
            selector: 'autocomplete-cmp',
            templateUrl: './autocomplete.component.html',
            styleUrls: ['./autocomplete.component.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return AutocompleteComponent_1; }),
                    multi: true,
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return AutocompleteComponent_1; }),
                    multi: true,
                }
            ]
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            user_service_1.UserService])
    ], AutocompleteComponent);
    return AutocompleteComponent;
    var AutocompleteComponent_1;
}());
exports.AutocompleteComponent = AutocompleteComponent;
//# sourceMappingURL=autocomplete.component.js.map