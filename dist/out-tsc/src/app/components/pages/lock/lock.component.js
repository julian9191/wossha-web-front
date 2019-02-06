"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LockComponent = /** @class */ (function () {
    function LockComponent() {
        this.test = new Date();
    }
    LockComponent.prototype.checkFullPageBackgroundImage = function () {
        var $page = $('.full-page');
        var image_src = $page.data('image');
        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>';
            $page.append(image_container);
        }
    };
    ;
    LockComponent.prototype.ngOnInit = function () {
        this.checkFullPageBackgroundImage();
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    };
    LockComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'lock-cmp',
            templateUrl: './lock.component.html'
        })
    ], LockComponent);
    return LockComponent;
}());
exports.LockComponent = LockComponent;
//# sourceMappingURL=lock.component.js.map