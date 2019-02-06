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
var http_1 = require("@angular/common/http");
var globals_1 = require("../../globals");
var router_1 = require("@angular/router");
require("rxjs");
var ClothingService = /** @class */ (function () {
    function ClothingService(router, http) {
        this.router = router;
        this.http = http;
        this.TOKEN_PREFIX = "Bearer ";
        this.commandsUrl = globals_1.CLOTHING_PATH + 'commands';
        this.clothingUrl = globals_1.CLOTHING_PATH + 'clouthing/';
        this.clothingTypeUrl = this.clothingUrl + 'clothing-types';
        this.clothingCategoryUrl = this.clothingUrl + 'clothing-categories';
        this.clothingTypeSearchUrl = this.clothingUrl + 'search-clouthing-type';
        this.clothingCategorySearchUrl = this.clothingUrl + 'search-clouthing-category';
        this.clothingBrandSearchUrl = this.clothingUrl + 'search-brand';
        this.BaseColorUrl = this.clothingUrl + 'base-colors';
        this.colorsMapUrl = this.clothingUrl + 'colors-map';
        this.userClothesUrl = this.clothingUrl + 'clothes';
        this.clotheUrl = this.clothingUrl + 'clothe';
        this.clotheViewUrl = this.clothingUrl + 'clothe-view';
        this.searchCriteriaParamsUrl = this.clothingUrl + 'search-criteria-params';
        this.getOutfitUrl = this.clothingUrl + 'outfit';
        this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    }
    ClothingService.prototype.setToken = function (token) {
        this.TOKEN = token;
        this.setHeaderToken();
    };
    ClothingService.prototype.setHeaderToken = function () {
        if (!this.httpHeaders.get("Authorization")) {
            this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.TOKEN_PREFIX + this.TOKEN });
        }
    };
    ClothingService.prototype.getAllClothingTypes = function () {
        return this.http.get(this.clothingTypeUrl, { headers: this.httpHeaders });
    };
    ClothingService.prototype.getAllClothingCategories = function () {
        return this.http.get(this.clothingCategoryUrl, { headers: this.httpHeaders });
    };
    ClothingService.prototype.getAllBaseColors = function () {
        return this.http.get(this.BaseColorUrl, { headers: this.httpHeaders });
    };
    ClothingService.prototype.getColorsMap = function () {
        return this.http.get(this.colorsMapUrl, { headers: this.httpHeaders });
    };
    ClothingService.prototype.getClothes = function (searchCriteriaResult, orderedBy, params) {
        return this.http.post(this.userClothesUrl + "/" + orderedBy, searchCriteriaResult, { params: params, headers: this.httpHeaders });
    };
    ClothingService.prototype.getClotheByUuid = function (uuid) {
        return this.http.get(this.clotheUrl + "/" + uuid, { headers: this.httpHeaders });
    };
    ClothingService.prototype.getClotheViewByUuid = function (uuid) {
        return this.http.get(this.clotheViewUrl + "/" + uuid, { headers: this.httpHeaders });
    };
    ClothingService.prototype.searchClothingType = function (word) {
        return this.http.get(this.clothingTypeSearchUrl + "/" + word, { headers: this.httpHeaders });
    };
    ClothingService.prototype.searchClothingCategory = function (word) {
        return this.http.get(this.clothingCategorySearchUrl + "/" + word, { headers: this.httpHeaders });
    };
    ClothingService.prototype.searchBrand = function (word) {
        return this.http.get(this.clothingBrandSearchUrl + "/" + word, { headers: this.httpHeaders });
    };
    ClothingService.prototype.getSearchCriteriaParams = function () {
        return this.http.get(this.searchCriteriaParamsUrl, { headers: this.httpHeaders });
    };
    ClothingService.prototype.getOutfit = function (searchCriteriaResult, params) {
        return this.http.post(this.getOutfitUrl, searchCriteriaResult, { params: params, headers: this.httpHeaders });
    };
    ClothingService.prototype.executeCommand = function (data) {
        return this.http.post(this.commandsUrl, data, { headers: this.httpHeaders });
    };
    ClothingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            http_1.HttpClient])
    ], ClothingService);
    return ClothingService;
}());
exports.ClothingService = ClothingService;
//# sourceMappingURL=clothing.service.js.map