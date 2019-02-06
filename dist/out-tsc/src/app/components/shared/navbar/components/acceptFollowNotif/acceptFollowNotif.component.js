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
var appNotification_1 = require("app/models/social/appNotification");
var user_service_1 = require("app/providers/user/user.service");
var social_service_1 = require("app/providers/social/social.service");
var notifications_service_1 = require("app/providers/notifications/notifications.service");
var acceptFollowCommand_1 = require("app/models/social/commands/acceptFollowCommand");
var AcceptFollowNotifComponent = /** @class */ (function () {
    function AcceptFollowNotifComponent(userService, socialService, notificationsService) {
        this.userService = userService;
        this.socialService = socialService;
        this.notificationsService = notificationsService;
        this.notificationRemovedEvent = new core_1.EventEmitter();
        this.acceptFollowCommand = new acceptFollowCommand_1.AcceptFollowCommand();
        socialService.setToken(userService.getToken());
        this.user = this.userService.getLoggedUserSessionInfo().user;
    }
    AcceptFollowNotifComponent.prototype.ngOnInit = function () {
        this.message = "<strong>@" + this.notification.senderUserName + " - " + this.notification.senderName + "</strong>" +
            " ha aceptado tu solicitud";
    };
    AcceptFollowNotifComponent.prototype.accept = function (notification) {
        var _this = this;
        this.acceptFollowCommand.username = this.user.username;
        this.acceptFollowCommand.senderUsername = notification.senderUserName;
        this.socialService.executeCommand(this.acceptFollowCommand).subscribe(function (messaje) {
            _this.notificationRemovedEvent.emit(notification);
            _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar aceptar que te siga", _this.notificationsService.DANGER);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", appNotification_1.AppNotification)
    ], AcceptFollowNotifComponent.prototype, "notification", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AcceptFollowNotifComponent.prototype, "notificationRemovedEvent", void 0);
    AcceptFollowNotifComponent = __decorate([
        core_1.Component({
            selector: 'acceptFollowNotif-cmp',
            templateUrl: './acceptFollowNotif.component.html',
            styleUrls: ['./acceptFollowNotif.component.css'],
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            social_service_1.SocialService,
            notifications_service_1.NotificationsService])
    ], AcceptFollowNotifComponent);
    return AcceptFollowNotifComponent;
}());
exports.AcceptFollowNotifComponent = AcceptFollowNotifComponent;
//# sourceMappingURL=acceptFollowNotif.component.js.map