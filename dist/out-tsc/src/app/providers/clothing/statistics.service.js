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
var StatisticsService = /** @class */ (function () {
    function StatisticsService(router, http) {
        this.router = router;
        this.http = http;
        this.TOKEN_PREFIX = "Bearer ";
        this.commandsUrl = globals_1.CLOTHING_PATH + 'commands';
        this.statisticsUrl = globals_1.CLOTHING_PATH + 'statistics/';
        this.generalStatisticsUrl = this.statisticsUrl + 'general-statistics';
        this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    }
    StatisticsService.prototype.setToken = function (token) {
        this.TOKEN = token;
        this.setHeaderToken();
    };
    StatisticsService.prototype.setHeaderToken = function () {
        if (!this.httpHeaders.get("Authorization")) {
            this.httpHeaders = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.TOKEN_PREFIX + this.TOKEN });
        }
    };
    StatisticsService.prototype.getGeneralStatistics = function () {
        return this.http.get(this.generalStatisticsUrl, { headers: this.httpHeaders });
    };
    StatisticsService.prototype.executeCommand = function (data) {
        return this.http.post(this.commandsUrl, data, { headers: this.httpHeaders });
    };
    StatisticsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            http_1.HttpClient])
    ], StatisticsService);
    return StatisticsService;
}());
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map