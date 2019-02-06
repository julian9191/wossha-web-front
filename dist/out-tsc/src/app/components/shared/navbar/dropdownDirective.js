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
var DropdownDirective = /** @class */ (function () {
    function DropdownDirective() {
        this.notifDropDownOpened = new core_1.EventEmitter();
        this.opened = false;
    }
    DropdownDirective.prototype.open = function () {
        this.opened = !this.opened;
        if (this.opened) {
            this.notifDropDownOpened.emit(this.opened);
        }
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DropdownDirective.prototype, "notifDropDownOpened", void 0);
    __decorate([
        core_1.HostListener('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DropdownDirective.prototype, "open", null);
    DropdownDirective = __decorate([
        core_1.Directive({
            selector: '[rbDropdown]'
        })
    ], DropdownDirective);
    return DropdownDirective;
}());
exports.DropdownDirective = DropdownDirective;
//# sourceMappingURL=dropdownDirective.js.map