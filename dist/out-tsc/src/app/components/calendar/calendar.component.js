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
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var dayPopup_component_1 = require("./popup/dayPopup.component");
var photo_swipe_component_1 = require("../components/photo-swipe/photo-swipe.component");
var calendar_service_1 = require("app/providers/clothing/calendar.service");
var notifications_service_1 = require("app/providers/notifications/notifications.service");
var user_service_1 = require("app/providers/user/user.service");
var moment = require("moment");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(dialogService, calendarService, notificationsService, userService) {
        this.dialogService = dialogService;
        this.calendarService = calendarService;
        this.notificationsService = notificationsService;
        this.userService = userService;
        this.showMoreLink = false;
        this.events = [];
        calendarService.setToken(userService.getToken());
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.calendar = $('#fullCalendar');
        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();
        var d = today.getDate();
        var $this = this;
        var popTemplate = [
            '<div class="popover" style="max-width:400px;" >',
            '<div class="popover-header">',
            '<h3 class="popover-title"></h3>',
            '</div>',
            '<div class="popover-content"></div><br>',
            '</div>'
        ].join('');
        this.calendar.fullCalendar({
            viewRender: function (view, element) {
                $this.startViewDate = new Date(view.start.format("YYYY-MM-DD"));
                $this.endViewDate = new Date(view.end.format("YYYY-MM-DD"));
                var monthDate = new Date(view.intervalEnd.format("YYYY-MM-DD"));
                var currentDateAux;
                if (monthDate.getMonth() == m) {
                    currentDateAux = new Date();
                    currentDateAux.setDate(d);
                }
                else {
                    currentDateAux = monthDate;
                    currentDateAux.setDate(15);
                }
                $this.currentDate = moment(currentDateAux).format('YYYY-MM-DD');
                $this.getEventsByView();
            },
            header: {
                left: 'title',
                right: 'prev,next,today'
            },
            defaultDate: today,
            lang: 'es',
            selectable: true,
            selectHelper: true,
            eventStartEditable: false,
            views: {
                month: {
                    titleFormat: 'MMMM YYYY'
                }
            },
            dayClick: function (date, jsEvent, view, resourceObj) {
                $this.openDialog(date, jsEvent, view, resourceObj);
            },
            editable: true,
            eventLimit: this.showMoreLink,
            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: this.events,
            eventRender: function (event, eventElement) {
                var pictureUrl = event.imageurl ? event.imageurl : "../assets/img/blog-1.jpg";
                eventElement.find("div.fc-content").prepend("<img src='" + pictureUrl + "' width='20%'>");
                eventElement.popover({
                    title: event.title,
                    content: function () {
                        return "<div class='col-md-12' style='padding: 0 0 10px 0'>\n\t\t\t\t\t\t\t\t\t<div class='col-md-6'  style='padding: 0'>\n\t\t\t\t\t\t\t\t\t\t<img style='width:100%' src='" + event.imageurl + "' />\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class='col-md-6'>\n\t\t\t\t\t\t\t\t\t\t<p style='font-size: 9pt'>" + (event.description ? event.description : "") + "</p>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>";
                    },
                    template: popTemplate,
                    html: true,
                    trigger: 'hover' /*'click'*/,
                    placement: 'bottom',
                    animation: 'true',
                    container: 'body'
                });
            },
        });
    };
    CalendarComponent.prototype.getImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return "../assets/img/blog-1.jpg";
        }
    };
    CalendarComponent.prototype.openDialog = function (date, jsEvent, view, resourceObj) {
        var _this = this;
        var disposable = this.dialogService.addDialog(dayPopup_component_1.DayPopup, {
            title: moment.utc(date).format("YYYY/MM/DD"),
            date: date,
            message: ""
        })
            .subscribe(function (result) {
            if (result !== undefined) {
                if (result instanceof Array) {
                    _this.initSlideImages(result);
                }
                else if (typeof result == 'number') {
                    _this.openSlideshow(result);
                }
                else if (typeof result == 'boolean') {
                    _this.getEventsByView();
                }
            }
        });
    };
    CalendarComponent.prototype.initSlideImages = function (images) {
        this.slideImages = [];
        for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
            var image = images_1[_i];
            var item = {
                src: this.getImage(image),
                w: 800,
                h: 600
            };
            this.slideImages.push(item);
        }
    };
    CalendarComponent.prototype.openSlideshow = function (index) {
        this.photoSwipe.openGallery(this.slideImages, index);
    };
    CalendarComponent.prototype.getTextColor = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if ((parseInt(result[1], 16) * 0.299 + parseInt(result[2], 16) * 0.587 + parseInt(result[3], 16) * 0.114) > 150) {
            return "#000000";
        }
        return "#ffffff";
    };
    CalendarComponent.prototype.dateChanged = function () {
        this.calendar.fullCalendar('gotoDate', this.currentDate);
    };
    CalendarComponent.prototype.getEventsByView = function () {
        var _this = this;
        this.calendar.fullCalendar('removeEvents', function (e) { return !e.isUserCreated; });
        this.calendarService.getEventsByView(this.startViewDate.getTime(), this.endViewDate.getTime()).subscribe(function (data) {
            _this.events = data;
            for (var i = 0; i < _this.events.length; i++) {
                _this.events[i].imageurl = _this.getImage(_this.events[i].imageurl);
                _this.events[i].textColor = _this.getTextColor(_this.events[i].backgroundColor);
                _this.calendar.fullCalendar('renderEvent', _this.events[i]);
            }
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las prendas", _this.notificationsService.DANGER);
        });
    };
    __decorate([
        core_1.ViewChild('photoSwipe'),
        __metadata("design:type", photo_swipe_component_1.PhotoSwipeComponent)
    ], CalendarComponent.prototype, "photoSwipe", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'calendar-cmp',
            templateUrl: 'calendar.component.html',
            styleUrls: ['calendar.component.css']
        }),
        __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService,
            calendar_service_1.CalendarService,
            notifications_service_1.NotificationsService,
            user_service_1.UserService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map