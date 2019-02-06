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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidebar_component_1 = require("../../sidebar/sidebar.component");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var user_service_1 = require("../../../providers/user/user.service");
var notifications_service_1 = require("../../../providers/notifications/notifications.service");
var angular_webstorage_service_1 = require("angular-webstorage-service");
var core_2 = require("@angular/core");
var social_service_1 = require("app/providers/social/social.service");
var changeNotifToViewedCommand_1 = require("app/models/social/commands/changeNotifToViewedCommand");
var misc = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(location, renderer, element, userService, notificationsService, storage, router, socialService) {
        this.renderer = renderer;
        this.element = element;
        this.userService = userService;
        this.notificationsService = notificationsService;
        this.storage = storage;
        this.router = router;
        this.socialService = socialService;
        this.searchText = "";
        this.notifications = [];
        this.changeNotifToViewedCommand = new changeNotifToViewedCommand_1.ChangeNotifToViewedCommand();
        socialService.setToken(userService.getToken());
        this.getNotification();
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.listTitles = sidebar_component_1.ROUTES.filter(function (listTitle) { return listTitle; });
        var navbar = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if ($('body').hasClass('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        $('#minimizeSidebar').click(function () {
            var $btn = $(this);
            if (misc.sidebar_mini_active == true) {
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;
            }
            else {
                setTimeout(function () {
                    $('body').addClass('sidebar-mini');
                    misc.sidebar_mini_active = true;
                }, 300);
            }
            // we simulate the window Resize so the charts will get updated in realtime.
            var simulateWindowResize = setInterval(function () {
                window.dispatchEvent(new Event('resize'));
            }, 180);
            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function () {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
    };
    NavbarComponent.prototype.isMobileMenu = function () {
        if ($(window).width() < 991) {
            return false;
        }
        return true;
    };
    NavbarComponent.prototype.sidebarOpen = function () {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    };
    NavbarComponent.prototype.sidebarClose = function () {
        var body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    NavbarComponent.prototype.sidebarToggle = function () {
        // var toggleButton = this.toggleButton;
        // var body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible == false) {
            this.sidebarOpen();
        }
        else {
            this.sidebarClose();
        }
    };
    NavbarComponent.prototype.getTitle = function () {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        for (var item = 0; item < this.listTitles.length; item++) {
            var parent = this.listTitles[item];
            if (parent.path === titlee) {
                return parent.title;
            }
            else if (parent.children) {
                var children_from_url = titlee.split("/")[2];
                for (var current = 0; current < parent.children.length; current++) {
                    if (parent.children[current].path === children_from_url) {
                        return parent.children[current].title;
                    }
                }
            }
        }
        return 'Dashboard';
    };
    NavbarComponent.prototype.notificationRemovedEvent = function (notif) {
        this.notifications = this.notifications.filter(function (n) { return n != notif; });
    };
    NavbarComponent.prototype.notifDropDownOpened = function (event) {
        var _this = this;
        this.notifications.forEach(function (part, index) {
            this[index].viewed = event;
        }, this.notifications);
        this.changeNotifToViewedCommand.ids = this.notifications.map(function (x) { return x.id; });
        this.socialService.executeCommand(this.changeNotifToViewedCommand).subscribe(function (messaje) { }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar actualizar las notificaciones", _this.notificationsService.DANGER);
        });
    };
    NavbarComponent.prototype.getNotViewedNotifSize = function () {
        return this.notifications.filter(function (n) { return !n.viewed; }).length;
    };
    NavbarComponent.prototype.getPath = function () {
        return this.location.prepareExternalUrl(this.location.path());
    };
    NavbarComponent.prototype.logout = function () {
        this.userService.logout();
    };
    NavbarComponent.prototype.getNotification = function () {
        var _this = this;
        this.socialService.getNotifications().subscribe(function (data) {
            _this.notifications = data;
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las notificaciones", _this.notificationsService.DANGER);
        });
    };
    __decorate([
        core_1.ViewChild("navbar-cmp"),
        __metadata("design:type", Object)
    ], NavbarComponent.prototype, "button", void 0);
    NavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'navbar-cmp',
            templateUrl: 'navbar.component.html',
            styleUrls: ['./navbar.component.css']
        }),
        __param(5, core_2.Inject(angular_webstorage_service_1.SESSION_STORAGE)),
        __metadata("design:paramtypes", [common_1.Location, core_1.Renderer,
            core_1.ElementRef,
            user_service_1.UserService,
            notifications_service_1.NotificationsService,
            angular_webstorage_service_1.WebStorageService,
            router_1.Router,
            social_service_1.SocialService])
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map