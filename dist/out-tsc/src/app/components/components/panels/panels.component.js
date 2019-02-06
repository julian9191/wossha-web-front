"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PanelsComponent = /** @class */ (function () {
    function PanelsComponent() {
    }
    PanelsComponent.prototype.ngOnInit = function () {
        $('[data-toggle="collapse-hover"]').each(function () {
            var thisdiv = $(this).attr("data-target");
            $(thisdiv).addClass("collapse-hover");
        });
        $('[data-toggle="collapse-hover"]').hover(function () {
            var thisdiv = $(this).attr("data-target");
            if (!$(this).hasClass('state-open')) {
                $(this).addClass('state-hover');
                $(thisdiv).css({
                    'height': '30px'
                });
            }
        }, function () {
            var thisdiv = $(this).attr("data-target");
            $(this).removeClass('state-hover');
            if (!$(this).hasClass('state-open')) {
                $(thisdiv).css({
                    'height': '0px'
                });
            }
        }).click(function (event) {
            event.preventDefault();
            var thisdiv = $(this).attr("data-target");
            var height = $(thisdiv).children('.panel-body').height();
            if ($(this).hasClass('state-open')) {
                $(thisdiv).css({
                    'height': '0px',
                });
                $(this).removeClass('state-open');
            }
            else {
                $(thisdiv).css({
                    'height': height + 30,
                });
                $(this).addClass('state-open');
            }
        });
    };
    PanelsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'panels-cmp',
            templateUrl: 'panels.component.html'
        })
    ], PanelsComponent);
    return PanelsComponent;
}());
exports.PanelsComponent = PanelsComponent;
//# sourceMappingURL=panels.component.js.map