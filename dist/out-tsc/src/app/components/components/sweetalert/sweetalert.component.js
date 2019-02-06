"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SweetAlertComponent = /** @class */ (function () {
    function SweetAlertComponent() {
    }
    SweetAlertComponent.prototype.showSwal = function (type) {
        if (type == 'basic') {
            swal("Here's a message!");
        }
        else if (type == 'title-and-text') {
            swal("Here's a message!", "It's pretty, isn't it?");
        }
        else if (type == 'success-message') {
            swal("Good job!", "You clicked the button!", "success");
        }
        else if (type == 'warning-message-and-confirmation') {
            swal({ title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-info btn-fill",
                confirmButtonText: "Yes, delete it!",
                cancelButtonClass: "btn btn-danger btn-fill",
                closeOnConfirm: false,
            }, function () {
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            });
        }
        else if (type == 'warning-message-and-cancel') {
            swal({ title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                }
                else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
        }
        else if (type == 'custom-html') {
            swal({ title: 'HTML example',
                html: 'You can use <b>bold text</b>, ' +
                    '<a href="http://github.com">links</a> ' +
                    'and other HTML tags'
            });
        }
        else if (type == 'auto-close') {
            swal({ title: "Auto close alert!",
                text: "I will close in 2 seconds.",
                timer: 2000,
                showConfirmButton: false
            });
        }
        else if (type == 'input-field') {
            swal({
                title: 'Input something',
                html: '<p><input id="input-field" class="form-control">',
                showCancelButton: true,
                closeOnConfirm: false,
                allowOutsideClick: false
            }, function () {
                swal({
                    html: 'You entered: <strong>' +
                        $('#input-field').val() +
                        '</strong>'
                });
            });
        }
    };
    SweetAlertComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sweetalert-cmp',
            templateUrl: 'sweetalert.component.html'
        })
    ], SweetAlertComponent);
    return SweetAlertComponent;
}());
exports.SweetAlertComponent = SweetAlertComponent;
//# sourceMappingURL=sweetalert.component.js.map