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
var router_1 = require("@angular/router");
var notifications_service_1 = require("../notifications/notifications.service");
var user_service_1 = require("../user/user.service");
var HttpErrorHandlerService = /** @class */ (function () {
    function HttpErrorHandlerService(router, notificationsService, userService) {
        this.router = router;
        this.notificationsService = notificationsService;
        this.userService = userService;
    }
    HttpErrorHandlerService.prototype.handleHttpError = function (error, message) {
        if (error.status == 403) {
            this.userService.destroyLoginUserSessionInfo();
            this.notificationsService.showNotification("Su sesión ha expirado", this.notificationsService.DANGER);
            this.router.navigate(['pages', 'login']);
        }
        else {
            this.notificationsService.showNotification(message, this.notificationsService.DANGER);
        }
    };
    HttpErrorHandlerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            notifications_service_1.NotificationsService,
            user_service_1.UserService])
    ], HttpErrorHandlerService);
    return HttpErrorHandlerService;
}());
exports.HttpErrorHandlerService = HttpErrorHandlerService;
//# sourceMappingURL=httpErrorHandler.service.js.map