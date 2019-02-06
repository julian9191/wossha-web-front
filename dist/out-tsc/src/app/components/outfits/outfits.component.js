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
var searchCriteriaResult_1 = require("app/models/clothing/searchCriteria/searchCriteriaResult");
var user_service_1 = require("app/providers/user/user.service");
var notifications_service_1 = require("app/providers/notifications/notifications.service");
var clothing_service_1 = require("app/providers/clothing/clothing.service");
var photo_swipe_component_1 = require("../components/photo-swipe/photo-swipe.component");
var http_1 = require("@angular/common/http");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var datePopup_component_1 = require("./popup/datePopup.component");
var OutfitsComponent = /** @class */ (function () {
    function OutfitsComponent(clothingService, dialogService, notificationsService, userService) {
        this.clothingService = clothingService;
        this.dialogService = dialogService;
        this.notificationsService = notificationsService;
        this.userService = userService;
        this.clothes = [];
        this.searchCriteriaResult = new searchCriteriaResult_1.SearchCriteriaResult();
        this.canFetch = true;
        clothingService.setToken(userService.getToken());
    }
    OutfitsComponent.prototype.ngOnInit = function () {
        this.getOutfit();
    };
    OutfitsComponent.prototype.getOutfit = function () {
        var _this = this;
        this.canFetch = false;
        var uuids = null;
        if (this.clothes.length > 0 && JSON.stringify(this.lastSearchCriteriaResult) === JSON.stringify(this.searchCriteriaResult)) {
            uuids = this.clothes.map(function (x) { return x.uuid; });
        }
        var params = new http_1.HttpParams();
        params = params.append("uuid", uuids);
        params = params.append("type", null);
        this.clothingService.getOutfit(this.searchCriteriaResult, params).subscribe(function (data) {
            if (data.length < _this.clothes.length
                && JSON.stringify(_this.lastSearchCriteriaResult) === JSON.stringify(_this.searchCriteriaResult)) {
                if (data.length > 0) {
                    var _loop_1 = function (i) {
                        if (data.filter(function (x) { return x.type == _this.clothes[i].type; })[0]) {
                            _this.clothes[i] = data.filter(function (x) { return x.type == _this.clothes[i].type; })[0];
                        }
                    };
                    for (var i = 0; i < _this.clothes.length; i++) {
                        _loop_1(i);
                    }
                }
                _this.initSlideImages();
            }
            else {
                _this.clothes = data;
                _this.initSlideImages();
            }
            _this.lastSearchCriteriaResult = Object.assign({}, _this.searchCriteriaResult);
            _this.canFetch = true;
        }, function (error) {
            _this.canFetch = true;
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la combinación", _this.notificationsService.DANGER);
        });
    };
    OutfitsComponent.prototype.getOtherOutfitClothe = function (uuid, type) {
        var _this = this;
        var params = new http_1.HttpParams();
        params = params.append("uuid", uuid);
        params = params.append("type", type);
        this.clothingService.getOutfit(this.searchCriteriaResult, params).subscribe(function (data) {
            if (data.length > 0) {
                for (var i = 0; i < _this.clothes.length; i++) {
                    if (_this.clothes[i].uuid == uuid) {
                        _this.clothes[i] = data[0];
                        break;
                    }
                }
                _this.initSlideImages();
            }
            else {
                _this.notificationsService.showNotification("Esta es la única prenda registrada del tipo " + type, _this.notificationsService.WARNING);
            }
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la combinación", _this.notificationsService.DANGER);
        });
    };
    OutfitsComponent.prototype.getImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return "../assets/img/blog-1.jpg";
        }
    };
    OutfitsComponent.prototype.initSlideImages = function () {
        this.slideImages = [];
        for (var _i = 0, _a = this.clothes; _i < _a.length; _i++) {
            var clothe = _a[_i];
            var item = {
                src: this.getImage(clothe.picture),
                w: 800,
                h: 600
            };
            this.slideImages.push(item);
        }
    };
    OutfitsComponent.prototype.openSlideshow = function (index) {
        this.photoSwipe.openGallery(this.slideImages, index);
    };
    OutfitsComponent.prototype.addClotheToCalendar = function (uuidClothe, idClothe) {
        var ids = [];
        ids[0] = { "uuid": uuidClothe, "id": idClothe };
        this.openDialog(ids);
    };
    OutfitsComponent.prototype.addOutfitToCalendar = function () {
        var ids = this.clothes.map(function (x) { return { "uuid": x.uuid, "id": x.id }; });
        this.openDialog(ids);
    };
    OutfitsComponent.prototype.openDialog = function (ids) {
        var disposable = this.dialogService.addDialog(datePopup_component_1.DatePopup, {
            title: "Escoja una fecha para agregar la prenda al calendario",
            ids: ids,
            message: ""
        })
            .subscribe(function (result) { });
    };
    __decorate([
        core_1.ViewChild('photoSwipe'),
        __metadata("design:type", photo_swipe_component_1.PhotoSwipeComponent)
    ], OutfitsComponent.prototype, "photoSwipe", void 0);
    OutfitsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'outfits-cmp',
            templateUrl: 'outfits.component.html'
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            ng2_bootstrap_modal_1.DialogService,
            notifications_service_1.NotificationsService,
            user_service_1.UserService])
    ], OutfitsComponent);
    return OutfitsComponent;
}());
exports.OutfitsComponent = OutfitsComponent;
//# sourceMappingURL=outfits.component.js.map