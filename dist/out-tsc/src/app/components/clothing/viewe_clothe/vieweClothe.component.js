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
var clothing_service_1 = require("../../../providers/clothing/clothing.service");
var user_service_1 = require("../../../providers/user/user.service");
;
var router_1 = require("@angular/router");
var notifications_service_1 = require("app/providers/notifications/notifications.service");
var pictureFile_1 = require("app/models/global/pictureFile");
var common_1 = require("@angular/common");
var photo_swipe_component_1 = require("../../components/photo-swipe/photo-swipe.component");
var clotheView_1 = require("app/models/clothing/clotheView");
var lbd_chart_component_1 = require("app/components/lbd/lbd-chart/lbd-chart.component");
var VieweClotheComponent = /** @class */ (function () {
    function VieweClotheComponent(clothingService, userService, notificationsService, route, _location) {
        this.clothingService = clothingService;
        this.userService = userService;
        this.notificationsService = notificationsService;
        this.route = route;
        this._location = _location;
        this.initChar = false;
        clothingService.setToken(userService.getToken());
        this.clotheView = new clotheView_1.ClotheView();
    }
    VieweClotheComponent.prototype.ngOnInit = function () {
        this.viewsChartType = lbd_chart_component_1.ChartType.Bar;
        this.refreshClothe();
        this.getClothe();
    };
    VieweClotheComponent.prototype.getClothe = function () {
        var _this = this;
        var uuid = this.route.snapshot.paramMap.get("uuid");
        this.clothingService.getClotheViewByUuid(uuid).subscribe(function (data) {
            _this.clotheView = data;
            _this.initSlideImages();
            _this.initCharCpt(_this.clotheView.useTimesByMonth);
        }, function (error) {
            _this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la información de la prenda", _this.notificationsService.DANGER);
        });
    };
    VieweClotheComponent.prototype.initCharCpt = function (useTimesByMonth) {
        var series = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < useTimesByMonth.length; i++) {
            series[parseInt(useTimesByMonth[i].key) - 1] = useTimesByMonth[i].value;
        }
        this.viewsChartData = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            series: [series]
        };
        this.viewsChartOptions = {
            seriesBarDistance: 10,
            classNames: {
                bar: 'ct-bar ct-orange'
            },
            axisX: {
                showGrid: false
            }
        };
        this.viewsChartResponsive = [
            ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0];
                        }
                    }
                }]
        ];
        this.initChar = true;
    };
    VieweClotheComponent.prototype.initSlideImages = function () {
        this.slideImages = [
            {
                src: this.getImage(this.clotheView.clothe.picture),
                w: 800,
                h: 600
            }
        ];
    };
    VieweClotheComponent.prototype.getImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return "../assets/img/blog-1.jpg";
        }
    };
    VieweClotheComponent.prototype.openSlideshow = function () {
        this.photoSwipe.openGallery(this.slideImages);
    };
    VieweClotheComponent.prototype.goBack = function () {
        this._location.back();
    };
    VieweClotheComponent.prototype.refreshClothe = function () {
        this.clotheView.clothe = {
            id: null,
            uuid: '',
            username: '',
            name: '',
            description: '',
            type: '',
            category: '',
            purchaseDate: null,
            howLike: 5,
            brand: '',
            state: null,
            colorCode: { "baseColorId": "", "realColorHexa": "" },
            baseColor: null,
            picture: new pictureFile_1.PictureFile(),
            pictureValue: null
        };
    };
    __decorate([
        core_1.ViewChild('photoSwipe'),
        __metadata("design:type", photo_swipe_component_1.PhotoSwipeComponent)
    ], VieweClotheComponent.prototype, "photoSwipe", void 0);
    VieweClotheComponent = __decorate([
        core_1.Component({
            selector: 'app-vieweClothe',
            templateUrl: './vieweClothe.component.html',
            styleUrls: ['./vieweClothe.component.css'],
        }),
        __metadata("design:paramtypes", [clothing_service_1.ClothingService,
            user_service_1.UserService,
            notifications_service_1.NotificationsService,
            router_1.ActivatedRoute,
            common_1.Location])
    ], VieweClotheComponent);
    return VieweClotheComponent;
}());
exports.VieweClotheComponent = VieweClotheComponent;
//# sourceMappingURL=vieweClothe.component.js.map