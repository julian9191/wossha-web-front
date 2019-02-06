"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var emojiDictionary = [
    { patterns: [':)', ':-)', '=)'], unicode: '😃' },
    { patterns: [':D', ':-D', '=D'], unicode: '😀' },
    { patterns: [':(', ':-(', '=('], unicode: '🙁' },
    { patterns: [':|', ':-|', '=|'], unicode: '😐' },
    { patterns: [':*', ':-*', '=*'], unicode: '😙' },
    { patterns: ['T_T', 'T.T'], unicode: '😭' },
    { patterns: [':O', ':-O', '=O', ':o', ':-o', '=o'], unicode: '😮' },
    { patterns: [':P', ':-P', '=P', ':p', ':-p', '=p'], unicode: '😋' },
    { patterns: ['>.<'], unicode: '😣' },
    { patterns: ['@.@'], unicode: '😵' },
    { patterns: ['*.*'], unicode: '😍' },
    { patterns: ['<3'], unicode: '❤️' },
    { patterns: ['^.^'], unicode: '😊' },
    { patterns: [':+1'], unicode: '👍' },
    { patterns: [':-1'], unicode: '👎' }
];
/*
 * Transforms common emoji text to UTF encoded emojis
*/
var EmojifyPipe = /** @class */ (function () {
    function EmojifyPipe() {
    }
    EmojifyPipe.prototype.transform = function (message, pipeEnabled) {
        if (pipeEnabled && message && message.length > 1) {
            emojiDictionary.forEach(function (emoji) {
                emoji.patterns.forEach(function (pattern) {
                    message = message.replace(pattern, emoji.unicode);
                });
            });
        }
        return message;
    };
    EmojifyPipe = __decorate([
        core_1.Pipe({ name: 'emojify' })
    ], EmojifyPipe);
    return EmojifyPipe;
}());
exports.EmojifyPipe = EmojifyPipe;
//# sourceMappingURL=emojify.pipe.js.map