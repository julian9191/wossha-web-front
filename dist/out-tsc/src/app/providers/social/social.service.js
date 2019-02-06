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
var http_1 = require("@angular/common/http");
var globals_1 = require("../../globals");
var router_1 = require("@angular/router");
require("rxjs");
var SocialService = /** @class */ (function () {
    function SocialService(router, http) {
        this.router = router;
        this.http = http;
        this.TOKEN_PREFIX = "Bearer ";
        this.commandsUrl = globals_1.SOCIAL_PATH + 'commands';
        this.socialUrl = globals_1.SOCIAL_PATH + 'social/';
        this.followingUsersUrl = this.socialUrl + 'following-users';
        this.messageHistoryUrl = this.socialUrl + 'message-history';
        this.notificationsUrl = this.socialUrl + 'notifications';
        this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    }
    SocialService.prototype.setToken = function (token) {
        this.TOKEN = token;
        this.setHeaderToken();
    };
    SocialService.prototype.setHeaderToken = function () {
        if (!this.httpHeaders.get("Authorization")) {
            this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.TOKEN_PREFIX + this.TOKEN });
        }
    };
    SocialService.prototype.getFollowingUsers = function () {
        return this.http.get(this.followingUsersUrl, { headers: this.httpHeaders });
    };
    SocialService.prototype.getMessageHistory = function (params) {
        return this.http.get(this.messageHistoryUrl, { params: params, headers: this.httpHeaders });
    };
    SocialService.prototype.getNotifications = function () {
        return this.http.get(this.notificationsUrl, { headers: this.httpHeaders });
    };
    SocialService.prototype.executeCommand = function (data) {
        return this.http.post(this.commandsUrl, data, { headers: this.httpHeaders });
    };
    SocialService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            http_1.HttpClient])
    ], SocialService);
    return SocialService;
}());
exports.SocialService = SocialService;
//# sourceMappingURL=social.service.js.map