"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var buttons_component_1 = require("./buttons/buttons.component");
var components_routing_1 = require("./components.routing");
var grid_component_1 = require("./grid/grid.component");
var icons_component_1 = require("./icons/icons.component");
var panels_component_1 = require("./panels/panels.component");
var sweetalert_component_1 = require("./sweetalert/sweetalert.component");
var typography_component_1 = require("./typography/typography.component");
var ng_color_1 = require("ng-color");
var wossha_datepicker_component_1 = require("./wossha_datepicker/wossha.datepicker.component");
var wossha_colorpicker_component_1 = require("./wossha_colorpicker/wossha.colorpicker.component");
var autocomplete_component_1 = require("./search/autocomplete/autocomplete.component");
var wossha_imguploader_component_1 = require("./wossha_img_uploader/wossha.imguploader.component");
var image_cropper_component_1 = require("./image-cropper/image-cropper.component");
var ng2_bootstrap_modal_1 = require("ng2-bootstrap-modal");
var popup_component_1 = require("./wossha_img_uploader/popup.component");
var angular2_multiselect_dropdown_1 = require("angular2-multiselect-dropdown/angular2-multiselect-dropdown");
var ng2_nouislider_1 = require("ng2-nouislider");
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(components_routing_1.ComponentsRoutes),
                forms_1.FormsModule,
                ng_color_1.NgColorModule,
                ng2_bootstrap_modal_1.BootstrapModalModule,
                angular2_multiselect_dropdown_1.AngularMultiSelectModule,
                ng2_nouislider_1.NouisliderModule
            ],
            exports: [
                wossha_datepicker_component_1.WosshaDatepickerComponent,
                wossha_colorpicker_component_1.WosshaColorpickerComponent,
                autocomplete_component_1.AutocompleteComponent,
                wossha_imguploader_component_1.wosshaImgUploaderComponent,
                image_cropper_component_1.ImageCropperComponent
            ],
            entryComponents: [
                popup_component_1.Popup
            ],
            declarations: [
                buttons_component_1.ButtonsComponent,
                grid_component_1.GridSystemComponent,
                icons_component_1.IconsComponent,
                panels_component_1.PanelsComponent,
                sweetalert_component_1.SweetAlertComponent,
                typography_component_1.TypographyComponent,
                wossha_datepicker_component_1.WosshaDatepickerComponent,
                wossha_colorpicker_component_1.WosshaColorpickerComponent,
                autocomplete_component_1.AutocompleteComponent,
                wossha_imguploader_component_1.wosshaImgUploaderComponent,
                image_cropper_component_1.ImageCropperComponent,
                popup_component_1.Popup
            ],
            providers: []
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
exports.ComponentsModule = ComponentsModule;
//# sourceMappingURL=components.module.js.map