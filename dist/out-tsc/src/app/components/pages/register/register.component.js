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
var user_service_1 = require("../../../providers/user/user.service");
var notifications_service_1 = require("../../../providers/notifications/notifications.service");
var router_1 = require("@angular/router");
var pictureFile_1 = require("../../../models/global/pictureFile");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(userService, notificationsService, router) {
        this.userService = userService;
        this.notificationsService = notificationsService;
        this.router = router;
        this.countries = [];
        this.getCountries();
    }
    RegisterComponent.prototype.checkFullPageBackgroundImage = function () {
        var $page = $('.full-page');
        var image_src = $page.data('image');
        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };
    ;
    RegisterComponent.prototype.ngOnInit = function () {
        this.minDate = "1900-01-01";
        this.maxDate = "2003-01-01";
        this.refreshUser();
        this.checkFullPageBackgroundImage();
        //  Init Bootstrap Select Picker
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker({
                iconBase: "fa",
                tickIcon: "fa-check",
                style: 'selectpicker-background',
            });
        }
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    };
    RegisterComponent.prototype.save = function (model, isValid) {
        var _this = this;
        if (isValid) {
            this.userService.registerUser(model).subscribe(function (messaje) {
                _this.router.navigate(['pages', 'login']);
                _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
            }, function (error) {
                _this.notificationsService.showNotification(error.error.msj, _this.notificationsService.WARNING);
            });
        }
    };
    RegisterComponent.prototype.getCountries = function () {
        var _this = this;
        this.userService.getCountires().subscribe(function (data) {
            _this.countries = data;
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los paises", _this.notificationsService.WARNING);
        }, function () {
            setTimeout(function () {
                $('.selectpicker').selectpicker('refresh');
            }, 150);
        });
    };
    RegisterComponent.prototype.refreshUser = function () {
        this.register = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            country: null,
            password: '',
            confirmPassword: '',
            birthday: null,
            profilePicture: new pictureFile_1.PictureFile(),
            coverPicture: new pictureFile_1.PictureFile()
        };
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register-cmp',
            templateUrl: './register.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            notifications_service_1.NotificationsService,
            router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map