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
var searchCriteriaParams_1 = require("app/models/clothing/searchCriteria/searchCriteriaParams");
var clothing_service_1 = require("app/providers/clothing/clothing.service");
var notifications_service_1 = require("app/providers/notifications/notifications.service");
var user_service_1 = require("app/providers/user/user.service");
var searchCriteriaResult_1 = require("app/models/clothing/searchCriteria/searchCriteriaResult");
var forms_1 = require("@angular/forms");
var SearchCriteriaComponent = /** @class */ (function () {
    function SearchCriteriaComponent(clothingService, notificationsService, userService) {
        this.clothingService = clothingService;
        this.notificationsService = notificationsService;
        this.userService = userService;
        this.searchCriteriaParams = new searchCriteriaParams_1.SearchCriteriaParams();
        this.searchCriteriaResult = new searchCriteriaResult_1.SearchCriteriaResult();
        this.typesSettings = {};
        this.categoriesSettings = {};
        this.brandsSettings = {};
        this.colorsSettings = {};
        this.howLike = 5;
        // the method set in registerOnChange to emit changes back to the form
        this.propagateChange = function (_) { };
        clothingService.setToken(userService.getToken());
    }
    SearchCriteriaComponent_1 = SearchCriteriaComponent;
    SearchCriteriaComponent.prototype.ngOnInit = function () {
        this.getSearchCriteriaParams();
        this.typesSettings = {
            text: "Tipos de prenda",
            selectAllText: 'Seleccionar todo',
            unSelectAllText: 'reestablecer',
            classes: "btn-warning btn-block"
        };
        this.categoriesSettings = Object.assign({}, this.typesSettings);
        this.categoriesSettings.text = "Categoías";
        this.brandsSettings = Object.assign({}, this.typesSettings);
        this.brandsSettings.text = "Marcas";
        this.colorsSettings = Object.assign({}, this.typesSettings);
        this.colorsSettings.text = "Colores";
    };
    SearchCriteriaComponent.prototype.getSearchCriteriaParams = function () {
        var _this = this;
        this.clothingService.getSearchCriteriaParams().subscribe(function (data) {
            _this.searchCriteriaParams = data;
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", _this.notificationsService.DANGER);
        });
    };
    // this is the initial value set to the component
    SearchCriteriaComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.data = obj;
        }
    };
    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    SearchCriteriaComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    // validates the form, returns null when valid else the validation object
    SearchCriteriaComponent.prototype.validate = function (c) {
        return (this.parseError === undefined || this.parseError) ? {
            error: {
                valid: false,
            },
        } : null;
    };
    // not used, used for touch input
    SearchCriteriaComponent.prototype.registerOnTouched = function () { };
    // change events from the datepicker
    SearchCriteriaComponent.prototype.onChange = function () {
        // update the form
        this.propagateChange(this.searchCriteriaResult);
    };
    SearchCriteriaComponent.prototype.onItemSelect = function (item) {
        this.onChange();
    };
    SearchCriteriaComponent.prototype.OnItemDeSelect = function (item) {
        this.onChange();
    };
    SearchCriteriaComponent.prototype.onSelectAll = function (items) {
        this.onChange();
    };
    SearchCriteriaComponent.prototype.onDeSelectAll = function (items) {
        this.onChange();
    };
    SearchCriteriaComponent.prototype.showTypes = function () {
        this.searchCriteriaResult.showTypes = !this.searchCriteriaResult.showTypes;
        if (!this.searchCriteriaResult.showTypes) {
            this.searchCriteriaResult.types = [];
        }
        this.onChange();
    };
    SearchCriteriaComponent.prototype.showCategories = function () {
        this.searchCriteriaResult.showCategories = !this.searchCriteriaResult.showCategories;
        if (!this.searchCriteriaResult.showCategories) {
            this.searchCriteriaResult.categories = [];
        }
        this.onChange();
    };
    SearchCriteriaComponent.prototype.showBrands = function () {
        this.searchCriteriaResult.showBrands = !this.searchCriteriaResult.showBrands;
        if (!this.searchCriteriaResult.showBrands) {
            this.searchCriteriaResult.brands = [];
        }
        this.onChange();
    };
    SearchCriteriaComponent.prototype.showColors = function () {
        this.searchCriteriaResult.showColors = !this.searchCriteriaResult.showColors;
        if (!this.searchCriteriaResult.showColors) {
            this.searchCriteriaResult.colors = [];
        }
        this.onChange();
    };
    SearchCriteriaComponent.prototype.showcHowLike = function () {
        this.searchCriteriaResult.showcHowLike = !this.searchCriteriaResult.showcHowLike;
        if (this.searchCriteriaResult.showcHowLike) {
            this.searchCriteriaResult.howLike = 5;
        }
        else {
            this.searchCriteriaResult.howLike = "";
        }
        this.onChange();
    };
    SearchCriteriaComponent.prototype.showNoWearingDays = function () {
        this.searchCriteriaResult.showNoWearingDays = !this.searchCriteriaResult.showNoWearingDays;
        if (!this.searchCriteriaResult.showNoWearingDays) {
            this.searchCriteriaResult.noWearingDaysSimbol = "";
            this.searchCriteriaResult.noWearingDays = "";
        }
        this.onChange();
    };
    SearchCriteriaComponent = SearchCriteriaComponent_1 = __decorate([
        core_1.Component({
            selector: 'searchcriteria-cmp',
            templateUrl: './wossha.searchcriteria.component.html',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return SearchCriteriaComponent_1; }),
                    multi: true,
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return SearchCriteriaComponent_1; }),
                    multi: true,
                }
            ]
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            notifications_service_1.NotificationsService,
            user_service_1.UserService])
    ], SearchCriteriaComponent);
    return SearchCriteriaComponent;
    var SearchCriteriaComponent_1;
}());
exports.SearchCriteriaComponent = SearchCriteriaComponent;
//# sourceMappingURL=wossha.searchcriteria.component.js.map