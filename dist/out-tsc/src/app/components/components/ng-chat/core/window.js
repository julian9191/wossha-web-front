"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Window = /** @class */ (function () {
    function Window() {
        this.messages = [];
        this.newMessage = "";
        // UI Behavior properties
        this.isCollapsed = false;
        this.isLoadingHistory = false;
        this.hasFocus = false;
        this.hasMoreMessages = true;
        this.totalItems = 0;
        this.currentPage = 1;
        this.itemsPerPage = 15;
    }
    return Window;
}());
exports.Window = Window;
//# sourceMappingURL=window.js.map