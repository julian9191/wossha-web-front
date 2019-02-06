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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var globals_1 = require("../../globals");
var angular_webstorage_service_1 = require("angular-webstorage-service");
var core_2 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs");
var UserService = /** @class */ (function () {
    function UserService(sessionStorage, localStorage, router, http) {
        this.sessionStorage = sessionStorage;
        this.localStorage = localStorage;
        this.router = router;
        this.http = http;
        this.commandsUrl = globals_1.USERS_PATH + 'commands';
        this.loginUrl = globals_1.USERS_PATH + 'login';
        this.countriesUrl = globals_1.USERS_PATH + 'countries';
        this.userUrl = globals_1.USERS_PATH + 'users/';
        this.registerUserUrl = this.userUrl + "register-user";
        this.updateLoggedUserSessionInfoUrl = this.userUrl + "logged-user-info";
        this.userSearchUrl = this.userUrl + 'search-user';
        this.chatFriends = this.userUrl + 'chat-friends';
        this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    }
    UserService_1 = UserService;
    UserService.prototype.updateLoggedUserSessionInfo = function () {
        UserService_1.userInfo = null;
        return this.http.get(this.updateLoggedUserSessionInfoUrl, { headers: this.httpHeaders });
    };
    UserService.prototype.getLoggedUserSessionInfo = function () {
        if (UserService_1.userInfo) {
            return UserService_1.userInfo;
        }
        UserService_1.userInfo = this.sessionStorage.get(globals_1.SESSION_STORAGE_KEY);
        if (UserService_1.userInfo) {
            UserService_1.userInfo.user.userSessionInfo.firstName = decodeURI(UserService_1.userInfo.user.userSessionInfo.firstName);
            UserService_1.userInfo.user.userSessionInfo.lastName = decodeURI(UserService_1.userInfo.user.userSessionInfo.lastName);
            return UserService_1.userInfo;
        }
        return null;
    };
    UserService.prototype.getToken = function () {
        return this.getLoggedUserSessionInfo().token;
    };
    UserService.prototype.setHeaderToken = function () {
        if (!this.httpHeaders.get("Authorization")) {
            this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': globals_1.TOKEN_PREFIX + this.getToken() });
        }
    };
    UserService.prototype.storageLoginUserSessionInfo = function (loginAnswer) {
        this.sessionStorage.set(globals_1.SESSION_STORAGE_KEY, loginAnswer);
    };
    UserService.prototype.storageSocialInfo = function (followingUsers) {
        this.sessionStorage.set(globals_1.SOCIAL_STORAGE_KEY, followingUsers);
    };
    UserService.prototype.getSocialInfo = function () {
        if (UserService_1.socialInfo) {
            return UserService_1.socialInfo;
        }
        var socualInfo = this.sessionStorage.get(globals_1.SOCIAL_STORAGE_KEY);
        if (socualInfo) {
            if (socualInfo.length > 0) {
                return socualInfo;
            }
        }
        return null;
    };
    UserService.prototype.destroyLoginUserSessionInfo = function () {
        this.sessionStorage.remove(globals_1.SESSION_STORAGE_KEY);
    };
    UserService.prototype.login = function (loginParams) {
        return this.http.post(this.loginUrl, loginParams, { headers: this.httpHeaders });
    };
    UserService.prototype.logout = function () {
        this.sessionStorage.remove(globals_1.SESSION_STORAGE_KEY);
        this.router.navigate(['pages', 'login']);
    };
    UserService.prototype.registerUser = function (user) {
        return this.http.post(this.registerUserUrl, user, { headers: this.httpHeaders });
    };
    UserService.prototype.getUserByUsername = function (userName) {
        this.setHeaderToken();
        return this.http.get(this.userUrl + userName, { headers: this.httpHeaders });
    };
    UserService.prototype.getCountires = function () {
        return this.http.get(this.countriesUrl, { headers: this.httpHeaders });
    };
    UserService.prototype.searchUser = function (word) {
        return this.http.get(this.userSearchUrl + "/" + word, { headers: this.httpHeaders });
    };
    UserService.prototype.getChatFriends = function (data) {
        return this.http.post(this.chatFriends, data, { headers: this.httpHeaders });
    };
    UserService.prototype.executeCommand = function (data) {
        this.setHeaderToken();
        return this.http.post(this.commandsUrl, data, { headers: this.httpHeaders });
    };
    UserService = UserService_1 = __decorate([
        core_1.Injectable(),
        __param(0, core_2.Inject(angular_webstorage_service_1.SESSION_STORAGE)),
        __param(1, core_2.Inject(angular_webstorage_service_1.LOCAL_STORAGE)),
        __metadata("design:paramtypes", [angular_webstorage_service_1.WebStorageService,
            angular_webstorage_service_1.WebStorageService,
            router_1.Router,
            http_1.HttpClient])
    ], UserService);
    return UserService;
    var UserService_1;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map