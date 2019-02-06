"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sweetalert_1 = require("sweetalert");
var NotificationsService = /** @class */ (function () {
    function NotificationsService() {
        this.INFO = "info";
        this.SUCCESS = "success";
        this.WARNING = "warning";
        this.DANGER = "danger";
    }
    NotificationsService.prototype.showNotification = function (text, type) {
        var from = "top";
        var align = "center";
        var icons = [];
        icons[this.INFO] = "pe-7s-info";
        icons[this.SUCCESS] = "pe-7s-check";
        icons[this.WARNING] = "pe-7s-attention";
        icons[this.DANGER] = "pe-7s-close";
        $.notify({
            icon: icons[type],
            message: "<b>" + text
        }, {
            type: type,
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    };
    NotificationsService.prototype.showConfirmationAlert = function (title, text, type) {
        return sweetalert_1.default({
            title: title,
            text: text,
            icon: "warning",
            buttons: {
                cancel: {
                    text: "No",
                    value: false,
                    visible: true,
                    className: "btn btn-default btn-fill",
                    closeModal: true,
                },
                confirm: {
                    text: "Si",
                    value: true,
                    visible: true,
                    className: "btn btn-warning btn-fill",
                    closeModal: true
                }
            },
            dangerMode: true,
        }).then(function (value) {
            return value;
        });
    };
    NotificationsService = __decorate([
        core_1.Injectable()
    ], NotificationsService);
    return NotificationsService;
}());
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map