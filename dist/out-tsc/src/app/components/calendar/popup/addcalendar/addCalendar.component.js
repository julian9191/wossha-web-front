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
var clothing_service_1 = require("app/providers/clothing/clothing.service");
var notifications_service_1 = require("app/providers/notifications/notifications.service");
var user_service_1 = require("app/providers/user/user.service");
var searchCriteriaResult_1 = require("app/models/clothing/searchCriteria/searchCriteriaResult");
var calendar_service_1 = require("app/providers/clothing/calendar.service");
var http_1 = require("@angular/common/http");
var addToCalendarCommand_1 = require("app/models/calendar/commands/addToCalendarCommand");
var AddCalendarComponent = /** @class */ (function () {
    function AddCalendarComponent(clothingService, calendarService, notificationsService, userService) {
        this.clothingService = clothingService;
        this.calendarService = calendarService;
        this.notificationsService = notificationsService;
        this.userService = userService;
        this.clothes = [];
        this.searchCriteriaResult = new searchCriteriaResult_1.SearchCriteriaResult();
        this.totalItems = 0;
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.isInitSlideImages = false;
        this.initSlideImagesEvent = new core_1.EventEmitter();
        this.openSlideshowEvent = new core_1.EventEmitter();
        this.clotheAddedEvent = new core_1.EventEmitter();
        clothingService.setToken(userService.getToken());
        calendarService.setToken(userService.getToken());
        this.winHeight = (window.innerHeight);
        this.winWidth = (window.innerWidth);
    }
    AddCalendarComponent.prototype.ngOnInit = function () {
        this.user = this.userService.getLoggedUserSessionInfo().user;
        this.addToCalendarCommand = new addToCalendarCommand_1.AddToCalendarCommand();
        this.addToCalendarCommand.username = this.user.username;
        this.addToCalendarCommand.day = this.date;
        this.getClothing(false);
    };
    AddCalendarComponent.prototype.getClothing = function (append) {
        var _this = this;
        var params = new http_1.HttpParams();
        params = params.append("init", (this.itemsPerPage * (this.currentPage - 1)) + "");
        params = params.append("limit", this.itemsPerPage + "");
        this.calendarService.searchClothingCalendar(this.searchCriteriaResult, params).subscribe(function (data) {
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
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las prendas", _this.notificationsService.DANGER);
        });
    };
    AddCalendarComponent.prototype.getImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return "../assets/img/blog-1.jpg";
        }
    };
    AddCalendarComponent.prototype.initSlideImages = function () {
        if (this.isInitSlideImages) {
            var images = this.clothes.map(function (x) { return x.picture; });
            this.initSlideImagesEvent.emit(images);
        }
    };
    AddCalendarComponent.prototype.openSlideshow = function (index) {
        this.openSlideshowEvent.emit(index);
    };
    AddCalendarComponent.prototype.addToCalendar = function (id, uuid) {
        var _this = this;
        this.addToCalendarCommand.idClothe = id;
        this.addToCalendarCommand.uuidClothe = uuid;
        this.calendarService.executeCommand(this.addToCalendarCommand).subscribe(function (messaje) {
            _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
            _this.clotheAddedEvent.emit(true);
        }, function (error) {
            _this.notificationsService.showNotification(error.error.msj, _this.notificationsService.DANGER);
        });
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AddCalendarComponent.prototype, "initSlideImagesEvent", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AddCalendarComponent.prototype, "openSlideshowEvent", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AddCalendarComponent.prototype, "clotheAddedEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Date)
    ], AddCalendarComponent.prototype, "date", void 0);
    AddCalendarComponent = __decorate([
        core_1.Component({
            selector: 'addcalendar-cmp',
            templateUrl: './addCalendar.component.html',
            styleUrls: ['./addCalendar.component.css']
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            calendar_service_1.CalendarService,
            notifications_service_1.NotificationsService,
            user_service_1.UserService])
    ], AddCalendarComponent);
    return AddCalendarComponent;
}());
exports.AddCalendarComponent = AddCalendarComponent;
//# sourceMappingURL=addCalendar.component.js.map