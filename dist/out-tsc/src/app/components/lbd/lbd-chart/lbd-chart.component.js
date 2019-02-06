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
var Chartist = require("chartist");
var ChartType;
(function (ChartType) {
    ChartType[ChartType["Pie"] = 0] = "Pie";
    ChartType[ChartType["Line"] = 1] = "Line";
    ChartType[ChartType["Bar"] = 2] = "Bar";
})(ChartType = exports.ChartType || (exports.ChartType = {}));
var LbdChartComponent = /** @class */ (function () {
    function LbdChartComponent() {
    }
    LbdChartComponent_1 = LbdChartComponent;
    LbdChartComponent.prototype.ngOnInit = function () {
        this.chartId = "lbd-chart-" + LbdChartComponent_1.currentId++;
    };
    LbdChartComponent.prototype.ngAfterViewInit = function () {
        switch (this.chartType) {
            case ChartType.Pie:
                new Chartist.Pie("#" + this.chartId, this.chartData, this.chartOptions, this.chartResponsive);
                break;
            case ChartType.Line:
                new Chartist.Line("#" + this.chartId, this.chartData, this.chartOptions, this.chartResponsive);
                break;
            case ChartType.Bar:
                new Chartist.Bar("#" + this.chartId, this.chartData, this.chartOptions, this.chartResponsive);
                break;
        }
    };
    LbdChartComponent.currentId = 1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LbdChartComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LbdChartComponent.prototype, "subtitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LbdChartComponent.prototype, "chartClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LbdChartComponent.prototype, "chartType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LbdChartComponent.prototype, "chartData", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], LbdChartComponent.prototype, "chartOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LbdChartComponent.prototype, "chartResponsive", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LbdChartComponent.prototype, "footerIconClass", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LbdChartComponent.prototype, "footerText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LbdChartComponent.prototype, "legendItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LbdChartComponent.prototype, "withHr", void 0);
    LbdChartComponent = LbdChartComponent_1 = __decorate([
        core_1.Component({
            selector: 'lbd-chart',
            templateUrl: './lbd-chart.component.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], LbdChartComponent);
    return LbdChartComponent;
    var LbdChartComponent_1;
}());
exports.LbdChartComponent = LbdChartComponent;
//# sourceMappingURL=lbd-chart.component.js.map