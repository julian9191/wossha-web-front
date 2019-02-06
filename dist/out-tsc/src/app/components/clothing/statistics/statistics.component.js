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
var notifications_service_1 = require("app/providers/notifications/notifications.service");
var user_service_1 = require("app/providers/user/user.service");
var lbd_chart_component_1 = require("../../lbd/lbd-chart/lbd-chart.component");
var statistics_service_1 = require("app/providers/clothing/statistics.service");
var photo_swipe_component_1 = require("../../components/photo-swipe/photo-swipe.component");
var common_1 = require("@angular/common");
var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(statisticsService, notificationsService, userService, _location) {
        this.statisticsService = statisticsService;
        this.notificationsService = notificationsService;
        this.userService = userService;
        this._location = _location;
        this.totalClothing = 0;
        this.initTypesPie = false;
        this.initCategoriesPie = false;
        this.isInitHowLikePie = false;
        this.initBrandsPie = false;
        this.initColorsPie = false;
        statisticsService.setToken(userService.getToken());
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        this.pieChartType = lbd_chart_component_1.ChartType.Pie;
        this.typesChartLegendItems = [];
        this.categoriesChartLegendItems = [];
        this.howLikeChartLegendItems = [];
        this.brandsChartLegendItems = [];
        this.colorsChartLegendItems = [];
        this.getGeneralStatistics();
    };
    StatisticsComponent.prototype.goBack = function () {
        this._location.back();
    };
    StatisticsComponent.prototype.getGeneralStatistics = function () {
        var _this = this;
        this.statisticsService.getGeneralStatistics().subscribe(function (data) {
            _this.totalClothing = data.total;
            _this.mostUsedClothing = data.mostUsedClothing;
            _this.initTypePie(data.types);
            _this.initCategoryPie(data.categories);
            _this.initHowLikePie(data.howLike);
            _this.initBrandPie(data.brands);
            _this.initColorPie(data.colors);
            _this.initSlideImages();
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las estadísticas generales", _this.notificationsService.DANGER);
        });
    };
    StatisticsComponent.prototype.initTypePie = function (types) {
        var labels = [];
        var series = [];
        for (var i = 0; i < types.length; i++) {
            labels.push("(" + types[i].total + ") " + types[i].value + "%");
            series.push(types[i].value);
            this.typesChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
        }
        this.typesChartData = {
            labels: labels,
            series: series
        };
        this.initTypesPie = true;
    };
    StatisticsComponent.prototype.initCategoryPie = function (types) {
        var labels = [];
        var series = [];
        for (var i = 0; i < types.length; i++) {
            labels.push("(" + types[i].total + ") " + types[i].value + "%");
            series.push(types[i].value);
            this.categoriesChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
        }
        this.categoriesChartData = {
            labels: labels,
            series: series
        };
        this.initCategoriesPie = true;
    };
    StatisticsComponent.prototype.initHowLikePie = function (types) {
        var labels = [];
        var series = [];
        for (var i = 0; i < types.length; i++) {
            labels.push("(" + types[i].total + ") " + types[i].value + "%");
            series.push(types[i].value);
            this.howLikeChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
        }
        this.howLikeChartData = {
            labels: labels,
            series: series
        };
        this.isInitHowLikePie = true;
    };
    StatisticsComponent.prototype.initBrandPie = function (types) {
        var labels = [];
        var series = [];
        for (var i = 0; i < types.length; i++) {
            labels.push("(" + types[i].total + ") " + types[i].value + "%");
            series.push(types[i].value);
            this.brandsChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
        }
        this.brandsChartData = {
            labels: labels,
            series: series
        };
        this.initBrandsPie = true;
    };
    StatisticsComponent.prototype.initColorPie = function (types) {
        var labels = [];
        var series = [];
        for (var i = 0; i < types.length; i++) {
            labels.push("(" + types[i].total + ") " + types[i].value + "%");
            series.push(types[i].value);
            this.colorsChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
        }
        this.colorsChartData = {
            labels: labels,
            series: series
        };
        this.initColorsPie = true;
    };
    StatisticsComponent.prototype.getImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return "../assets/img/blog-1.jpg";
        }
    };
    StatisticsComponent.prototype.initSlideImages = function () {
        this.slideImages = [];
        for (var _i = 0, _a = this.mostUsedClothing; _i < _a.length; _i++) {
            var clothe = _a[_i];
            var item = {
                src: this.getImage(clothe.picture),
                w: 800,
                h: 600
            };
            this.slideImages.push(item);
        }
    };
    StatisticsComponent.prototype.openSlideshow = function (index) {
        this.photoSwipe.openGallery(this.slideImages, index);
    };
    __decorate([
        core_1.ViewChild('photoSwipe'),
        __metadata("design:type", photo_swipe_component_1.PhotoSwipeComponent)
    ], StatisticsComponent.prototype, "photoSwipe", void 0);
    StatisticsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'statistics-cmp',
            templateUrl: 'statistics.component.html',
            styleUrls: ['statistics.component.css']
        }),
        __metadata("design:paramtypes", [statistics_service_1.StatisticsService,
            notifications_service_1.NotificationsService,
            user_service_1.UserService,
            common_1.Location])
    ], StatisticsComponent);
    return StatisticsComponent;
}());
exports.StatisticsComponent = StatisticsComponent;
//# sourceMappingURL=statistics.component.js.map