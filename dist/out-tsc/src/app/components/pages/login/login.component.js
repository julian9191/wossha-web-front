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
var loginParams_1 = require("../../../models/user/login/loginParams");
var router_1 = require("@angular/router");
var social_service_1 = require("app/providers/social/social.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, socialService, notificationsService, router) {
        this.userService = userService;
        this.socialService = socialService;
        this.notificationsService = notificationsService;
        this.router = router;
        this.test = new Date();
        this.loginParams = new loginParams_1.LoginParams();
        this.loggedinEvent = new core_1.EventEmitter();
    }
    LoginComponent.prototype.checkFullPageBackgroundImage = function () {
        var $page = $('.full-page');
        var image_src = $page.data('image');
        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };
    ;
    LoginComponent.prototype.ngOnInit = function () {
        this.checkFullPageBackgroundImage();
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.userService.login(this.loginParams).subscribe(function (userSessionInfo) {
            _this.userService.storageLoginUserSessionInfo(userSessionInfo);
            _this.router.navigate(['start']);
            _this.socialService.setToken(userSessionInfo.token);
            _this.loadFollowingUsers();
            _this.loggedinEvent.emit(true);
        }, function (error) {
            _this.notificationsService.showNotification("El usuario o la contraseña son incorrectos", _this.notificationsService.WARNING);
        });
    };
    LoginComponent.prototype.loadFollowingUsers = function () {
        var _this = this;
        this.socialService.getFollowingUsers().subscribe(function (data) {
            _this.userService.storageSocialInfo(data);
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error de conexión", _this.notificationsService.DANGER);
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], LoginComponent.prototype, "loggedinEvent", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login-cmp',
            templateUrl: './login.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            social_service_1.SocialService,
            notifications_service_1.NotificationsService,
            router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map