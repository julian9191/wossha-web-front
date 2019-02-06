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
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(dialogService) {
        var _this = _super.call(this, dialogService) || this;
        _this.croppedImage = '';
        _this.cropperReady = false;
        return _this;
    }
    Popup.prototype.ngOnInit = function () {
        //alert(this.aspectRatio+"");
    };
    Popup.prototype.confirm = function () {
        // we set dialog result as true on click on confirm button, 
        // then we can get dialog result from caller code 
        this.result = this.croppedImage;
        this.close();
    };
    Popup.prototype.imageCroppedBase64 = function (image) {
        this.croppedImage = image;
    };
    Popup.prototype.imageLoaded = function () {
        this.cropperReady = true;
    };
    Popup.prototype.imageLoadFailed = function () {
        console.log('Load failed');
    };
    Popup = __decorate([
        core_1.Component({
            selector: 'confirm',
            templateUrl: './popup.component.html',
            styleUrls: ['./popup.component.css']
        }),
        __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService])
    ], Popup);
    return Popup;
}(ng2_bootstrap_modal_1.DialogComponent));
exports.Popup = Popup;
//# sourceMappingURL=popup.component.js.map