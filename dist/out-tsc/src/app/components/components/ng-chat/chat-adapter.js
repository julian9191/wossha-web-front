"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chat_adapter_1 = require("./core/chat-adapter");
var globals_1 = require("../../../globals");
var globals_2 = require("../../../globals");
var globals_3 = require("../../../globals");
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var connectUserWsCommand_1 = require("app/models/ws/wsCommands/connectUserWsCommand");
var connectMessage_1 = require("app/models/ws/connectMessage");
var DemoAdapter = /** @class */ (function (_super) {
    __extends(DemoAdapter, _super);
    function DemoAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filteredUsers = [];
        _this.onlineUsers = [];
        _this.myUsername = "";
        return _this;
    }
    DemoAdapter.prototype.initializeWebSocketConnection = function (myUsername, token) {
        this.myUsername = myUsername;
        var ws = new SockJS(globals_1.WS_SOCIAL_PATH + "?token=Bearer " + token);
        this.stompClient = Stomp.over(ws);
        var that = this;
        this.stompClient.connect({}, function (frame) {
            that.stompClient.subscribe(globals_2.REPLY_QUEUE, function (payload) {
                that.receiveMessage(payload, myUsername, that);
            });
            // Tell your username to the server
            var connectMessage = new connectMessage_1.ConnectMessage();
            connectMessage.sender = myUsername;
            connectMessage.type = 'JOIN';
            var connectUserWsCommand = new connectUserWsCommand_1.ConnectUserWsCommand();
            connectUserWsCommand.message = connectMessage;
            that.sendCommand(connectUserWsCommand);
        }, this.onError);
    };
    DemoAdapter.prototype.receiveMessage = function (payload, myUsername, that) {
        var payloadObject = JSON.parse(payload.body);
        if (payloadObject.responseType == "CONNECTED-USER-MESSAGE") {
            var connectedUser = payloadObject;
            for (var i = 0; i < that.onlineUsers.length; i++) {
                if (that.onlineUsers[i].id == connectedUser.username) {
                    that.onlineUsers[i].status = 1;
                    break;
                }
            }
        }
        else if ((payloadObject.responseType == "DISCONNECTED-USER-MESSAGE")) {
            var connectedUser = payloadObject;
            for (var i = 0; i < that.onlineUsers.length; i++) {
                if (that.onlineUsers[i].id == connectedUser.username) {
                    that.onlineUsers[i].status = 0;
                    break;
                }
            }
        }
        else if ((payloadObject.responseType == "CHAT-MESSAGE")) {
            var message_1 = payloadObject;
            if (message_1.fromId != myUsername) {
                var user = that.filteredUsers.find(function (x) { return x.id == message_1.fromId; });
                that.onMessageReceived(user, message_1);
            }
        }
    };
    DemoAdapter.prototype.onError = function (error) {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    };
    DemoAdapter.prototype.sendMessage = function (message) {
        //console.log(message);
        //this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    };
    DemoAdapter.prototype.sendCommand = function (command) {
        this.stompClient.send(globals_3.COMMAND_QUEUE, {}, JSON.stringify(command));
    };
    return DemoAdapter;
}(chat_adapter_1.ChatAdapter));
exports.DemoAdapter = DemoAdapter;
//# sourceMappingURL=chat-adapter.js.map