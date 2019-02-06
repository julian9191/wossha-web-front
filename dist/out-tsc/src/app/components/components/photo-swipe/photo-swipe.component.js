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
// Import PhotoSwipe
var photoswipe_1 = require("photoswipe");
var photoswipe_ui_default_1 = require("photoswipe/dist/photoswipe-ui-default");
var PhotoSwipeComponent = /** @class */ (function () {
    // ========================================================================
    function PhotoSwipeComponent() {
        this.images = [];
    }
    // ========================================================================
    PhotoSwipeComponent.prototype.openGallery = function (images, index) {
        if (index === void 0) { index = 0; }
        // Build gallery images array
        images = images || this.images;
        // define options (if needed)
        var options = {
            // optionName: 'option value'
            // for example:
            index: index // start at first slide
        };
        // Initializes and opens PhotoSwipe
        var gallery = new photoswipe_1.default(this.photoSwipe.nativeElement, photoswipe_ui_default_1.default, images, options);
        gallery.init();
    };
    __decorate([
        core_1.ViewChild('photoSwipe'),
        __metadata("design:type", core_1.ElementRef)
    ], PhotoSwipeComponent.prototype, "photoSwipe", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], PhotoSwipeComponent.prototype, "images", void 0);
    PhotoSwipeComponent = __decorate([
        core_1.Component({
            selector: 'app-photo-swipe',
            templateUrl: './photo-swipe.component.html',
            styleUrls: ['./photo-swipe.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], PhotoSwipeComponent);
    return PhotoSwipeComponent;
}());
exports.PhotoSwipeComponent = PhotoSwipeComponent;
//# sourceMappingURL=photo-swipe.component.js.map