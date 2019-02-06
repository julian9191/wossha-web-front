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
var user_service_1 = require("../../providers/user/user.service");
//Menu Items
exports.ROUTES = [{
        path: '/start',
        title: 'Inicio',
        type: 'link',
        icontype: 'pe-7s-graph'
    }, {
        path: '/clothing/list-clothing',
        title: 'Prendas',
        type: 'link',
        icontype: 'fa fa-tshirt'
    }, {
        path: '/calendar',
        title: 'Calendario',
        type: 'link',
        icontype: 'pe-7s-date'
    }, {
        path: '/outfits',
        title: 'Combinaciones',
        type: 'link',
        icontype: 'pe-7s-shuffle'
    }, {
        path: '/tiendas',
        title: 'Tiendas',
        type: 'link',
        icontype: 'pe-7s-cart'
    }, {
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'pe-7s-plugin',
        children: [
            { path: 'buttons', title: 'Buttons', ab: 'B' },
            { path: 'grid', title: 'Grid System', ab: 'GS' },
            { path: 'panels', title: 'Panels', ab: 'P' },
            { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA' },
            { path: 'notifications', title: 'Notifications', ab: 'N' },
            { path: 'icons', title: 'Icons', ab: 'I' },
            { path: 'typography', title: 'Typography', ab: 'T' }
        ]
    }, {
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'pe-7s-note2',
        children: [
            { path: 'regular', title: 'Regular Forms', ab: 'RF' },
            { path: 'extended', title: 'Extended Forms', ab: 'EF' },
            { path: 'validation', title: 'Validation Forms', ab: 'VF' },
            { path: 'wizard', title: 'Wizard', ab: 'W' }
        ]
    }, {
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'pe-7s-news-paper',
        children: [
            { path: 'regular', title: 'Regular Tables', ab: 'RT' },
            { path: 'extended', title: 'Extended Tables', ab: 'ET' },
            { path: 'datatables.net', title: 'Datatables.net', ab: 'DT' }
        ]
    }, {
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'pe-7s-map-marker',
        children: [
            { path: 'google', title: 'Google Maps', ab: 'GM' },
            { path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM' },
            { path: 'vector', title: 'Vector Map', ab: 'VM' }
        ]
    }, {
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'pe-7s-graph1'
    }, {
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'pe-7s-gift',
        children: [
            { path: 'user', title: 'Perfil de usuario', ab: 'UP' },
            { path: 'login', title: 'Login', ab: 'LP' },
            { path: 'register', title: 'Registro', ab: 'RP' },
            { path: 'lock', title: 'Página de bloqueo', ab: 'LSP' }
        ]
    }
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(userService) {
        this.userService = userService;
    }
    SidebarComponent.prototype.isNotMobileMenu = function () {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
    SidebarComponent.prototype.ngOnInit = function () {
        this.userSessionInfo = this.userService.getLoggedUserSessionInfo();
        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        this.menuItems = exports.ROUTES.filter(function (menuItem) { return menuItem; });
        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        /*if (isWindows){
           // if we are on windows OS we activate the perfectScrollbar function
           $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
           $('html').addClass('perfect-scrollbar-on');
       } else {
           $('html').addClass('perfect-scrollbar-off');
       }*/
    };
    SidebarComponent.prototype.ngAfterViewInit = function () {
        var $sidebarParent = $('.sidebar .nav > li.active .collapse li.active > a').parent().parent().parent();
        var collapseId = $sidebarParent.siblings('a').attr("href");
        $(collapseId).collapse("show");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "profilePicture", void 0);
    SidebarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sidebar-cmp',
            templateUrl: 'sidebar.component.html',
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map