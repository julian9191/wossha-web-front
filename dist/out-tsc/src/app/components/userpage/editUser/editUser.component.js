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
var user_service_1 = require("../../../providers/user/user.service");
var notifications_service_1 = require("../../../providers/notifications/notifications.service");
var httpErrorHandler_service_1 = require("../../../providers/auth/httpErrorHandler.service");
var modifyUserCommand_1 = require("../../../models/user/modifyUserCommand");
var pictureFile_1 = require("../../../models/global/pictureFile");
var userReference_1 = require("app/models/user/userReference");
var photo_swipe_component_1 = require("../../components/photo-swipe/photo-swipe.component");
var EditUserComponent = /** @class */ (function () {
    function EditUserComponent(userService, notificationsService, httpErrorHandlerService) {
        this.userService = userService;
        this.notificationsService = notificationsService;
        this.httpErrorHandlerService = httpErrorHandlerService;
        this.countries = [];
        this.defaultCoverPicture = "../../assets/img/default_cover.jpg";
        this.defaultProfilePicture = "../../assets/img/default-avatar.png";
        this.modifyUserCommand = new modifyUserCommand_1.ModifyUserCommand();
        this.data = new userReference_1.UserReference();
        this.refreshUser();
        this.getCountries();
    }
    EditUserComponent.prototype.ngOnInit = function () {
        this.minDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth() - (12 * 90));
        this.maxDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth() - (12 * 15));
    };
    EditUserComponent.prototype.save = function (model, isValid, pp, cp) {
        cp.reset();
        if (isValid) {
            var nthis_1 = this;
            this.notificationsService.showConfirmationAlert("¿Está seguro?", "¿Está seguro de guardar los cambios?", this.notificationsService.WARNING).then(function (response) {
                if (response) {
                    model.username = nthis_1.user.username;
                    nthis_1.modifyUserCommand.username = nthis_1.userService.getLoggedUserSessionInfo().user.username;
                    nthis_1.modifyUserCommand.user = model;
                    nthis_1.userService.executeCommand(nthis_1.modifyUserCommand).subscribe(function (messaje) {
                        nthis_1.notificationsService.showNotification(messaje["msj"], nthis_1.notificationsService.SUCCESS);
                        nthis_1.userAux = Object.assign({}, nthis_1.user);
                        nthis_1.updateLoggedUserSessionInfo();
                        cp.reset();
                        pp.reset();
                        nthis_1.refreshUser();
                        nthis_1.getUser();
                    }, function (error) {
                        nthis_1.httpErrorHandlerService.handleHttpError(error, error.error.msj);
                    });
                }
            });
        }
    };
    EditUserComponent.prototype.updateLoggedUserSessionInfo = function () {
        var _this = this;
        this.userService.updateLoggedUserSessionInfo().subscribe(function (messaje) {
            var userSessionInfo = messaje;
            var loginInfo = _this.userService.getLoggedUserSessionInfo();
            loginInfo.user.userSessionInfo = userSessionInfo;
            _this.userService.storageLoginUserSessionInfo(loginInfo);
            _this.updateSlide(userSessionInfo);
        }, function (error) {
            _this.httpErrorHandlerService.handleHttpError(error, error.error.msj);
        });
    };
    EditUserComponent.prototype.updateSlide = function (userSessionInfo) {
        $("#slide-profile-picture").attr("src", "http://localhost:8083/pictures/static-picture/" + userSessionInfo.picture);
        $("#slide-user-name").attr("http", userSessionInfo.firstName + " " + userSessionInfo.lastName);
    };
    EditUserComponent.prototype.getCountries = function () {
        var _this = this;
        this.userService.getCountires().subscribe(function (data) {
            _this.countries = data;
            _this.getUser();
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los paises", _this.notificationsService.DANGER);
        });
    };
    EditUserComponent.prototype.getUser = function () {
        var _this = this;
        var loginInfo = this.userService.getLoggedUserSessionInfo();
        this.userService.getUserByUsername(loginInfo.user.username).subscribe(function (data) {
            _this.data = Object.assign({}, data);
            _this.user = data;
            _this.user.profilePicture = new pictureFile_1.PictureFile(),
                _this.user.coverPicture = new pictureFile_1.PictureFile();
            _this.userAux = Object.assign({}, _this.user);
            _this.initSlideImages();
        }, function (error) {
            _this.httpErrorHandlerService.handleHttpError(error, "Ha ocurrido un error al intentar la información del usuario");
        });
    };
    EditUserComponent.prototype.initSlideImages = function () {
        this.slideImages = [
            {
                src: this.getProfileImage(this.data.profilePicture),
                w: 800,
                h: 800
            },
            {
                src: this.getCoverImage(this.data.coverPicture),
                w: 1000,
                h: 333
            }
        ];
    };
    EditUserComponent.prototype.somthingChanged = function () {
        var result = false;
        try {
            if (this.user.firstName != this.userAux.firstName) {
                result = true;
            }
            else if (this.user.lastName != this.userAux.lastName) {
                result = true;
            }
            else if (this.user.email != this.userAux.email) {
                result = true;
            }
            else if (this.user.country != this.userAux.country) {
                result = true;
            }
            else if (this.user.about != this.userAux.about) {
                result = true;
            }
            else if (this.user.birthday != this.userAux.birthday) {
                result = true;
            }
            else if (this.user.gender != this.userAux.gender) {
                result = true;
            }
            else if (this.user.profilePicture != this.userAux.profilePicture) {
                result = true;
            }
            else if (this.user.coverPicture != this.userAux.coverPicture) {
                result = true;
            }
        }
        catch (e) { }
        return result;
    };
    EditUserComponent.prototype.getProfileImage = function (uuid) {
        if (uuid && !this.user.profilePicture.value) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else if (this.user.profilePicture.value) {
            return this.user.profilePicture.value;
        }
        else {
            return this.defaultProfilePicture;
        }
    };
    EditUserComponent.prototype.getCoverImage = function (uuid) {
        if (uuid && !this.user.coverPicture.value) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else if (this.user.coverPicture.value) {
            return this.user.coverPicture.value;
        }
        else {
            return this.defaultCoverPicture;
        }
    };
    EditUserComponent.prototype.openSlideshow = function (index) {
        this.photoSwipe.openGallery(this.slideImages, index);
    };
    EditUserComponent.prototype.refreshUser = function () {
        this.user = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            country: null,
            about: '',
            password: '',
            confirmPassword: '',
            birthday: null,
            gender: null,
            profilePicture: new pictureFile_1.PictureFile(),
            coverPicture: new pictureFile_1.PictureFile()
        };
        this.user.profilePicture = new pictureFile_1.PictureFile();
        this.user.coverPicture = new pictureFile_1.PictureFile();
    };
    __decorate([
        core_1.ViewChild('photoSwipe'),
        __metadata("design:type", photo_swipe_component_1.PhotoSwipeComponent)
    ], EditUserComponent.prototype, "photoSwipe", void 0);
    EditUserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-cmp',
            templateUrl: 'editUser.component.html',
            styleUrls: ['./editUser.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            notifications_service_1.NotificationsService,
            httpErrorHandler_service_1.HttpErrorHandlerService])
    ], EditUserComponent);
    return EditUserComponent;
}());
exports.EditUserComponent = EditUserComponent;
//# sourceMappingURL=editUser.component.js.map