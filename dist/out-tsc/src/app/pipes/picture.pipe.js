"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PicturePipe = /** @class */ (function () {
    function PicturePipe() {
        this.defaultProfilePicture = "../../assets/img/default-avatar.png";
    }
    PicturePipe.prototype.transform = function (uuidPicture) {
        if (uuidPicture) {
            return "http://localhost:8083/pictures/static-picture/" + uuidPicture;
        }
        else {
            return this.defaultProfilePicture;
        }
    };
    PicturePipe = __decorate([
        core_1.Pipe({ name: 'picturePipe' })
    ], PicturePipe);
    return PicturePipe;
}());
exports.PicturePipe = PicturePipe;
//# sourceMappingURL=picture.pipe.js.map