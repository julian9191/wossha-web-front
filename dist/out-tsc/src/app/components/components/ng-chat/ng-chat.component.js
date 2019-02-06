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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var platform_browser_1 = require("@angular/platform-browser");
var message_1 = require("./core/message");
var message_type_enum_1 = require("./core/message-type.enum");
var user_status_enum_1 = require("./core/user-status.enum");
var scroll_direction_enum_1 = require("./core/scroll-direction.enum");
var paged_history_chat_adapter_1 = require("./core/paged-history-chat-adapter");
var default_file_upload_adapter_1 = require("./core/default-file-upload-adapter");
var user_service_1 = require("app/providers/user/user.service");
var chat_adapter_1 = require("./chat-adapter");
var sendChatMessageWsCommand_1 = require("app/models/ws/wsCommands/sendChatMessageWsCommand");
var social_service_1 = require("app/providers/social/social.service");
var NgChat = /** @class */ (function () {
    function NgChat(sanitizer, _httpClient, userService, socialService) {
        this.sanitizer = sanitizer;
        this._httpClient = _httpClient;
        this.userService = userService;
        this.socialService = socialService;
        // Exposes enums for the ng-template
        this.UserStatus = user_status_enum_1.UserStatus;
        this.MessageType = message_type_enum_1.MessageType;
        this.isCollapsed = true;
        this.maximizeWindowOnNewMessage = true;
        this.pollFriendsList = false;
        this.pollingInterval = 5000;
        this.historyEnabled = true;
        this.emojisEnabled = true;
        this.linkfyEnabled = true;
        this.audioEnabled = true;
        this.searchEnabled = true;
        this.audioSource = 'https://raw.githubusercontent.com/rpaschoal/ng-chat/master/src/ng-chat/assets/notification.wav';
        this.persistWindowsState = true;
        this.title = "Chat";
        this.messagePlaceholder = "Escriba un mensaje...";
        this.searchPlaceholder = "Buscar";
        this.browserNotificationsEnabled = true;
        this.browserNotificationIconSource = 'https://raw.githubusercontent.com/rpaschoal/ng-chat/master/src/ng-chat/assets/notification.png';
        this.browserNotificationTitle = "Nuevo mensaje de";
        this.historyPageSize = 10;
        this.defaultProfilePicture = "../../assets/img/default-avatar.png";
        this.hideFriendsList = false;
        this.hideFriendsListOnUnsupportedViewport = true;
        this.theme = "light-theme";
        this.onUserClicked = new core_1.EventEmitter();
        this.onUserChatOpened = new core_1.EventEmitter();
        this.onUserChatClosed = new core_1.EventEmitter();
        this.onMessagesSeen = new core_1.EventEmitter();
        this.browserNotificationsBootstrapped = false;
        this.messageHeight = 42;
        //filteredUsers: ChatUser[] = [];
        this.hasPagedHistory = false;
        // Don't want to add this as a setting to simplify usage. Previous placeholder and title settings available to be used, or use full Localization object.
        this.statusDescription = {
            online: 'Online',
            busy: 'Busy',
            away: 'Away',
            offline: 'Offline'
        };
        this.searchInput = '';
        // Defines the size of each opened window to calculate how many windows can be opened on the viewport at the same time.
        this.windowSizeFactor = 320;
        // Total width size of the friends list section
        this.friendsListWidth = 262;
        // Set to true if there is no space to display at least one chat window and 'hideFriendsListOnUnsupportedViewport' is true
        this.unsupportedViewport = false;
        // File upload state
        this.isUploadingFile = false;
        this.windows = [];
        this.isBootstrapped = false;
        userService.setHeaderToken();
        socialService.setToken(userService.getToken());
        this.user = this.userService.getLoggedUserSessionInfo().user;
        this.userId = this.user.username;
    }
    Object.defineProperty(NgChat.prototype, "localStorageKey", {
        get: function () {
            return "ng-chat-users-" + this.userId; // Appending the user id so the state is unique per user in a computer.   
        },
        enumerable: true,
        configurable: true
    });
    ;
    NgChat.prototype.ngOnInit = function () {
        this.bootstrapChat();
        this.listFriends();
    };
    NgChat.prototype.onResize = function (event) {
        this.viewPortTotalArea = event.target.innerWidth;
        this.NormalizeWindows();
    };
    // Checks if there are more opened windows than the view port can display
    NgChat.prototype.NormalizeWindows = function () {
        var maxSupportedOpenedWindows = Math.floor((this.viewPortTotalArea - (!this.hideFriendsList ? this.friendsListWidth : 0)) / this.windowSizeFactor);
        var difference = this.windows.length - maxSupportedOpenedWindows;
        if (difference >= 0) {
            this.windows.splice(this.windows.length - difference);
        }
        this.updateWindowsState(this.windows);
        // Viewport should have space for at least one chat window.
        this.unsupportedViewport = this.hideFriendsListOnUnsupportedViewport && maxSupportedOpenedWindows < 1;
    };
    // Initializes the chat plugin and the messaging adapter
    NgChat.prototype.bootstrapChat = function () {
        var _this = this;
        var initializationException = null;
        if (this.adapter != null && this.userId != null) {
            try {
                var token = this.userService.getLoggedUserSessionInfo().token;
                this.adapter.initializeWebSocketConnection(this.user.username, token);
                this.viewPortTotalArea = window.innerWidth;
                this.initializeDefaultText();
                this.initializeBrowserNotifications();
                // Binding event listeners
                this.adapter.messageReceivedHandler = function (user, msg) { return _this.onMessageReceived(user, msg); };
                this.adapter.friendsListChangedHandler = function (users) { return _this.onFriendsListChanged(users); };
                this.bufferAudioFile();
                this.hasPagedHistory = this.adapter instanceof paged_history_chat_adapter_1.PagedHistoryChatAdapter;
                if (this.fileUploadUrl && this.fileUploadUrl !== "") {
                    this.fileUploadAdapter = new default_file_upload_adapter_1.DefaultFileUploadAdapter(this.fileUploadUrl, this._httpClient);
                }
                this.isBootstrapped = true;
            }
            catch (ex) {
                initializationException = ex;
            }
        }
        if (!this.isBootstrapped) {
            console.error("ng-chat component couldn't be bootstrapped.");
            if (this.userId == null) {
                console.error("ng-chat can't be initialized without an user id. Please make sure you've provided an userId as a parameter of the ng-chat component.");
            }
            if (this.adapter == null) {
                console.error("ng-chat can't be bootstrapped without a ChatAdapter. Please make sure you've provided a ChatAdapter implementation as a parameter of the ng-chat component.");
            }
            if (initializationException) {
                console.error("An exception has occurred while initializing ng-chat. Details: " + initializationException.message);
                console.error(initializationException);
            }
        }
    };
    NgChat.prototype.listFriends = function () {
        var _this = this;
        var followingUsers = this.userService.getSocialInfo();
        if (followingUsers) {
            var followingUsernames = followingUsers.map(function (x) { return x.username; });
            this.userService.getChatFriends(followingUsernames).subscribe(function (data) {
                _this.adapter.filteredUsers = data;
                _this.adapter.onlineUsers = _this.adapter.filteredUsers.filter(function (u) { return true; });
            }, function (error) { });
        }
    };
    NgChat.prototype.searchUser = function (event) {
        var _this = this;
        if (this.searchInput != "") {
            this.adapter.filteredUsers = this.adapter.onlineUsers.filter(function (u) { return u.displayName.toLowerCase().includes(_this.searchInput.toLowerCase()); });
        }
        else {
            this.adapter.filteredUsers = this.adapter.onlineUsers.filter(function (u) { return true; });
        }
    };
    // Initializes browser notifications
    NgChat.prototype.initializeBrowserNotifications = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.browserNotificationsEnabled && ("Notification" in window))) return [3 /*break*/, 2];
                        return [4 /*yield*/, Notification.requestPermission()];
                    case 1:
                        if (_a.sent()) {
                            this.browserNotificationsBootstrapped = true;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    // Initializes default text
    NgChat.prototype.initializeDefaultText = function () {
        if (!this.localization) {
            this.localization = {
                messagePlaceholder: this.messagePlaceholder,
                searchPlaceholder: this.searchPlaceholder,
                title: this.title,
                statusDescription: this.statusDescription,
                browserNotificationTitle: this.browserNotificationTitle,
                loadMessageHistoryPlaceholder: "Cargar mensajes anteriores"
            };
        }
    };
    NgChat.prototype.fetchMessageHistory = function (window) {
        var _this = this;
        var params = new http_1.HttpParams();
        params = params.append("init", (window.itemsPerPage * (window.currentPage - 1)) + "");
        params = params.append("limit", window.itemsPerPage + "");
        this.socialService.getMessageHistory(params).subscribe(function (data) {
            var result = data.result;
            result.forEach(function (message) { return _this.assertMessageType(message); });
            window.messages = result.concat(window.messages);
            window.isLoadingHistory = false;
            if (window.messages.length == data.pagination.size) {
                window.hasMoreMessages = false;
            }
            else {
                window.hasMoreMessages = true;
            }
            var scrollDirection = window.currentPage == 1 ? scroll_direction_enum_1.ScrollDirection.Bottom : null;
            setTimeout(function () { return _this.onFetchMessageHistoryLoaded(result, window, scrollDirection); });
            window.totalItems = data.pagination.size;
            window.currentPage++;
        }, function (error) {
            window.isLoadingHistory = false;
            //this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", this.notificationsService.DANGER);
        });
    };
    NgChat.prototype.onFetchMessageHistoryLoaded = function (messages, window, direction, forceMarkMessagesAsSeen) {
        if (forceMarkMessagesAsSeen === void 0) { forceMarkMessagesAsSeen = false; }
        this.scrollChatWindow(window, direction, (this.messageHeight * messages.length));
        if (window.hasFocus || forceMarkMessagesAsSeen) {
            var unseenMessages = messages.filter(function (m) { return !m.seenOn; });
            this.markMessagesAsRead(unseenMessages);
            this.onMessagesSeen.emit(unseenMessages);
        }
    };
    // Updates the friends list via the event handler
    NgChat.prototype.onFriendsListChanged = function (users) {
        if (users) {
            this.users = users;
        }
    };
    // Handles received messages by the adapter
    NgChat.prototype.onMessageReceived = function (user, message) {
        if (user && message) {
            var chatWindow = this.openChatWindow(user);
            this.assertMessageType(message);
            if (!chatWindow[1] || !this.historyEnabled) {
                chatWindow[0].messages.push(message);
                this.scrollChatWindow(chatWindow[0], scroll_direction_enum_1.ScrollDirection.Bottom);
                if (chatWindow[0].hasFocus) {
                    this.markMessagesAsRead([message]);
                    this.onMessagesSeen.emit([message]);
                }
            }
            this.emitMessageSound(chatWindow[0]);
            // Github issue #58 
            // Do not push browser notifications with message content for privacy purposes if the 'maximizeWindowOnNewMessage' setting is off and this is a new chat window.
            if (this.maximizeWindowOnNewMessage || (!chatWindow[1] && !chatWindow[0].isCollapsed)) {
                // Some messages are not pushed because they are loaded by fetching the history hence why we supply the message here
                this.emitBrowserNotification(chatWindow[0], message);
            }
        }
    };
    // Opens a new chat whindow. Takes care of available viewport
    // Returns => [Window: Window object reference, boolean: Indicates if this window is a new chat window]
    NgChat.prototype.openChatWindow = function (user, focusOnNewWindow, invokedByUserClick) {
        if (focusOnNewWindow === void 0) { focusOnNewWindow = false; }
        if (invokedByUserClick === void 0) { invokedByUserClick = false; }
        // Is this window opened?
        var openedWindow = this.windows.find(function (x) { return x.chattingTo.id == user.id; });
        if (!openedWindow) {
            if (invokedByUserClick) {
                this.onUserClicked.emit(user);
            }
            // Refer to issue #58 on Github 
            var collapseWindow = invokedByUserClick ? false : !this.maximizeWindowOnNewMessage;
            var newChatWindow = {
                chattingTo: user,
                messages: [],
                isLoadingHistory: this.historyEnabled,
                hasFocus: false,
                isCollapsed: collapseWindow,
                hasMoreMessages: false,
                totalItems: 0,
                currentPage: 1,
                itemsPerPage: 15
            };
            // Loads the chat history via an RxJs Observable
            if (this.historyEnabled) {
                this.fetchMessageHistory(newChatWindow);
            }
            this.windows.unshift(newChatWindow);
            // Is there enough space left in the view port ?
            if (this.windows.length * this.windowSizeFactor >= this.viewPortTotalArea - (!this.hideFriendsList ? this.friendsListWidth : 0)) {
                this.windows.pop();
            }
            this.updateWindowsState(this.windows);
            if (focusOnNewWindow && !collapseWindow) {
                this.focusOnWindow(newChatWindow);
            }
            this.onUserChatOpened.emit(user);
            return [newChatWindow, true];
        }
        else {
            // Returns the existing chat window     
            return [openedWindow, false];
        }
    };
    // Focus on the input element of the supplied window
    NgChat.prototype.focusOnWindow = function (window, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        var windowIndex = this.windows.indexOf(window);
        if (windowIndex >= 0) {
            setTimeout(function () {
                if (_this.chatWindowInputs) {
                    var messageInputToFocus = _this.chatWindowInputs.toArray()[windowIndex];
                    messageInputToFocus.nativeElement.focus();
                }
                callback();
            });
        }
    };
    // Scrolls a chat window message flow to the bottom
    NgChat.prototype.scrollChatWindow = function (window, direction, scrollHeight) {
        var _this = this;
        if (!window.isCollapsed) {
            var windowIndex_1 = this.windows.indexOf(window);
            setTimeout(function () {
                if (_this.chatMessageClusters) {
                    var targetWindow = _this.chatMessageClusters.toArray()[windowIndex_1];
                    if (targetWindow) {
                        var element = _this.chatMessageClusters.toArray()[windowIndex_1].nativeElement;
                        var position = scrollHeight;
                        if (direction != null) {
                            position = (direction === scroll_direction_enum_1.ScrollDirection.Top) ? 0 : element.scrollHeight;
                        }
                        element.scrollTop = position;
                    }
                }
            });
        }
    };
    // Marks all messages provided as read with the current time.
    NgChat.prototype.markMessagesAsRead = function (messages) {
        var currentDate = new Date();
        messages.forEach(function (msg) {
            msg.seenOn = currentDate;
        });
    };
    // Buffers audio file (For component's bootstrapping)
    NgChat.prototype.bufferAudioFile = function () {
        if (this.audioSource && this.audioSource.length > 0) {
            this.audioFile = new Audio();
            this.audioFile.src = this.audioSource;
            this.audioFile.load();
        }
    };
    // Emits a message notification audio if enabled after every message received
    NgChat.prototype.emitMessageSound = function (window) {
        if (this.audioEnabled && !window.hasFocus && this.audioFile) {
            this.audioFile.play();
        }
    };
    // Emits a browser notification
    NgChat.prototype.emitBrowserNotification = function (window, message) {
        if (this.browserNotificationsBootstrapped && !window.hasFocus && message && message.message) {
            var notification_1 = new Notification(this.localization.browserNotificationTitle + " " + window.chattingTo.displayName, {
                'body': message.message,
                'icon': this.getProfileImage(window.chattingTo.avatar)
            });
            setTimeout(function () {
                notification_1.close();
            }, message.message.length <= 50 ? 5000 : 7000); // More time to read longer messages
        }
    };
    // Saves current windows state into local storage if persistence is enabled
    NgChat.prototype.updateWindowsState = function (windows) {
        if (this.persistWindowsState) {
            var usersIds = windows.map(function (w) {
                return w.chattingTo.id;
            });
            localStorage.setItem(this.localStorageKey, JSON.stringify(usersIds));
        }
    };
    NgChat.prototype.restoreWindowsState = function () {
        var _this = this;
        try {
            if (this.persistWindowsState) {
                var stringfiedUserIds = localStorage.getItem(this.localStorageKey);
                if (stringfiedUserIds && stringfiedUserIds.length > 0) {
                    var userIds_1 = JSON.parse(stringfiedUserIds);
                    var usersToRestore = this.users.filter(function (u) { return userIds_1.indexOf(u.id) >= 0; });
                    usersToRestore.forEach(function (user) {
                        _this.openChatWindow(user);
                    });
                }
            }
        }
        catch (ex) {
            console.error("An error occurred while restoring ng-chat windows state. Details: " + ex);
        }
    };
    // Gets closest open window if any. Most recent opened has priority (Right)
    NgChat.prototype.getClosestWindow = function (window) {
        var index = this.windows.indexOf(window);
        if (index > 0) {
            return this.windows[index - 1];
        }
        else if (index == 0 && this.windows.length > 1) {
            return this.windows[index + 1];
        }
    };
    NgChat.prototype.assertMessageType = function (message) {
        // Always fallback to "Text" messages to avoid rendenring issues
        if (!message.type) {
            message.type = message_type_enum_1.MessageType.Text;
        }
    };
    // Returns the total unread messages from a chat window. TODO: Could use some Angular pipes in the future 
    NgChat.prototype.unreadMessagesTotal = function (window) {
        var _this = this;
        if (window) {
            var totalUnreadMessages = window.messages.filter(function (x) { return x.fromId != _this.userId && !x.seenOn; }).length;
            if (totalUnreadMessages > 0) {
                if (totalUnreadMessages > 99)
                    return "99+";
                else
                    return String(totalUnreadMessages);
            }
        }
        // Empty fallback.
        return "";
    };
    NgChat.prototype.unreadMessagesTotalByUser = function (user) {
        var openedWindow = this.windows.find(function (x) { return x.chattingTo.id == user.id; });
        if (openedWindow) {
            return this.unreadMessagesTotal(openedWindow);
        }
        // Empty fallback.
        return "";
    };
    /*  Monitors pressed keys on a chat window
        - Dispatches a message when the ENTER key is pressed
        - Tabs between windows on TAB or SHIFT + TAB
        - Closes the current focused window on ESC
    */
    NgChat.prototype.onChatInputTyped = function (event, window) {
        var _this = this;
        switch (event.keyCode) {
            case 13:
                if (window.newMessage && window.newMessage.trim() != "") {
                    var sendChatMessageWsCommand = new sendChatMessageWsCommand_1.SendChatMessageWsCommand();
                    var message = new message_1.Message();
                    message.fromId = this.userId;
                    message.toId = window.chattingTo.id;
                    message.message = window.newMessage;
                    message.sendOn = new Date();
                    sendChatMessageWsCommand.message = message;
                    window.messages.push(message);
                    this.adapter.sendCommand(sendChatMessageWsCommand);
                    window.newMessage = ""; // Resets the new message input
                    this.scrollChatWindow(window, scroll_direction_enum_1.ScrollDirection.Bottom);
                }
                break;
            case 9:
                event.preventDefault();
                var currentWindowIndex = this.windows.indexOf(window);
                var messageInputToFocus = this.chatWindowInputs.toArray()[currentWindowIndex + (event.shiftKey ? 1 : -1)]; // Goes back on shift + tab
                if (!messageInputToFocus) {
                    // Edge windows, go to start or end
                    messageInputToFocus = this.chatWindowInputs.toArray()[currentWindowIndex > 0 ? 0 : this.chatWindowInputs.length - 1];
                }
                messageInputToFocus.nativeElement.focus();
                break;
            case 27:
                var closestWindow = this.getClosestWindow(window);
                if (closestWindow) {
                    this.focusOnWindow(closestWindow, function () { _this.onCloseChatWindow(window); });
                }
                else {
                    this.onCloseChatWindow(window);
                }
        }
    };
    // Closes a chat window via the close 'X' button
    NgChat.prototype.onCloseChatWindow = function (window) {
        var index = this.windows.indexOf(window);
        this.windows.splice(index, 1);
        this.updateWindowsState(this.windows);
        this.onUserChatClosed.emit(window.chattingTo);
    };
    // Toggle friends list visibility
    NgChat.prototype.onChatTitleClicked = function (event) {
        this.isCollapsed = !this.isCollapsed;
    };
    // Toggles a chat window visibility between maximized/minimized
    NgChat.prototype.onChatWindowClicked = function (window) {
        window.isCollapsed = !window.isCollapsed;
        this.scrollChatWindow(window, scroll_direction_enum_1.ScrollDirection.Bottom);
    };
    // Asserts if a user avatar is visible in a chat cluster
    NgChat.prototype.isAvatarVisible = function (window, message, index) {
        if (message.fromId != this.userId) {
            if (index == 0) {
                return true; // First message, good to show the thumbnail
            }
            else {
                // Check if the previous message belongs to the same user, if it belongs there is no need to show the avatar again to form the message cluster
                if (window.messages[index - 1].fromId != message.fromId) {
                    return true;
                }
            }
        }
        return false;
    };
    // Toggles a window focus on the focus/blur of a 'newMessage' input
    NgChat.prototype.toggleWindowFocus = function (window) {
        var _this = this;
        window.hasFocus = !window.hasFocus;
        if (window.hasFocus) {
            var unreadMessages = window.messages.filter(function (message) { return message.seenOn == null && message.toId == _this.userId; });
            if (unreadMessages && unreadMessages.length > 0) {
                this.markMessagesAsRead(unreadMessages);
                this.onMessagesSeen.emit(unreadMessages);
            }
        }
    };
    // [Localized] Returns the status descriptive title
    NgChat.prototype.getStatusTitle = function (status) {
        var currentStatus = status.toString().toLowerCase();
        return this.localization.statusDescription[currentStatus];
    };
    NgChat.prototype.triggerOpenChatWindow = function (user) {
        if (user) {
            this.openChatWindow(user);
        }
    };
    NgChat.prototype.triggerCloseChatWindow = function (userId) {
        var openedWindow = this.windows.find(function (x) { return x.chattingTo.id == userId; });
        if (openedWindow) {
            this.onCloseChatWindow(openedWindow);
        }
    };
    NgChat.prototype.triggerToggleChatWindowVisibility = function (userId) {
        var openedWindow = this.windows.find(function (x) { return x.chattingTo.id == userId; });
        if (openedWindow) {
            this.onChatWindowClicked(openedWindow);
        }
    };
    // Triggers native file upload for file selection from the user
    NgChat.prototype.triggerNativeFileUpload = function () {
        this.nativeFileInput.nativeElement.click();
    };
    // Handles file selection and uploads the selected file using the file upload adapter
    NgChat.prototype.onFileChosen = function (window) {
        var _this = this;
        var file = this.nativeFileInput.nativeElement.files[0];
        this.isUploadingFile = true;
        // TODO: Handle failure
        this.fileUploadAdapter.uploadFile(file, window.chattingTo)
            .subscribe(function (fileMessage) {
            _this.isUploadingFile = false;
            fileMessage.fromId = _this.userId;
            // Push file message to current user window   
            window.messages.push(fileMessage);
            _this.adapter.sendMessage(fileMessage);
            _this.scrollChatWindow(window, scroll_direction_enum_1.ScrollDirection.Bottom);
            // Resets the file upload element
            _this.nativeFileInput.nativeElement.value = '';
        });
    };
    NgChat.prototype.getProfileImage = function (uuid) {
        if (uuid) {
            return "http://localhost:8083/pictures/static-picture/" + uuid;
        }
        else {
            return this.defaultProfilePicture;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", chat_adapter_1.DemoAdapter)
    ], NgChat.prototype, "adapter", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgChat.prototype, "userId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "isCollapsed", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "maximizeWindowOnNewMessage", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "pollFriendsList", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgChat.prototype, "pollingInterval", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "historyEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "emojisEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "linkfyEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "audioEnabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "searchEnabled", void 0);
    __decorate([
        core_1.Input() // TODO: This might need a better content strategy
        ,
        __metadata("design:type", String)
    ], NgChat.prototype, "audioSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "persistWindowsState", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgChat.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgChat.prototype, "messagePlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgChat.prototype, "searchPlaceholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "browserNotificationsEnabled", void 0);
    __decorate([
        core_1.Input() // TODO: This might need a better content strategy
        ,
        __metadata("design:type", String)
    ], NgChat.prototype, "browserNotificationIconSource", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgChat.prototype, "browserNotificationTitle", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], NgChat.prototype, "historyPageSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NgChat.prototype, "localization", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "hideFriendsList", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], NgChat.prototype, "hideFriendsListOnUnsupportedViewport", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgChat.prototype, "fileUploadUrl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgChat.prototype, "theme", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], NgChat.prototype, "customTheme", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NgChat.prototype, "onUserClicked", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NgChat.prototype, "onUserChatOpened", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NgChat.prototype, "onUserChatClosed", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NgChat.prototype, "onMessagesSeen", void 0);
    __decorate([
        core_1.ViewChildren('chatMessages'),
        __metadata("design:type", Object)
    ], NgChat.prototype, "chatMessageClusters", void 0);
    __decorate([
        core_1.ViewChildren('chatWindowInput'),
        __metadata("design:type", Object)
    ], NgChat.prototype, "chatWindowInputs", void 0);
    __decorate([
        core_1.ViewChild('nativeFileInput'),
        __metadata("design:type", core_1.ElementRef)
    ], NgChat.prototype, "nativeFileInput", void 0);
    __decorate([
        core_1.HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NgChat.prototype, "onResize", null);
    NgChat = __decorate([
        core_1.Component({
            selector: 'ng-chat',
            templateUrl: 'ng-chat.component.html',
            styleUrls: [
                'assets/icons.css',
                'assets/loading-spinner.css',
                'assets/ng-chat.component.default.css',
                'assets/themes/ng-chat.theme.default.scss',
                'assets/themes/ng-chat.theme.dark.scss'
            ],
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer,
            http_1.HttpClient,
            user_service_1.UserService,
            social_service_1.SocialService])
    ], NgChat);
    return NgChat;
}());
exports.NgChat = NgChat;
//# sourceMappingURL=ng-chat.component.js.map