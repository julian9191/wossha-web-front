"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var PdPPage = /** @class */ (function () {
    function PdPPage() {
    }
    PdPPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    PdPPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return PdPPage;
}());
exports.PdPPage = PdPPage;
//# sourceMappingURL=app.po.js.map