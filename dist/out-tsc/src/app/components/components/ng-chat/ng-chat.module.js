"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ng_chat_component_1 = require("./ng-chat.component");
var emojify_pipe_1 = require("./pipes/emojify.pipe");
var linkfy_pipe_1 = require("./pipes/linkfy.pipe");
var NgChatModule = /** @class */ (function () {
    function NgChatModule() {
    }
    NgChatModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, http_1.HttpClientModule],
            declarations: [ng_chat_component_1.NgChat, emojify_pipe_1.EmojifyPipe, linkfy_pipe_1.LinkfyPipe],
            exports: [ng_chat_component_1.NgChat]
        })
    ], NgChatModule);
    return NgChatModule;
}());
exports.NgChatModule = NgChatModule;
//# sourceMappingURL=ng-chat.module.js.map