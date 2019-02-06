"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/*
 * Transforms text containing URLs or E-mails to valid links/mailtos
*/
var LinkfyPipe = /** @class */ (function () {
    function LinkfyPipe() {
    }
    LinkfyPipe.prototype.transform = function (message, pipeEnabled) {
        if (pipeEnabled && message && message.length > 1) {
            var replacedText = void 0;
            var replacePatternProtocol = void 0;
            var replacePatternWWW = void 0;
            var replacePatternMailTo = void 0;
            // URLs starting with http://, https://, or ftp://
            replacePatternProtocol = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = message.replace(replacePatternProtocol, '<a href="$1" target="_blank">$1</a>');
            // URLs starting with "www." (ignoring // before it).
            replacePatternWWW = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePatternWWW, '$1<a href="http://$2" target="_blank">$2</a>');
            // Change email addresses to mailto:: links.
            replacePatternMailTo = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePatternMailTo, '<a href="mailto:$1">$1</a>');
            return replacedText;
        }
        else
            return message;
    };
    LinkfyPipe = __decorate([
        core_1.Pipe({ name: 'linkfy' })
    ], LinkfyPipe);
    return LinkfyPipe;
}());
exports.LinkfyPipe = LinkfyPipe;
//# sourceMappingURL=linkfy.pipe.js.map