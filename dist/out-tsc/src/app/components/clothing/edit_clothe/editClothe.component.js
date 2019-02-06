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
var pictureFile_1 = require("../../../models/global/pictureFile");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var photo_swipe_component_1 = require("app/components/components/photo-swipe/photo-swipe.component");
var editClotheCommand_1 = require("app/models/clothing/commands/editClotheCommand");
var EditClotheComponent = /** @class */ (function () {
    function EditClotheComponent(clothingService, userService, notificationsService, route, _location) {
        this.clothingService = clothingService;
        this.userService = userService;
        this.notificationsService = notificationsService;
        this.route = route;
        this._location = _location;
        this.simpleSlider = 5;
        this.state_default = true;
        this.state_plain = true;
        this.state_with_icons = true;
        this.color = { hexString: "" };
        this.clothe = { "state": 1 };
        this.selectedColorName = "";
        this.clothePicture = null;
        clothingService.setToken(userService.getToken());
    }
    EditClotheComponent.prototype.ngOnInit = function () {
        this.maxDate = new Date();
        this.user = this.userService.getLoggedUserSessionInfo().user;
        this.editClotheCommand = new editClotheCommand_1.EditClotheCommand();
        this.editClotheCommand.username = this.user.username;
        this.getClothingTypes();
        this.getClothingCategories();
        this.refreshClothe();
        this.getClothe();
    };
    EditClotheComponent.prototype.getClothingTypes = function () {
        var _this = this;
        this.clothingService.getAllClothingTypes().subscribe(function (data) {
            _this.clothingTypes = data;
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los tipos de prenda", _this.notificationsService.DANGER);
        });
    };
    EditClotheComponent.prototype.getClothingCategories = function () {
        var _this = this;
        this.clothingService.getAllClothingCategories().subscribe(function (data) {
            _this.clothingCategories = data;
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las categorias de prenda", _this.notificationsService.DANGER);
        });
    };
    EditClotheComponent.prototype.getClothe = function () {
        var _this = this;
        var uuid = this.route.snapshot.paramMap.get("uuid");
        this.clothingService.getClotheByUuid(uuid).subscribe(function (data) {
            _this.register = data;
            _this.register.state = _this.register.state + "";
            _this.clothePicture = (' ' + _this.register.picture).slice(1);
            _this.clothePicture = _this.clothePicture == 'null' ? null : _this.clothePicture;
            _this.register.colorCode = { "baseColorId": _this.register.baseColor, "realColorHexa": _this.register.colorCode },
                _this.initSlideImages();
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la prenda", _this.notificationsService.DANGER);
        });
    };
    EditClotheComponent.prototype.initSlideImages = function () {
        this.slideImages = [
            {
                src: this.getImage(this.register.picture),
                w: 800,
                h: 600
            }
        ];
    };
    EditClotheComponent.prototype.save = function (model, isValid, f, p) {
        var _this = this;
        if (isValid) {
            model.uuid = this.route.snapshot.paramMap.get("uuid");
            var color = model.colorCode;
            model.baseColor = color.baseColorId;
            model.colorCode = color.realColorHexa;
            model.username = this.user.username;
            if (!(model.picture instanceof pictureFile_1.PictureFile)) {
                model.picture = null;
            }
            this.editClotheCommand.clothe = model;
            this.clothingService.executeCommand(this.editClotheCommand).subscribe(function (messaje) {
                _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
                p.reset();
                f.resetForm();
                _this.refreshClothe();
                _this.getClothe();
            }, function (error) {
                _this.notificationsService.showNotification(error.error.msj, _this.notificationsService.DANGER);
            });
        }
    };
    EditClotheComponent.prototype.goBack = function () {
        this._location.back();
    };
    EditClotheComponent.prototype.getImage = function (uuid) {
        try {
            if (uuid && !this.register.picture.value) {
                return "http://localhost:8083/pictures/static-picture/" + uuid;
            }
        }
        catch (err) { }
        if (this.register.picture) {
            if (this.register.picture.value) {
                return this.register.picture.value;
            }
        }
        return "../assets/img/blog-1.jpg";
    };
    EditClotheComponent.prototype.openSlideshow = function () {
        this.photoSwipe.openGallery(this.slideImages);
    };
    EditClotheComponent.prototype.refreshClothe = function () {
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
            state: '',
            colorCode: { "baseColorId": "", "realColorHexa": "" },
            baseColor: null,
            picture: new pictureFile_1.PictureFile(),
            pictureValue: null
        };
    };
    __decorate([
        core_1.ViewChild('photoSwipe'),
        __metadata("design:type", photo_swipe_component_1.PhotoSwipeComponent)
    ], EditClotheComponent.prototype, "photoSwipe", void 0);
    EditClotheComponent = __decorate([
        core_1.Component({
            selector: 'app-editClothe',
            templateUrl: './editClothe.component.html'
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            user_service_1.UserService,
            notifications_service_1.NotificationsService,
            router_1.ActivatedRoute,
            common_1.Location])
    ], EditClotheComponent);
    return EditClotheComponent;
}());
exports.EditClotheComponent = EditClotheComponent;
//# sourceMappingURL=editClothe.component.js.map