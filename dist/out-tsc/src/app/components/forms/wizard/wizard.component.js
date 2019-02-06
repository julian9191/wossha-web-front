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
var sweetalert2_1 = require("sweetalert2");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var WizardComponent = /** @class */ (function () {
    function WizardComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    WizardComponent.prototype.isFieldValid = function (form, field) {
        return !form.get(field).valid && form.get(field).touched;
    };
    WizardComponent.prototype.displayFieldCss = function (form, field) {
        return {
            'has-error': this.isFieldValid(form, field),
            'has-success': this.isFieldValid(form, field)
        };
    };
    WizardComponent.prototype.onFinishWizard = function () {
        //here you can do something, sent the form to server via ajax and show a success message with swal
        sweetalert2_1.default("Good job!", "You clicked the finish button!", "success");
    };
    WizardComponent.prototype.ngOnInit = function () {
        this.type = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            firstName: [null, forms_1.Validators.required],
            lastName: [null, forms_1.Validators.required],
            email: [null, [forms_1.Validators.required, forms_1.Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        });
        // you can also use the nav-pills-[blue | azure | green | orange | red] for a different color of wizard
        // Code for the Validator
        var $validator = $('.card-wizard form').validate({
            rules: {
                firstname: {
                    required: true,
                    minlength: 3
                },
                lastname: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    minlength: 3,
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-error').removeClass('has-success');
            },
            success: function (element) {
                $(element).parent().addClass('has-success').removeClass('has-error');
            }
        });
        $('#wizardCard').bootstrapWizard({
            tabClass: 'nav nav-pills',
            nextSelector: '.btn-next',
            previousSelector: '.btn-back',
            lastSelector: '.btn-finish',
            onNext: function (tab, navigation, index) {
                var $valid = $('.card-wizard form').valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },
            onInit: function (tab, navigation, index) {
                //check number of tabs and fill the entire row
                var $total = navigation.find('li').length;
                var $width = 100 / $total;
                var $display_width = $(document).width();
                if ($display_width < 600 && $total > 3) {
                    $width = 50;
                }
                navigation.find('li').css('width', $width + '%');
            },
            onTabClick: function (tab, navigation, index) {
                // Disable the posibility to click on tabs
                return false;
            },
            onTabShow: function (tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;
                var wizard = navigation.closest('.card-wizard');
                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $(wizard).find('.btn-next').hide();
                    $(wizard).find('.btn-finish').show();
                }
                else if ($current == 1) {
                    $(wizard).find('.btn-back').hide();
                }
                else {
                    $(wizard).find('.btn-back').show();
                    $(wizard).find('.btn-next').show();
                    $(wizard).find('.btn-finish').hide();
                }
            },
            onLast: function (tab, navigation, index) {
                //here you can do something, sent the form to server via ajax and show a success message with swal
                sweetalert2_1.default("Good job!", "You clicked the finish button!", "success");
            }
        });
    };
    WizardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wizard-cmp',
            templateUrl: 'wizard.component.html'
        }),
        __metadata("design:paramtypes", [forms_2.FormBuilder])
    ], WizardComponent);
    return WizardComponent;
}());
exports.WizardComponent = WizardComponent;
//# sourceMappingURL=wizard.component.js.map