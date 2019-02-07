import { Component, Input, Output, EventEmitter } from '@angular/core';
/*import { DemoAdapter } from './chat-adapter';
import { UserStatus } from './core/user-status.enum';
import { MessageType } from './core/message-type.enum';
import { Localization } from './core/localization';
import { ChatUser } from './core/chatUser';
import { Message } from "./core/message";
import { LoginUser } from 'app/models/user/login/loginUser';*/


declare var $:any;


@Component({
    selector: 'ng-chat',
    templateUrl: 'ng-chat.component.html',
    styleUrls: [
        //'assets/icons.css',
        //'assets/loading-spinner.css',
        //'assets/ng-chat.component.default.css',
        //'assets/themes/ng-chat.theme.default.scss',
        //'assets/themes/ng-chat.theme.dark.scss'
    ],
})

export class NgChat {
    // Exposes enums for the ng-template
    @Input()
    public adapter: any;

   

}
