"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var calendar_service_1 = require("app/providers/clothing/calendar.service");
var notifications_service_1 = require("app/providers/notifications/notifications.service");
var user_service_1 = require("app/providers/user/user.service");
var addOutfitToCalendarCommand_1 = require("app/models/calendar/commands/addOutfitToCalendarCommand");
var DatePopup = /** @class */ (function (_super) {
    __extends(DatePopup, _super);
    function DatePopup(dialogService, calendarService, notificationsService, userService) {
        var _this = _super.call(this, dialogService) || this;
        _this.calendarService = calendarService;
        _this.notificationsService = notificationsService;
        _this.userService = userService;
        _this.winHeight = (window.innerHeight);
        _this.winWidth = (window.innerWidth);
        calendarService.setToken(userService.getToken());
        return _this;
    }
    DatePopup.prototype.ngOnInit = function () {
        this.user = this.userService.getLoggedUserSessionInfo().user;
        this.addOutfitToCalendarCommand = new addOutfitToCalendarCommand_1.AddOutfitToCalendarCommand();
        this.addOutfitToCalendarCommand.username = this.user.username;
        this.addOutfitToCalendarCommand.uuids = this.ids;
    };
    DatePopup.prototype.confirm = function () {
        var _this = this;
        if (this.date) {
            this.addOutfitToCalendarCommand.day = this.date;
            this.calendarService.executeCommand(this.addOutfitToCalendarCommand).subscribe(function (messaje) {
                _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
            }, function (error) {
                _this.notificationsService.showNotification(error.error.msj, _this.notificationsService.DANGER);
            });
            this.close();
        }
        else {
            this.notificationsService.showNotification("Debe seleccionar una fecha", this.notificationsService.DANGER);
        }
    };
    DatePopup.prototype.closeDialog = function () {
        this.result = null;
        this.close();
    };
    DatePopup = __decorate([
        core_1.Component({
            selector: 'confirm',
            templateUrl: './datePopup.component.html',
            styleUrls: ['./datePopup.component.css']
        }),
        __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService,
            calendar_service_1.CalendarService,
            notifications_service_1.NotificationsService,
            user_service_1.UserService])
    ], DatePopup);
    return DatePopup;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.DatePopup = DatePopup;
//# sourceMappingURL=datePopup.component.js.map