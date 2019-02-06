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
var addCalendar_component_1 = require("./addcalendar/addCalendar.component");
var addDayDescriptionCommand_1 = require("app/models/calendar/commands/addDayDescriptionCommand");
var removeClotheFromDayCommand_1 = require("app/models/calendar/commands/removeClotheFromDayCommand");
var moment = require("moment");
var DayPopup = /** @class */ (function (_super) {
    __extends(DayPopup, _super);
    function DayPopup(dialogService, calendarService, notificationsService, userService) {
        var _this = _super.call(this, dialogService) || this;
        _this.calendarService = calendarService;
        _this.notificationsService = notificationsService;
        _this.userService = userService;
        _this.clothes = [];
        _this.winHeight = (window.innerHeight);
        _this.winWidth = (window.innerWidth);
        return _this;
    }
    DayPopup.prototype.ngOnInit = function () {
        this.user = this.userService.getLoggedUserSessionInfo().user;
        this.addDayDescriptionCommand = new addDayDescriptionCommand_1.AddDayDescriptionCommand();
        this.addDayDescriptionCommand.username = this.user.username;
        this.addDayDescriptionCommand.day = this.date;
        this.showDescriptionEdit = true;
        this.removeClotheFromDayCommand = new removeClotheFromDayCommand_1.RemoveClotheFromDayCommand();
        this.removeClotheFromDayCommand.username = this.user.username;
        this.removeClotheFromDayCommand.day = this.date;
        this.getDayDescription();
        this.getDayClothing();
    };
    DayPopup.prototype.openAddCalendarTab = function () {
        this.child.isInitSlideImages = true;
        this.child.initSlideImages();
    };
    DayPopup.prototype.getDayDescription = function () {
        var _this = this;
        var date = moment(this.date).format('YYYY-MM-DD');
        this.calendarService.getDayDescription(date).subscribe(function (data) {
            _this.addDayDescriptionCommand.description = data.description;
            if (_this.addDayDescriptionCommand.description) {
                _this.showDescriptionEdit = false;
            }
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las prendas", _this.notificationsService.DANGER);
        });
    };
    DayPopup.prototype.getDayClothing = function () {
        var _this = this;
        var date = moment(this.date).format('YYYY-MM-DD');
        this.calendarService.getDayClothing(date).subscribe(function (data) {
            _this.clothes = data;
            var images = _this.clothes.map(function (x) { return x.picture; });
            _this.initSlideImages(images);
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las prendas", _this.notificationsService.DANGER);
        });
    };
    DayPopup.prototype.saveDescription = function () {
        var _this = this;
        this.calendarService.executeCommand(this.addDayDescriptionCommand).subscribe(function (messaje) {
            _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
            _this.showDescriptionEdit = false;
        }, function (error) {
            _this.notificationsService.showNotification(error.error.msj, _this.notificationsService.DANGER);
        });
    };
    DayPopup.prototype.removeClothe = function (uuid) {
        var nthis = this;
        this.notificationsService.showConfirmationAlert("¿Esta seguro?", "¿ Esta seguro de remover la prenda de esta fecha ?", this.notificationsService.WARNING).then(function (response) {
            if (response) {
                nthis.removeClotheFromDayCommand.uuidClothe = uuid;
                nthis.calendarService.executeCommand(nthis.removeClotheFromDayCommand).subscribe(function (messaje) {
                    nthis.notificationsService.showNotification(messaje["msj"], nthis.notificationsService.SUCCESS);
                    nthis.removeLocalClothe(uuid);
                }, function (error) {
                    nthis.notificationsService.showNotification(error.error.msj, nthis.notificationsService.DANGER);
                });
            }
        });
    };
    DayPopup.prototype.removeLocalClothe = function (uuid) {
        this.clothes = this.clothes.filter(function (c) { return c.uuid != uuid; });
        this.clothingChange(true);
    };
    DayPopup.prototype.getImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return "../assets/img/blog-1.jpg";
        }
    };
    DayPopup.prototype.initSlideImages = function (images) {
        this.result = images;
        this.ngOnDestroy();
    };
    DayPopup.prototype.openSlideshow = function (index) {
        this.result = index;
        this.ngOnDestroy();
    };
    DayPopup.prototype.clothingChange = function (confirmation) {
        this.result = confirmation;
        this.getDayClothing();
        this.ngOnDestroy();
    };
    DayPopup.prototype.confirm = function () {
        this.close();
    };
    DayPopup.prototype.closeDialog = function () {
        this.result = null;
        this.close();
    };
    __decorate([
        core_1.ViewChild(addCalendar_component_1.AddCalendarComponent),
        __metadata("design:type", addCalendar_component_1.AddCalendarComponent)
    ], DayPopup.prototype, "child", void 0);
    DayPopup = __decorate([
        core_1.Component({
            selector: 'confirm',
            templateUrl: './dayPopup.component.html',
            styleUrls: ['./dayPopup.component.css']
        }),
        __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService,
            calendar_service_1.CalendarService,
            notifications_service_1.NotificationsService,
            user_service_1.UserService])
    ], DayPopup);
    return DayPopup;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.DayPopup = DayPopup;
//# sourceMappingURL=dayPopup.component.js.map