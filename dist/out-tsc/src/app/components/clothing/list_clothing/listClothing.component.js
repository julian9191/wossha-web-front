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
var clothing_service_1 = require("../../../providers/clothing/clothing.service");
var notifications_service_1 = require("../../../providers/notifications/notifications.service");
var user_service_1 = require("../../../providers/user/user.service");
var http_1 = require("@angular/common/http");
var photo_swipe_component_1 = require("app/components/components/photo-swipe/photo-swipe.component");
var removeClotheCommand_1 = require("app/models/clothing/commands/removeClotheCommand");
var searchCriteriaResult_1 = require("app/models/clothing/searchCriteria/searchCriteriaResult");
var ListClothingComponent = /** @class */ (function () {
    function ListClothingComponent(clothingService, notificationsService, userService) {
        this.clothingService = clothingService;
        this.notificationsService = notificationsService;
        this.userService = userService;
        this.clothes = [];
        this.orderedBy = "NAME";
        this.view = "cards";
        this.totalItems = 0;
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.searchCriteriaResult = new searchCriteriaResult_1.SearchCriteriaResult();
        this.canFetch = true;
        clothingService.setToken(userService.getToken());
    }
    ListClothingComponent.prototype.ngOnInit = function () {
        this.user = this.userService.getLoggedUserSessionInfo().user;
        this.removeClotheCommand = new removeClotheCommand_1.RemoveClotheCommand();
        this.removeClotheCommand.username = this.user.username;
        this.getClothes(false);
    };
    ListClothingComponent.prototype.getMoreClothes = function (append) {
        this.currentPage = 1;
        this.getClothes(append);
    };
    ListClothingComponent.prototype.getClothes = function (append) {
        var _this = this;
        var params = new http_1.HttpParams();
        params = params.append("init", (this.itemsPerPage * (this.currentPage - 1)) + "");
        params = params.append("limit", this.itemsPerPage + "");
        this.clothingService.getClothes(this.searchCriteriaResult, this.orderedBy, params).subscribe(function (data) {
            if (append) {
                _this.clothes = _this.clothes.concat(data.result);
            }
            else {
                _this.clothes = data.result;
            }
            _this.totalItems = data.pagination.size;
            _this.currentPage++;
            _this.initSlideImages();
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", _this.notificationsService.DANGER);
        });
    };
    ListClothingComponent.prototype.getImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return "../assets/img/blog-1.jpg";
        }
    };
    ListClothingComponent.prototype.initSlideImages = function () {
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
    ListClothingComponent.prototype.openSlideshow = function (index) {
        this.photoSwipe.openGallery(this.slideImages, index);
    };
    ListClothingComponent.prototype.removeClothe = function (uuid) {
        var nthis = this;
        this.notificationsService.showConfirmationAlert("¿Está seguro?", "¿Está seguro de eliminar la prenda?", this.notificationsService.WARNING).then(function (response) {
            if (response) {
                nthis.removeClotheCommand.uuid = uuid;
                nthis.clothingService.executeCommand(nthis.removeClotheCommand).subscribe(function (messaje) {
                    nthis.notificationsService.showNotification(messaje["msj"], nthis.notificationsService.SUCCESS);
                    nthis.removeLocalClothe(uuid);
                }, function (error) {
                    nthis.notificationsService.showNotification(error.error.msj, nthis.notificationsService.DANGER);
                });
            }
        });
    };
    ListClothingComponent.prototype.removeLocalClothe = function (uuid) {
        this.clothes = this.clothes.filter(function (c) { return c.uuid != uuid; });
        this.totalItems--;
    };
    __decorate([
        core_1.ViewChild('photoSwipe'),
        __metadata("design:type", photo_swipe_component_1.PhotoSwipeComponent)
    ], ListClothingComponent.prototype, "photoSwipe", void 0);
    ListClothingComponent = __decorate([
        core_1.Component({
            selector: 'app-listClothing',
            templateUrl: './listClothing.component.html',
            styleUrls: ['./listClothing.component.css'],
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            notifications_service_1.NotificationsService,
            user_service_1.UserService])
    ], ListClothingComponent);
    return ListClothingComponent;
}());
exports.ListClothingComponent = ListClothingComponent;
//# sourceMappingURL=listClothing.component.js.map