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
var common_1 = require("@angular/common");
var PagesnavbarComponent = /** @class */ (function () {
    function PagesnavbarComponent(location, renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    PagesnavbarComponent.prototype.ngOnInit = function () {
        var navbar = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        //console.log(this.location.prepareExternalUrl(this.location.path()));
    };
    PagesnavbarComponent.prototype.sidebarOpen = function () {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    };
    PagesnavbarComponent.prototype.sidebarClose = function () {
        var body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    PagesnavbarComponent.prototype.sidebarToggle = function () {
        // var toggleButton = this.toggleButton;
        // var body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible == false) {
            this.sidebarOpen();
        }
        else {
            this.sidebarClose();
        }
    };
    PagesnavbarComponent.prototype.isLogin = function () {
        if (this.location.prepareExternalUrl(this.location.path()) === 'pages/login') {
            return true;
        }
        return false;
    };
    PagesnavbarComponent.prototype.isLock = function () {
        if (this.location.prepareExternalUrl(this.location.path()) === 'pages/lock') {
            return true;
        }
        return false;
    };
    PagesnavbarComponent.prototype.isRegister = function () {
        if (this.location.prepareExternalUrl(this.location.path()) === 'pages/register') {
            return true;
        }
        return false;
    };
    PagesnavbarComponent.prototype.getPath = function () {
        // console.log(this.location);
        return this.location.prepareExternalUrl(this.location.path());
    };
    __decorate([
        core_1.ViewChild("pagesnavbar-cmp"),
        __metadata("design:type", Object)
    ], PagesnavbarComponent.prototype, "button", void 0);
    PagesnavbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pagesnavbar-cmp',
            templateUrl: 'pagesnavbar.component.html'
        }),
        __metadata("design:paramtypes", [common_1.Location, core_1.Renderer, core_1.ElementRef])
    ], PagesnavbarComponent);
    return PagesnavbarComponent;
}());
exports.PagesnavbarComponent = PagesnavbarComponent;
//# sourceMappingURL=pagesnavbar.component.js.map