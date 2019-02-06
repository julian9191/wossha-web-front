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
var forms_1 = require("@angular/forms");
var pictureFile_1 = require("../../../models/global/pictureFile");
var popup_component_1 = require("./popup.component");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var wosshaImgUploaderComponent = /** @class */ (function () {
    function wosshaImgUploaderComponent(dialogService) {
        this.dialogService = dialogService;
        this.croppedImage = '';
        this.cropperReady = false;
        // the method set in registerOnChange to emit changes back to the form
        this.propagateChange = function (_) { };
    }
    wosshaImgUploaderComponent_1 = wosshaImgUploaderComponent;
    wosshaImgUploaderComponent.prototype.ngOnInit = function () {
        this.reset();
    };
    // this is the initial value set to the component
    wosshaImgUploaderComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.data = obj;
        }
    };
    // not used, used for touch input
    wosshaImgUploaderComponent.prototype.registerOnTouched = function () { };
    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    wosshaImgUploaderComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    wosshaImgUploaderComponent.prototype.openInputFile = function (file) {
        file.click();
    };
    wosshaImgUploaderComponent.prototype.prevent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    wosshaImgUploaderComponent.prototype.getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    wosshaImgUploaderComponent.prototype.extractFiles = function (fileList) {
        var _this = this;
        if (fileList[0]) {
            this.imageChanged = fileList[0];
            var reader = new FileReader();
            reader.readAsDataURL(this.imageChanged); // read file as data url
            reader.onload = function (event) {
                if (_this.isImage(reader.result.toString())) {
                    _this.showConfirm(reader.result.toString());
                }
            };
        }
    };
    wosshaImgUploaderComponent.prototype.isImage = function (type) {
        return (type === '' || type === undefined) ? false : type.startsWith('data:image');
    };
    wosshaImgUploaderComponent.prototype.onSelectFile = function (event, file) {
        if (event.target.files) {
            this.extractFiles(event.target.files);
        }
    };
    wosshaImgUploaderComponent.prototype.propagateFile = function () {
        this.file.filename = this.imageChanged.name;
        this.file.filetype = this.imageChanged.type;
        this.file.value = this.croppedImage;
        this.file.size = this.getNewImageSize(this.file.value);
        this.url = this.file.value;
        this.propagateChange(this.file);
    };
    wosshaImgUploaderComponent.prototype.getNewImageSize = function (base64String) {
        var stringLength = base64String.length - 'data:image/jpeg;base64,'.length;
        var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
        return sizeInBytes / 1000;
    };
    wosshaImgUploaderComponent.prototype.onDragover = function (event) {
        this.mouseOver = true;
        this.prevent(event);
    };
    wosshaImgUploaderComponent.prototype.onDragleave = function (event) {
        this.mouseOver = false;
    };
    wosshaImgUploaderComponent.prototype.onDrop = function (event) {
        var transfer = this.getTransfer(event);
        if (!transfer) {
            return;
        }
        this.extractFiles(transfer.files);
        this.prevent(event);
        this.mouseOver = false;
    };
    wosshaImgUploaderComponent.prototype.cancelImage = function (event) {
        this.prevent(event);
        this.reset();
    };
    wosshaImgUploaderComponent.prototype.showConfirm = function (file) {
        var _this = this;
        var disposable = this.dialogService.addDialog(popup_component_1.Popup, {
            title: 'Por favor seleccione el area de la imagen',
            image: file,
            message: "",
            aspectRatio: this.aspectRatio,
            resizeToWidth: this.resizeToWidth,
            roundCropper: this.roundCropper
        })
            .subscribe(function (result) {
            if (result !== undefined) {
                _this.croppedImage = result;
                _this.propagateFile();
            }
            else if (_this.croppedImage == "") {
                _this.reset();
            }
        });
    };
    wosshaImgUploaderComponent.prototype.fileChangeEvent = function (event) {
        this.imageChanged = event.target.files[0];
    };
    wosshaImgUploaderComponent.prototype.imageCroppedBase64 = function (image) {
        this.croppedImage = image;
    };
    wosshaImgUploaderComponent.prototype.imageLoaded = function () {
        this.cropperReady = true;
    };
    wosshaImgUploaderComponent.prototype.imageLoadFailed = function () {
        console.log('Load failed');
    };
    wosshaImgUploaderComponent.prototype.reset = function () {
        this.url = '';
        this.file = new pictureFile_1.PictureFile();
        this.imageChanged = null;
        this.mouseOver = false;
        this.propagateChange(this.file);
        this.croppedImage = '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], wosshaImgUploaderComponent.prototype, "aspectRatio", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], wosshaImgUploaderComponent.prototype, "resizeToWidth", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], wosshaImgUploaderComponent.prototype, "roundCropper", void 0);
    wosshaImgUploaderComponent = wosshaImgUploaderComponent_1 = __decorate([
        core_1.Component({
            selector: 'wossha-img-uploader',
            templateUrl: './wossha.imguploader.component.html',
            styleUrls: ['./wossha.imguploader.component.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return wosshaImgUploaderComponent_1; }),
                    multi: true,
                }
            ]
        }),
        __metadata("design:paramtypes", [ng2_bootstrap_modal_1.DialogService])
    ], wosshaImgUploaderComponent);
    return wosshaImgUploaderComponent;
    var wosshaImgUploaderComponent_1;
}());
exports.wosshaImgUploaderComponent = wosshaImgUploaderComponent;
//# sourceMappingURL=wossha.imguploader.component.js.map