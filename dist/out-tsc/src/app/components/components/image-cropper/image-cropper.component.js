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
var platform_browser_1 = require("@angular/platform-browser");
var image_utils_1 = require("./image.utils");
var ImageCropperComponent = /** @class */ (function () {
    function ImageCropperComponent(elementRef, sanitizer, cd) {
        this.elementRef = elementRef;
        this.sanitizer = sanitizer;
        this.cd = cd;
        this.marginLeft = '0px';
        this.imageVisible = false;
        this.format = 'png';
        this.maintainAspectRatio = true;
        this.aspectRatio = 1;
        this.resizeToWidth = 0;
        this.roundCropper = false;
        this.onlyScaleDown = false;
        this.imageQuality = 92;
        this.cropper = {
            x1: -100,
            y1: -100,
            x2: 10000,
            y2: 10000
        };
        this.imageCroppedBase64 = new core_1.EventEmitter();
        this.imageCroppedFile = new core_1.EventEmitter();
        this.imageLoaded = new core_1.EventEmitter();
        this.loadImageFailed = new core_1.EventEmitter();
        this.initCropper();
    }
    Object.defineProperty(ImageCropperComponent.prototype, "imageBase64", {
        /* @Input()
         set imageChangedEvent(event: any) {
             this.initCropper();
             if (event && event.target && event.target.files && event.target.files.length > 0) {
                 this.loadImageFile(event.target.files[0]);
             }
         }*/
        set: function (imageBase64) {
            this.initCropper();
            this.loadBase64Image(imageBase64);
        },
        enumerable: true,
        configurable: true
    });
    ImageCropperComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['cropper']) {
            setTimeout(function () {
                _this.setMaxSize();
                _this.checkCropperPosition(false);
                _this.crop();
                _this.cd.markForCheck();
            });
        }
    };
    ImageCropperComponent.prototype.initCropper = function () {
        this.imageVisible = false;
        this.originalImage = null;
        this.safeImgDataUrl = 'data:image/png;base64,iVBORw0KGg'
            + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU'
            + 'AAarVyFEAAAAASUVORK5CYII=';
        this.moveStart = {
            active: false,
            type: null,
            position: null,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            clientX: 0,
            clientY: 0
        };
        this.maxSize = {
            width: 0,
            height: 0
        };
        this.originalSize = {
            width: 0,
            height: 0
        };
        this.cropper.x1 = -100;
        this.cropper.y1 = -100;
        this.cropper.x2 = 10000;
        this.cropper.y2 = 10000;
    };
    Object.defineProperty(ImageCropperComponent.prototype, "imageChangedEvent", {
        set: function (imageBase64) {
            var _this = this;
            var exifRotation = image_utils_1.ImageUtils.getOrientation(imageBase64);
            if (exifRotation > 1) {
                image_utils_1.ImageUtils.resetOrientation(imageBase64, exifRotation, function (rotatedBase64) { return _this.loadBase64Image(rotatedBase64); });
            }
            else {
                this.loadBase64Image(imageBase64);
            }
        },
        enumerable: true,
        configurable: true
    });
    ImageCropperComponent.prototype.loadBase64Image = function (imageBase64) {
        var _this = this;
        this.originalImage = new Image();
        this.originalImage.onload = function () {
            _this.originalSize.width = _this.originalImage.width;
            _this.originalSize.height = _this.originalImage.height;
            _this.cd.markForCheck();
        };
        this.safeImgDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64);
        this.originalImage.src = imageBase64;
    };
    ImageCropperComponent.prototype.imageLoadedInView = function () {
        var _this = this;
        if (this.originalImage != null) {
            this.imageLoaded.emit();
            setTimeout(function () {
                _this.setMaxSize();
                _this.resetCropperPosition();
                _this.cd.markForCheck();
            });
        }
    };
    ImageCropperComponent.prototype.onResize = function (event) {
        this.resizeCropperPosition();
        this.setMaxSize();
    };
    ImageCropperComponent.prototype.resizeCropperPosition = function () {
        var displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (this.maxSize.width !== displayedImage.offsetWidth || this.maxSize.height !== displayedImage.offsetHeight) {
            this.cropper.x1 = this.cropper.x1 * displayedImage.offsetWidth / this.maxSize.width;
            this.cropper.x2 = this.cropper.x2 * displayedImage.offsetWidth / this.maxSize.width;
            this.cropper.y1 = this.cropper.y1 * displayedImage.offsetHeight / this.maxSize.height;
            this.cropper.y2 = this.cropper.y2 * displayedImage.offsetHeight / this.maxSize.height;
        }
    };
    ImageCropperComponent.prototype.resetCropperPosition = function () {
        var displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (displayedImage.offsetWidth / this.aspectRatio < displayedImage.offsetHeight) {
            this.cropper.x1 = 0;
            this.cropper.x2 = displayedImage.offsetWidth;
            var cropperHeight = displayedImage.offsetWidth / this.aspectRatio;
            this.cropper.y1 = (displayedImage.offsetHeight - cropperHeight) / 2;
            this.cropper.y2 = this.cropper.y1 + cropperHeight;
        }
        else {
            this.cropper.y1 = 0;
            this.cropper.y2 = displayedImage.offsetHeight;
            var cropperWidth = displayedImage.offsetHeight * this.aspectRatio;
            this.cropper.x1 = (displayedImage.offsetWidth - cropperWidth) / 2;
            this.cropper.x2 = this.cropper.x1 + cropperWidth;
        }
        this.crop();
        this.imageVisible = true;
    };
    ImageCropperComponent.prototype.startMove = function (event, moveType, position) {
        if (position === void 0) { position = null; }
        this.moveStart.active = true;
        this.moveStart.type = moveType;
        this.moveStart.position = position;
        this.moveStart.clientX = this.getClientX(event);
        this.moveStart.clientY = this.getClientY(event);
        Object.assign(this.moveStart, this.cropper);
        this.cd.markForCheck();
    };
    ImageCropperComponent.prototype.moveImg = function (event) {
        if (this.moveStart.active) {
            event.stopPropagation();
            event.preventDefault();
            this.setMaxSize();
            if (this.moveStart.type === 'move') {
                this.move(event);
                this.checkCropperPosition(true);
            }
            else if (this.moveStart.type === 'resize') {
                this.resize(event);
                this.checkCropperPosition(false);
            }
            this.cd.markForCheck();
        }
    };
    ImageCropperComponent.prototype.setMaxSize = function () {
        var el = this.elementRef.nativeElement.querySelector('.source-image');
        this.maxSize.width = el.offsetWidth;
        this.maxSize.height = el.offsetHeight;
        this.marginLeft = this.sanitizer.bypassSecurityTrustStyle('calc(50% - ' + this.maxSize.width / 2 + 'px)');
    };
    ImageCropperComponent.prototype.checkCropperPosition = function (maintainSize) {
        if (maintainSize === void 0) { maintainSize = false; }
        if (this.cropper.x1 < 0) {
            this.cropper.x2 -= maintainSize ? this.cropper.x1 : 0;
            this.cropper.x1 = 0;
        }
        if (this.cropper.y1 < 0) {
            this.cropper.y2 -= maintainSize ? this.cropper.y1 : 0;
            this.cropper.y1 = 0;
        }
        if (this.cropper.x2 > this.maxSize.width) {
            this.cropper.x1 -= maintainSize ? (this.cropper.x2 - this.maxSize.width) : 0;
            this.cropper.x2 = this.maxSize.width;
        }
        if (this.cropper.y2 > this.maxSize.height) {
            this.cropper.y1 -= maintainSize ? (this.cropper.y2 - this.maxSize.height) : 0;
            this.cropper.y2 = this.maxSize.height;
        }
    };
    ImageCropperComponent.prototype.moveStop = function (event) {
        if (this.moveStart.active) {
            this.moveStart.active = false;
            this.crop();
            this.cd.markForCheck();
        }
    };
    ImageCropperComponent.prototype.move = function (event) {
        var diffX = this.getClientX(event) - this.moveStart.clientX;
        var diffY = this.getClientY(event) - this.moveStart.clientY;
        this.cropper.x1 = this.moveStart.x1 + diffX;
        this.cropper.y1 = this.moveStart.y1 + diffY;
        this.cropper.x2 = this.moveStart.x2 + diffX;
        this.cropper.y2 = this.moveStart.y2 + diffY;
    };
    ImageCropperComponent.prototype.resize = function (event) {
        var diffX = this.getClientX(event) - this.moveStart.clientX;
        var diffY = this.getClientY(event) - this.moveStart.clientY;
        switch (this.moveStart.position) {
            case 'left':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                break;
            case 'topleft':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'top':
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'topright':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - 20);
                break;
            case 'right':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                break;
            case 'bottomright':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + 20);
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
            case 'bottom':
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
            case 'bottomleft':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - 20);
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + 20);
                break;
        }
        if (this.maintainAspectRatio) {
            this.checkAspectRatio();
        }
    };
    ImageCropperComponent.prototype.checkAspectRatio = function () {
        var overflowX = 0;
        var overflowY = 0;
        switch (this.moveStart.position) {
            case 'top':
                this.cropper.x2 = this.cropper.x1 + (this.cropper.y2 - this.cropper.y1) * this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'bottom':
                this.cropper.x2 = this.cropper.x1 + (this.cropper.y2 - this.cropper.y1) * this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : (overflowX / this.aspectRatio);
                }
                break;
            case 'topleft':
                this.cropper.y1 = this.cropper.y2 - (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(0 - this.cropper.x1, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x1 += (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'topright':
                this.cropper.y1 = this.cropper.y2 - (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'right':
            case 'bottomright':
                this.cropper.y2 = this.cropper.y1 + (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'left':
            case 'bottomleft':
                this.cropper.y2 = this.cropper.y1 + (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(0 - this.cropper.x1, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x1 += (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
        }
    };
    ImageCropperComponent.prototype.crop = function () {
        var _this = this;
        var displayedImage = this.elementRef.nativeElement.querySelector('.source-image');
        if (displayedImage && this.originalImage != null) {
            var ratio = this.originalSize.width / displayedImage.offsetWidth;
            var left = Math.round(this.cropper.x1 * ratio);
            var top_1 = Math.round(this.cropper.y1 * ratio);
            var width = Math.round((this.cropper.x2 - this.cropper.x1) * ratio);
            var height = Math.round((this.cropper.y2 - this.cropper.y1) * ratio);
            var resizeRatio = this.getResizeRatio(width);
            var cropCanvas = document.createElement('canvas');
            cropCanvas.width = width * resizeRatio;
            cropCanvas.height = height * resizeRatio;
            var ctx = cropCanvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(this.originalImage, left, top_1, width, height, 0, 0, width * resizeRatio, height * resizeRatio);
                var quality = Math.min(1, Math.max(0, this.imageQuality / 100));
                var croppedImage = cropCanvas.toDataURL("image/" + this.format, quality);
                if (croppedImage.length > 10) {
                    this.imageCroppedBase64.emit(croppedImage);
                }
                cropCanvas.toBlob(function (fileImage) { return _this.imageCroppedFile.emit(fileImage); }, "image/" + this.format, quality);
            }
        }
    };
    ImageCropperComponent.prototype.getResizeRatio = function (width) {
        return this.resizeToWidth > 0 && (!this.onlyScaleDown || width > this.resizeToWidth)
            ? this.resizeToWidth / width
            : 1;
    };
    ImageCropperComponent.prototype.getClientX = function (event) {
        return event.clientX != null ? event.clientX : event.touches[0].clientX;
    };
    ImageCropperComponent.prototype.getClientY = function (event) {
        return event.clientY != null ? event.clientY : event.touches[0].clientY;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ImageCropperComponent.prototype, "imageBase64", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ImageCropperComponent.prototype, "format", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "maintainAspectRatio", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "aspectRatio", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "resizeToWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "roundCropper", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "onlyScaleDown", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "imageQuality", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "cropper", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "imageCroppedBase64", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "imageCroppedFile", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "imageLoaded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ImageCropperComponent.prototype, "loadImageFailed", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], ImageCropperComponent.prototype, "imageChangedEvent", null);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], ImageCropperComponent.prototype, "onResize", null);
    __decorate([
        core_1.HostListener('document:mousemove', ['$event']),
        core_1.HostListener('document:touchmove', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageCropperComponent.prototype, "moveImg", null);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']),
        core_1.HostListener('document:touchend', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], ImageCropperComponent.prototype, "moveStop", null);
    ImageCropperComponent = __decorate([
        core_1.Component({
            selector: 'image-cropper',
            templateUrl: './image-cropper.component.html',
            styleUrls: ['./image-cropper.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, platform_browser_1.DomSanitizer, core_1.ChangeDetectorRef])
    ], ImageCropperComponent);
    return ImageCropperComponent;
}());
exports.ImageCropperComponent = ImageCropperComponent;
//# sourceMappingURL=image-cropper.component.js.map