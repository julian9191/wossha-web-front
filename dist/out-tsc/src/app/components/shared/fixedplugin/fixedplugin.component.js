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
var common_1 = require("@angular/common");
var misc = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0
};
var FixedPluginComponent = /** @class */ (function () {
    function FixedPluginComponent(location) {
        this.background_image = true;
        this.state = true;
        this.location = location;
    }
    FixedPluginComponent.prototype.ngOnInit = function () {
        var $sidebar = $('.sidebar');
        var $sidebar_img_container = $sidebar.find('.sidebar-background');
        var $full_page = $('.full-page');
        var $sidebar_responsive = $('body > .navbar-collapse');
        var window_width = $(window).width();
        if (window_width > 767) {
            if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                $('.fixed-plugin .dropdown').addClass('open');
            }
        }
        $('.fixed-plugin a').click(function (event) {
            // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if ($(this).hasClass('switch-trigger')) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                else if (window.event) {
                    window.event.cancelBubble = true;
                }
            }
        });
        $('.fixed-plugin .badge').click(function () {
            var $full_page_background = $('.full-page-background');
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var new_color = $(this).data('color');
            if ($sidebar.length != 0) {
                $sidebar.attr('data-color', new_color);
            }
            if ($full_page.length != 0) {
                $full_page.attr('data-color', new_color);
            }
            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.attr('data-color', new_color);
            }
        });
        $('.fixed-plugin .img-holder').click(function () {
            var $full_page_background = $('.full-page-background');
            $(this).parent('li').siblings().removeClass('active');
            $(this).parent('li').addClass('active');
            var new_image = $(this).find("img").attr('src');
            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeOut('fast', function () {
                    $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                    $sidebar_img_container.fadeIn('fast');
                });
            }
            if ($full_page_background.length != 0) {
                $full_page_background.fadeOut('fast', function () {
                    $full_page_background.css('background-image', 'url("' + new_image + '")');
                    $full_page_background.fadeIn('fast');
                });
            }
            if ($sidebar_responsive.length != 0) {
                $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
            }
        });
    };
    FixedPluginComponent.prototype.onChange = function ($event) {
        var $sidebar = $('.sidebar');
        var $sidebar_img_container = $sidebar.find('.sidebar-background');
        var $full_page = $('.full-page');
        var $full_page_background = $('.full-page-background');
        var $sidebar_responsive = $('body > .navbar-collapse');
        if ($event.currentValue) {
            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeIn('fast');
                $sidebar.attr('data-image', '#');
            }
            if ($full_page_background.length != 0) {
                $full_page_background.fadeIn('fast');
                $full_page.attr('data-image', '#');
            }
            this.background_image = true;
        }
        else {
            if ($sidebar_img_container.length != 0) {
                $sidebar.removeAttr('data-image');
                $sidebar_img_container.fadeOut('fast');
            }
            if ($full_page_background.length != 0) {
                $full_page.removeAttr('data-image', '#');
                $full_page_background.fadeOut('fast');
            }
            this.background_image = false;
        }
    };
    FixedPluginComponent.prototype.onChange1 = function ($event) {
        var $body = $('body');
        if (misc.sidebar_mini_active == true) {
            $('body').removeClass('sidebar-mini');
            misc.sidebar_mini_active = false;
        }
        else {
            $('.sidebar .collapse').collapse('hide').on('hidden.bs.collapse', function () {
                $(this).css('height', 'auto');
            });
            setTimeout(function () {
                $('body').addClass('sidebar-mini');
                $('.sidebar .collapse').css('height', 'auto');
                misc.sidebar_mini_active = true;
            }, 300);
        }
        // we simulate the window Resize so the charts will get updated in realtime.
        var simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
        }, 180);
        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function () {
            clearInterval(simulateWindowResize);
        }, 1000);
    };
    FixedPluginComponent.prototype.onChange2 = function ($event) {
        var $nav = $('nav.navbar').first();
        if ($nav.hasClass('navbar-fixed')) {
            $nav.removeClass('navbar-fixed').prependTo('.main-panel');
        }
        else {
            $nav.prependTo('.wrapper').addClass('navbar-fixed');
        }
    };
    FixedPluginComponent.prototype.isPages = function () {
        if (this.location.prepareExternalUrl(this.location.path()) == '/pages/login' || this.location.prepareExternalUrl(this.location.path()) == '/pages/register' ||
            this.location.prepareExternalUrl(this.location.path()) == '/pages/lock') {
            return false;
        }
        else {
            return true;
        }
    };
    FixedPluginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'fixedplugin-cmp',
            templateUrl: 'fixedplugin.component.html'
        }),
        __metadata("design:paramtypes", [common_1.Location])
    ], FixedPluginComponent);
    return FixedPluginComponent;
}());
exports.FixedPluginComponent = FixedPluginComponent;
//# sourceMappingURL=fixedplugin.component.js.map