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
var router_1 = require("@angular/router");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(clothingService, userService, router) {
        this.clothingService = clothingService;
        this.userService = userService;
        this.router = router;
        this.matches = [];
        this.currentValue = { "id": "", "name": this.searchValue };
        this.focusIndexElement = 0;
        this.focusIdElement = "";
        this.showListTab = false;
        this.defaultProfilePicture = "../../assets/img/default-avatar.png";
        // the method set in registerOnChange to emit changes back to the form
        this.propagateChange = function (_) { };
        userService.setHeaderToken();
        clothingService.setToken(userService.getToken());
    }
    SearchComponent_1 = SearchComponent;
    // this is the initial value set to the component
    SearchComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.data = obj;
        }
    };
    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    SearchComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // validates the form, returns null when valid else the validation object
    SearchComponent.prototype.validate = function (c) {
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
    SearchComponent.prototype.registerOnTouched = function () { };
    // change events from the datepicker
    SearchComponent.prototype.onChange = function (event) {
        // get value from datepicker
        var newValue = event.target.value;
        this.verifyValue(newValue);
    };
    SearchComponent.prototype.verifyValue = function (value) {
        if (value != "") {
            this.parseError = false;
        }
        else {
            this.parseError = true;
        }
        // update the form
        this.propagateChange(value);
    };
    SearchComponent.prototype.search = function (word, event) {
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
            case "search-user":
                return this.userService.searchUser(word).subscribe(function (data) {
                    _this.processResponse(data);
                });
            default:
        }
    };
    SearchComponent.prototype.processResponse = function (data) {
        this.matches = data;
        this.loading = false;
        if (this.matches.length > 0) {
            this.focusIdElement = this.matches[this.focusIndexElement].username;
        }
    };
    SearchComponent.prototype.selectItem = function (usernameItem) {
        var item = this.matches.filter(function (x) { return x.username == usernameItem; });
        if (item.length > 0) {
            this.currentValue = item[0];
            this.verifyValue(this.currentValue.name);
            this.reset();
            this.router.navigate(['pages', 'user', usernameItem]);
        }
    };
    SearchComponent.prototype.onArrowUp = function () {
        if (this.matches.length == 0) {
            return;
        }
        if (this.focusIndexElement > 0) {
            this.focusIndexElement--;
            this.focusIdElement = this.matches[this.focusIndexElement].username;
        }
    };
    SearchComponent.prototype.onArrowDown = function () {
        if (this.matches.length == 0) {
            return;
        }
        if (this.focusIndexElement <= this.matches.length - 2) {
            this.focusIndexElement++;
            this.focusIdElement = this.matches[this.focusIndexElement].username;
        }
    };
    SearchComponent.prototype.onFocusMethod = function () {
        this.showListTab = true;
    };
    SearchComponent.prototype.onBlurMethod = function (e) {
        try {
            if (!e.relatedTarget.className.includes("item-search-list")) {
                this.showListTab = false;
            }
        }
        catch (err) {
            this.showListTab = false;
        }
    };
    SearchComponent.prototype.getProfileImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return this.defaultProfilePicture;
        }
    };
    SearchComponent.prototype.reset = function () {
        this.matches = [];
        this.focusIndexElement = 0;
        this.focusIdElement = "";
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SearchComponent.prototype, "searchKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SearchComponent.prototype, "placeHolder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SearchComponent.prototype, "searchValue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SearchComponent.prototype, "required", void 0);
    SearchComponent = SearchComponent_1 = __decorate([
        core_1.Component({
            selector: 'search-cmp',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return SearchComponent_1; }),
                    multi: true,
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return SearchComponent_1; }),
                    multi: true,
                }
            ]
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            user_service_1.UserService,
            router_1.Router])
    ], SearchComponent);
    return SearchComponent;
    var SearchComponent_1;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map