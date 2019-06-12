import { Component, Input, OnInit, ViewChildren, ViewChild, HostListener, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { ChatUser } from "./core/chatUser";
import { Message } from "./core/message";
import { FileMessage } from "./core/file-message";
import { MessageType } from "./core/message-type.enum";
import { Window } from "./core/window";
import { UserStatus } from "./core/user-status.enum";
import { ScrollDirection } from "./core/scroll-direction.enum";
import { Localization, StatusDescription } from './core/localization';
import { IChatController } from './core/chat-controller';
import { PagedHistoryChatAdapter } from './core/paged-history-chat-adapter';
import { IFileUploadAdapter } from './core/file-upload-adapter';
import { DefaultFileUploadAdapter } from './core/default-file-upload-adapter';
import { UserService } from 'app/providers/user/user.service';
import { FollowingUser } from 'app/models/social/followingUser';
import { LoginUser } from 'app/models/user/login/loginUser';
import { DemoAdapter } from './chat-adapter';
import { SendChatMessageWsCommand } from 'app/models/ws/wsCommands/sendChatMessageWsCommand';
import { SocialService } from 'app/providers/social/social.service';
import { AppNotification } from 'app/models/social/appNotification';
import { Subscription } from 'rxjs';
import { AppState } from 'app/app.reducer';
import { Store } from '@ngrx/store';
import { PICTURES_PATH } from "../../../globals";

@Component({
    selector: 'ng-chat',
    templateUrl: 'ng-chat.component.html'
})

export class NgChat implements OnInit, OnDestroy, IChatController {

    // Exposes enums for the ng-template
    public UserStatus = UserStatus;
    public MessageType = MessageType;
    @Input() public adapter: DemoAdapter;
    @Input() public userId: String;
    @Input() public isCollapsed: boolean = true;
    @Input() public maximizeWindowOnNewMessage: boolean = true;
    @Input() public pollFriendsList: boolean = false;
    @Input() public pollingInterval: number = 5000;
    @Input() public historyEnabled: boolean = true;
    @Input() public emojisEnabled: boolean = true;
    @Input() public linkfyEnabled: boolean = true;
    @Input() public audioEnabled: boolean = true;
    @Input() public searchEnabled: boolean = true;
    @Input() public audioSource: string = 'https://raw.githubusercontent.com/rpaschoal/ng-chat/master/src/ng-chat/assets/notification.wav';
    @Input() public persistWindowsState: boolean = true;
    @Input() public title: string = "Chat";
    @Input() public messagePlaceholder: string = "Escriba un mensaje...";
    @Input() public searchPlaceholder: string = "Buscar";
    @Input() public browserNotificationsEnabled: boolean = true;
    @Input() public browserNotificationIconSource: string = 'https://raw.githubusercontent.com/rpaschoal/ng-chat/master/src/ng-chat/assets/notification.png';
    @Input() public browserNotificationTitle: string = "Nuevo mensaje de";
    @Input() public historyPageSize: number = 10;
    @Input() public localization: Localization;
    public defaultProfilePicture = "../../assets/img/default-avatar.png";
    @Input() public hideFriendsList: boolean = false;
    @Input() public hideFriendsListOnUnsupportedViewport: boolean = true;
    @Input() public fileUploadUrl: string;
    @Input() public theme: string = "light-theme";
    @Input() public customTheme: string;
    @Output() public onUserClicked: EventEmitter<ChatUser> = new EventEmitter<ChatUser>();
    @Output() public onUserChatOpened: EventEmitter<ChatUser> = new EventEmitter<ChatUser>();
    @Output() public onUserChatClosed: EventEmitter<ChatUser> = new EventEmitter<ChatUser>();
    @Output() public onMessagesSeen: EventEmitter<Message[]> = new EventEmitter<Message[]>();
    private browserNotificationsBootstrapped: boolean = false;
    private messageHeight:number = 42;
    public hasPagedHistory: boolean = false;
    public user:LoginUser;
    @Output() followRequestNotifMessage = new EventEmitter<AppNotification>();
    // Defines the size of each opened window to calculate how many windows can be opened on the viewport at the same time.
    public windowSizeFactor: number = 320;
    // Total width size of the friends list section
    public friendsListWidth: number = 262;
    // Available area to render the plugin
    private viewPortTotalArea: number;
    // Set to true if there is no space to display at least one chat window and 'hideFriendsListOnUnsupportedViewport' is true
    public unsupportedViewport: boolean = false;
    // File upload state
    public isUploadingFile = false;
    public fileUploadAdapter: IFileUploadAdapter;
    windows: Window[] = [];
    isBootstrapped: boolean = false;
    @ViewChildren('chatMessages') chatMessageClusters: any;
    @ViewChildren('chatWindowInput') chatWindowInputs: any;
    @ViewChild('nativeFileInput') nativeFileInput: ElementRef;
    private audioFile: HTMLAudioElement;
    public searchInput: string = '';
    protected users: ChatUser[];
    public followingUsers:FollowingUser[];
    public chatSubs:Subscription = new Subscription();

    // Don't want to add this as a setting to simplify usage. Previous placeholder and title settings available to be used, or use full Localization object.
    private statusDescription: StatusDescription = {
        online: 'Online',
        busy: 'Busy',
        away: 'Away',
        offline: 'Offline'
    };

    constructor(public sanitizer: DomSanitizer, 
        private _httpClient: HttpClient,
        private userService: UserService,
        private socialService: SocialService,
        private store: Store<AppState>) {
            userService.setHeaderToken();
            socialService.setToken(userService.getToken());
            this.user = this.userService.getLoggedUserSessionInfo().user;
            this.userId = this.user.username;
    }

    ngOnInit() { 
        this.adapter.component = this;
        this.bootstrapChat();

        let _that = this;
        this.store.select(x=>x.socialInfo).subscribe(function(userSessionInfo){
            _that.followingUsers = userSessionInfo.followingUser;
            _that.chatSubs.unsubscribe();
            _that.listFriends();
        });
    }

    private get localStorageKey(): string 
    {
        return `ng-chat-users-${this.userId}`; // Appending the user id so the state is unique per user in a computer.   
    }; 

    @HostListener('window:resize', ['$event'])
    onResize(event: any){
       this.viewPortTotalArea = event.target.innerWidth;

       this.NormalizeWindows();
    }

    // Checks if there are more opened windows than the view port can display
    private NormalizeWindows(): void
    {
        let maxSupportedOpenedWindows = Math.floor((this.viewPortTotalArea - (!this.hideFriendsList ? this.friendsListWidth : 0)) / this.windowSizeFactor);
        let difference = this.windows.length - maxSupportedOpenedWindows;

        if (difference >= 0){
            this.windows.splice(this.windows.length - difference);
        }

        this.updateWindowsState(this.windows);

        // Viewport should have space for at least one chat window.
        this.unsupportedViewport = this.hideFriendsListOnUnsupportedViewport && maxSupportedOpenedWindows < 1;
    }

    // Initializes the chat plugin and the messaging adapter
    private bootstrapChat(): void
    {
        let initializationException = null;
        if (this.adapter != null && this.userId != null)
        {
            try
            {
                let token:string = this.userService.getLoggedUserSessionInfo().token;
                this.adapter.initializeWebSocketConnection(this.user.username, token);

                this.viewPortTotalArea = window.innerWidth;

                this.initializeDefaultText();
                this.initializeBrowserNotifications();

                // Binding event listeners
                this.adapter.messageReceivedHandler = (user, msg) => this.onMessageReceived(user, msg);
                this.adapter.friendsListChangedHandler = (users) => this.onFriendsListChanged(users);
                
                this.bufferAudioFile();

                this.hasPagedHistory = this.adapter instanceof PagedHistoryChatAdapter;
                
                if (this.fileUploadUrl && this.fileUploadUrl !== "")
                {
                    this.fileUploadAdapter = new DefaultFileUploadAdapter(this.fileUploadUrl, this._httpClient);
                }

                this.isBootstrapped = true;
            }
            catch(ex)
            {
                initializationException = ex;
            }
        }

        if (!this.isBootstrapped){
            console.error("ng-chat component couldn't be bootstrapped.");
            
            if (this.userId == null){
                console.error("ng-chat can't be initialized without an user id. Please make sure you've provided an userId as a parameter of the ng-chat component.");
            }
            if (this.adapter == null){
                console.error("ng-chat can't be bootstrapped without a ChatAdapter. Please make sure you've provided a ChatAdapter implementation as a parameter of the ng-chat component.");
            }
            if (initializationException)
            {
                console.error(`An exception has occurred while initializing ng-chat. Details: ${initializationException.message}`);
                console.error(initializationException);
            }
        }
    }

    listFriends(){
        if(this.followingUsers){
            if(this.followingUsers.length>0){
                let followingUsernames:string[] = this.followingUsers.map(x => x.username);
                this.chatSubs = this.userService.getChatFriends(followingUsernames).subscribe(
                    (data:any) => {
                        this.adapter.filteredUsers = data;
                        this.adapter.onlineUsers = this.adapter.filteredUsers.filter(u => true);
                    }, (error: any) => {}
                );
            }else{
                this.adapter.filteredUsers = []
                this.adapter.onlineUsers = []
            }
        }
        
      }

      searchUser(event){
          if(this.searchInput != ""){
            this.adapter.filteredUsers = this.adapter.onlineUsers.filter(u => u.displayName.toLowerCase().includes(this.searchInput.toLowerCase()));
          }else{
            this.adapter.filteredUsers = this.adapter.onlineUsers.filter(u => true);
          }
      }

    // Initializes browser notifications
    private async initializeBrowserNotifications()
    {
        if (this.browserNotificationsEnabled && ("Notification" in window))
        {
            if (await Notification.requestPermission())
            {
                this.browserNotificationsBootstrapped = true;
            }
        }
    }

    // Initializes default text
    private initializeDefaultText() : void
    {
        if (!this.localization)
        {
            this.localization = {
                messagePlaceholder: this.messagePlaceholder,
                searchPlaceholder: this.searchPlaceholder, 
                title: this.title,
                statusDescription: this.statusDescription,
                browserNotificationTitle: this.browserNotificationTitle,
                loadMessageHistoryPlaceholder: "Cargar mensajes anteriores"
            };
        }
    }

    fetchMessageHistory(window: Window) {
        let params = new HttpParams();
        params = params.append("init", (window.itemsPerPage * (window.currentPage - 1))+"");
        params = params.append("limit", window.itemsPerPage+"");
        this.socialService.getMessageHistory(params).subscribe(
            (data:any) => {
                let result:Message[] = data.result;

                result.forEach((message) => this.assertMessageType(message));
                window.messages = result.concat(window.messages);
                window.isLoadingHistory = false;    

                if(window.messages.length == data.pagination.size){
                    window.hasMoreMessages = false;
                }else{
                    window.hasMoreMessages = true;
                }

                let scrollDirection:ScrollDirection = window.currentPage==1 ? ScrollDirection.Bottom : null;
                setTimeout(() => this.onFetchMessageHistoryLoaded(result, window, scrollDirection));
            
                window.totalItems = data.pagination.size;
                window.currentPage++;
            }, (error: any) => {
                window.isLoadingHistory = false;
                //this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", this.notificationsService.DANGER);
            }
        );
    }

    private onFetchMessageHistoryLoaded(messages: Message[], window: Window, direction: ScrollDirection, forceMarkMessagesAsSeen: boolean = false): void 
    {
        this.scrollChatWindow(window, direction, (this.messageHeight*messages.length))

        if (window.hasFocus || forceMarkMessagesAsSeen)
        {
            const unseenMessages = messages.filter(m => !m.seenOn);

            this.markMessagesAsRead(unseenMessages);
            this.onMessagesSeen.emit(unseenMessages);
        }
    }

    // Updates the friends list via the event handler
    private onFriendsListChanged(users: ChatUser[]): void
    {
        if (users) 
        {
            this.users = users;
        }
    }

    // Handles received messages by the adapter
    private onMessageReceived(user: ChatUser, message: Message)
    {
        if (user && message)
        {
            let chatWindow = this.openChatWindow(user);

            this.assertMessageType(message);
            if (!chatWindow[1] || !this.historyEnabled){
                chatWindow[0].messages.push(message);

                this.scrollChatWindow(chatWindow[0], ScrollDirection.Bottom);

                if (chatWindow[0].hasFocus)
                {
                    this.markMessagesAsRead([message]);
                    this.onMessagesSeen.emit([message]);
                }
            }

            this.emitMessageSound(chatWindow[0]);
            
            // Github issue #58 
            // Do not push browser notifications with message content for privacy purposes if the 'maximizeWindowOnNewMessage' setting is off and this is a new chat window.
            if (this.maximizeWindowOnNewMessage || (!chatWindow[1] && !chatWindow[0].isCollapsed))
            { 
                // Some messages are not pushed because they are loaded by fetching the history hence why we supply the message here
                this.emitBrowserNotification(chatWindow[0], message);
            }
        }
    }

    // Opens a new chat whindow. Takes care of available viewport
    // Returns => [Window: Window object reference, boolean: Indicates if this window is a new chat window]
    public openChatWindow(user: ChatUser, focusOnNewWindow: boolean = false, invokedByUserClick: boolean = false): [Window, boolean]
    {
        // Is this window opened?
        let openedWindow = this.windows.find(x => x.chattingTo.id == user.id);

        if (!openedWindow)
        {
            if (invokedByUserClick) 
            {
                this.onUserClicked.emit(user);
            }

            // Refer to issue #58 on Github 
            let collapseWindow = invokedByUserClick ? false : !this.maximizeWindowOnNewMessage;

            let newChatWindow: Window = {
                chattingTo: user,
                messages:  [],
                isLoadingHistory: this.historyEnabled,
                hasFocus: false, // This will be triggered when the 'newMessage' input gets the current focus
                isCollapsed: collapseWindow,
                hasMoreMessages: false,
                totalItems: 0,
	            currentPage:1,
                itemsPerPage: 15
            };

            // Loads the chat history via an RxJs Observable
            if (this.historyEnabled)
            {
                this.fetchMessageHistory(newChatWindow);
            }

            this.windows.unshift(newChatWindow);

            // Is there enough space left in the view port ?
            if (this.windows.length * this.windowSizeFactor >= this.viewPortTotalArea - (!this.hideFriendsList ? this.friendsListWidth : 0))
            {                
                this.windows.pop();
            }

            this.updateWindowsState(this.windows);
            
            if (focusOnNewWindow && !collapseWindow) 
            {
                this.focusOnWindow(newChatWindow);
            }
            
            this.onUserChatOpened.emit(user);

            return [newChatWindow, true];
        }
        else
        {
            // Returns the existing chat window     
            return [openedWindow, false];       
        }
    }

    // Focus on the input element of the supplied window
    private focusOnWindow(window: Window, callback: Function = () => {}) : void
    {
        let windowIndex = this.windows.indexOf(window);
        if (windowIndex >= 0)
        {
            setTimeout(() => {
                if (this.chatWindowInputs)
                {
                    let messageInputToFocus = this.chatWindowInputs.toArray()[windowIndex];
                
                    messageInputToFocus.nativeElement.focus(); 
                }

                callback(); 
            });
        } 
    }
    

    // Scrolls a chat window message flow to the bottom
    private scrollChatWindow(window: Window, direction: ScrollDirection, scrollHeight?:number): void
    {
        if (!window.isCollapsed){
            let windowIndex = this.windows.indexOf(window);
            setTimeout(() => {
                if (this.chatMessageClusters){
                    let targetWindow = this.chatMessageClusters.toArray()[windowIndex];

                    if (targetWindow)
                    {
                        let element = this.chatMessageClusters.toArray()[windowIndex].nativeElement;
                        let position = scrollHeight;
                        if(direction != null){
                            position = ( direction === ScrollDirection.Top ) ? 0 : element.scrollHeight;
                        }
                        element.scrollTop = position;
                    }
                }
            }); 
        }
    }

    // Marks all messages provided as read with the current time.
    public markMessagesAsRead(messages: Message[]): void
    {
        let currentDate = new Date();

        messages.forEach((msg)=>{
            msg.seenOn = currentDate;
        });
    }

    // Buffers audio file (For component's bootstrapping)
    private bufferAudioFile(): void {
        if (this.audioSource && this.audioSource.length > 0)
        {
            this.audioFile = new Audio();
            this.audioFile.src = this.audioSource;
            this.audioFile.load();
        }
    }

    // Emits a message notification audio if enabled after every message received
    private emitMessageSound(window: Window): void
    {
        if (this.audioEnabled && !window.hasFocus && this.audioFile) {
            this.audioFile.play();
        }
    }

    // Emits a browser notification
    private emitBrowserNotification(window: Window, message: Message): void
    {      
        if (this.browserNotificationsBootstrapped && !window.hasFocus && message && message.message) {
            let notification = new Notification(`${this.localization.browserNotificationTitle} ${window.chattingTo.displayName}`, {
                'body': message.message,
                'icon': this.getProfileImage(window.chattingTo.avatar)
            });

            setTimeout(() => {
                notification.close();
            }, message.message.length <= 50 ? 5000 : 7000); // More time to read longer messages
        }
    }

    // Saves current windows state into local storage if persistence is enabled
    private updateWindowsState(windows: Window[]): void
    {
        if (this.persistWindowsState)
        {
            let usersIds = windows.map((w) => {
                return w.chattingTo.id;
            });

            localStorage.setItem(this.localStorageKey, JSON.stringify(usersIds));
        }
    }

    private restoreWindowsState(): void
    {
        try
        {
            if (this.persistWindowsState)
            {
                let stringfiedUserIds = localStorage.getItem(this.localStorageKey);

                if (stringfiedUserIds && stringfiedUserIds.length > 0)
                {
                    let userIds = <string[]>JSON.parse(stringfiedUserIds);

                    let usersToRestore = this.users.filter(u => userIds.indexOf(u.id) >= 0);

                    usersToRestore.forEach((user) => {
                        this.openChatWindow(user);
                    });
                }
            }
        }
        catch (ex)
        {
            console.error(`An error occurred while restoring ng-chat windows state. Details: ${ex}`);
        }
    }

    // Gets closest open window if any. Most recent opened has priority (Right)
    private getClosestWindow(window: Window): Window | undefined
    {   
        let index = this.windows.indexOf(window);

        if (index > 0)
        {
            return this.windows[index - 1];
        }
        else if (index == 0 && this.windows.length > 1)
        {   
            return this.windows[index + 1];
        }
    }

    private assertMessageType(message: Message): void {
        // Always fallback to "Text" messages to avoid rendenring issues
        if (!message.type)
        {
            message.type = MessageType.Text;
        }
    }

    // Returns the total unread messages from a chat window. TODO: Could use some Angular pipes in the future 
    unreadMessagesTotal(window: Window): string
    {
        if (window){
            let totalUnreadMessages = window.messages.filter(x => x.fromId != this.userId && !x.seenOn).length;
            
            if (totalUnreadMessages > 0){

                if (totalUnreadMessages > 99) 
                    return  "99+";
                else
                    return String(totalUnreadMessages); 
            }
        }
            
        // Empty fallback.
        return "";
    }

    unreadMessagesTotalByUser(user: ChatUser): string
    {
        let openedWindow = this.windows.find(x => x.chattingTo.id == user.id);

        if (openedWindow){
            return this.unreadMessagesTotal(openedWindow);
        }
            
        // Empty fallback.
        return "";
    }

    /*  Monitors pressed keys on a chat window
        - Dispatches a message when the ENTER key is pressed
        - Tabs between windows on TAB or SHIFT + TAB
        - Closes the current focused window on ESC
    */
    onChatInputTyped(event: any, window: Window): void
    {
        switch (event.keyCode)
        {
            case 13:
                if (window.newMessage && window.newMessage.trim() != "")
                {
                    let sendChatMessageWsCommand = new SendChatMessageWsCommand();
                    let message = new Message();
                    message.fromId = this.userId;
                    message.toId = window.chattingTo.id;
                    message.message = window.newMessage;
                    message.sendOn = new Date();
                    sendChatMessageWsCommand.payload = message;
        
                    window.messages.push(message);
        
                    this.adapter.sendCommand(sendChatMessageWsCommand);
        
                    window.newMessage = ""; // Resets the new message input
        
                    this.scrollChatWindow(window, ScrollDirection.Bottom);
                }
                break;
            case 9:
                event.preventDefault();
                
                let currentWindowIndex = this.windows.indexOf(window);
                let messageInputToFocus = this.chatWindowInputs.toArray()[currentWindowIndex + (event.shiftKey ? 1 : -1)]; // Goes back on shift + tab

                if (!messageInputToFocus)
                {
                    // Edge windows, go to start or end
                    messageInputToFocus = this.chatWindowInputs.toArray()[currentWindowIndex > 0 ? 0 : this.chatWindowInputs.length - 1]; 
                }

                messageInputToFocus.nativeElement.focus();

                break;
            case 27:
                let closestWindow = this.getClosestWindow(window);

                if (closestWindow)
                {
                    this.focusOnWindow(closestWindow, () => { this.onCloseChatWindow(window); });
                }
                else
                {
                    this.onCloseChatWindow(window);
                }
        }
    }

    // Closes a chat window via the close 'X' button
    onCloseChatWindow(window: Window): void 
    {
        let index = this.windows.indexOf(window);

        this.windows.splice(index, 1);

        this.updateWindowsState(this.windows);

        this.onUserChatClosed.emit(window.chattingTo);
    }

    // Toggle friends list visibility
    onChatTitleClicked(event: any): void
    {
        this.isCollapsed = !this.isCollapsed;
    }

    // Toggles a chat window visibility between maximized/minimized
    onChatWindowClicked(window: Window): void
    {
        window.isCollapsed = !window.isCollapsed;
        this.scrollChatWindow(window, ScrollDirection.Bottom);
    }

    // Asserts if a user avatar is visible in a chat cluster
    isAvatarVisible(window: Window, message: Message, index: number): boolean
    {
        if (message.fromId != this.userId){
            if (index == 0){
                return true; // First message, good to show the thumbnail
            }
            else{
                // Check if the previous message belongs to the same user, if it belongs there is no need to show the avatar again to form the message cluster
                if (window.messages[index - 1].fromId != message.fromId){
                    return true;
                }
            }
        }

        return false;
    }

    // Toggles a window focus on the focus/blur of a 'newMessage' input
    toggleWindowFocus(window: Window): void
    {
        window.hasFocus = !window.hasFocus;
        if(window.hasFocus) {
            const unreadMessages = window.messages.filter(message => message.seenOn == null && message.toId == this.userId);
            
            if (unreadMessages && unreadMessages.length > 0)
            {
                this.markMessagesAsRead(unreadMessages);
                this.onMessagesSeen.emit(unreadMessages);
            }
        }
    }

    // [Localized] Returns the status descriptive title
    getStatusTitle(status: UserStatus) : any
    {
        let currentStatus = status.toString().toLowerCase();

        return this.localization.statusDescription[currentStatus];
    }

    triggerOpenChatWindow(user: ChatUser): void {
        if (user)
        {
            this.openChatWindow(user);
        }
    }

    triggerCloseChatWindow(userId: any): void {
        let openedWindow = this.windows.find(x => x.chattingTo.id == userId);

        if (openedWindow){
            this.onCloseChatWindow(openedWindow);
        }
    }

    triggerToggleChatWindowVisibility(userId: any): void {
        let openedWindow = this.windows.find(x => x.chattingTo.id == userId);

        if (openedWindow){
            this.onChatWindowClicked(openedWindow);
        }
    }

    // Triggers native file upload for file selection from the user
    triggerNativeFileUpload(): void
    {
        this.nativeFileInput.nativeElement.click();
    }

    // Handles file selection and uploads the selected file using the file upload adapter
    onFileChosen(window: Window): void {
        const file: File = this.nativeFileInput.nativeElement.files[0];

        this.isUploadingFile = true;

        // TODO: Handle failure
        this.fileUploadAdapter.uploadFile(file, window.chattingTo)
            .subscribe(fileMessage => {
                this.isUploadingFile = false;

                fileMessage.fromId = this.userId;

                // Push file message to current user window   
                window.messages.push(fileMessage);
    
                this.adapter.sendMessage(fileMessage);
    
                this.scrollChatWindow(window, ScrollDirection.Bottom);

                // Resets the file upload element
                this.nativeFileInput.nativeElement.value = '';
            });
    }

    getProfileImage(uuid:string):string{
        if(uuid){
            return PICTURES_PATH+uuid;
        }
        else{
            return this.defaultProfilePicture;
        }
    }

    followRequestNotifMessageEmit(notification:AppNotification){
        this.followRequestNotifMessage.emit(notification); 
    }

    ngOnDestroy(){
        this.adapter.disconectSocket();
    }

}