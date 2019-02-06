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
var user_service_1 = require("../../../providers/user/user.service");
var notifications_service_1 = require("../../../providers/notifications/notifications.service");
var createClotheCommand_1 = require("../../../models/clothing/commands/createClotheCommand");
var pictureFile_1 = require("../../../models/global/pictureFile");
var common_1 = require("@angular/common");
var CreateClotheComponent = /** @class */ (function () {
    function CreateClotheComponent(clothingService, userService, notificationsService, _location) {
        this.clothingService = clothingService;
        this.userService = userService;
        this.notificationsService = notificationsService;
        this._location = _location;
        this.simpleSlider = 5;
        this.state_default = true;
        this.state_plain = true;
        this.state_with_icons = true;
        this.color = { hexString: "" };
        this.clothe = { "state": 1 };
        this.selectedColorName = "";
        clothingService.setToken(userService.getToken());
    }
    CreateClotheComponent.prototype.ngOnInit = function () {
        this.maxDate = new Date();
        this.user = this.userService.getLoggedUserSessionInfo().user;
        this.createClotheCommand = new createClotheCommand_1.CreateClotheCommand();
        this.createClotheCommand.username = this.user.username;
        this.getClothingTypes();
        this.getClothingCategories();
        this.refreshClothe();
    };
    CreateClotheComponent.prototype.getClothingTypes = function () {
        var _this = this;
        this.clothingService.getAllClothingTypes().subscribe(function (data) {
            _this.clothingTypes = data;
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los tipos de prenda", _this.notificationsService.DANGER);
        });
    };
    CreateClotheComponent.prototype.getClothingCategories = function () {
        var _this = this;
        this.clothingService.getAllClothingCategories().subscribe(function (data) {
            _this.clothingCategories = data;
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las categorias de prenda", _this.notificationsService.DANGER);
        });
    };
    CreateClotheComponent.prototype.save = function (model, isValid, f, p) {
        var _this = this;
        if (isValid) {
            var color = model.colorCode;
            model.baseColor = color.baseColorId;
            model.colorCode = color.realColorHexa;
            model.username = this.user.username;
            if (!model.picture.value) {
                model.picture = null;
            }
            this.createClotheCommand.clothe = model;
            this.clothingService.executeCommand(this.createClotheCommand).subscribe(function (messaje) {
                _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
                p.reset();
                f.resetForm();
                _this.refreshClothe();
            }, function (error) {
                _this.notificationsService.showNotification(error.error.msj, _this.notificationsService.DANGER);
            });
        }
    };
    CreateClotheComponent.prototype.goBack = function () {
        this._location.back();
    };
    CreateClotheComponent.prototype.refreshClothe = function () {
        this.register = {
            id: null,
            uuid: '',
            username: '',
            name: '',
            description: '',
            type: '',
            category: '',
            purchaseDate: null,
            howLike: 5,
            brand: '',
            state: null,
            colorCode: { "baseColorId": "", "realColorHexa": "" },
            baseColor: null,
            picture: new pictureFile_1.PictureFile(),
            pictureValue: null
        };
    };
    CreateClotheComponent = __decorate([
        core_1.Component({
            selector: 'app-createClothe',
            templateUrl: './createClothe.component.html'
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            user_service_1.UserService,
            notifications_service_1.NotificationsService,
            common_1.Location])
    ], CreateClotheComponent);
    return CreateClotheComponent;
}());
exports.CreateClotheComponent = CreateClotheComponent;
//# sourceMappingURL=createClothe.component.js.map