"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatAdapter = /** @class */ (function () {
    function ChatAdapter() {
        // ### Abstract adapter methods ###
        // Event handlers
        this.friendsListChangedHandler = function (users) { };
        this.messageReceivedHandler = function (user, message) { };
    }
    // ### Adapter/Chat income/ingress events ###
    ChatAdapter.prototype.onFriendsListChanged = function (users) {
        this.friendsListChangedHandler(users);
    };
    ChatAdapter.prototype.onMessageReceived = function (user, message) {
        this.messageReceivedHandler(user, message);
    };
    return ChatAdapter;
}());
exports.ChatAdapter = ChatAdapter;
//# sourceMappingURL=chat-adapter.js.map