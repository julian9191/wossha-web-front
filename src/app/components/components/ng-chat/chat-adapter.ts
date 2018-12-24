import { ChatAdapter} from './core/chat-adapter';
import { ChatUser} from './core/chatUser';
import { Message} from './core/message';
import { UserStatus } from './core/user-status.enum';
import { Observable} from 'rxjs';
import { WS_SOCIAL_PATH } from "../../../globals";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SocialService } from 'app/providers/social/social.service';

export class DemoAdapter extends ChatAdapter
{

    private stompClient;
    public filteredUsers: ChatUser[] = []
    public myUsername:String = "";
    private socialService: SocialService

    initializeWebSocketConnection(myUsername:string, token:string){
        this.myUsername = myUsername;
        let ws = new SockJS(WS_SOCIAL_PATH+"?token=Bearer "+token);
        this.stompClient = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function(frame) {
            that.stompClient.subscribe("/user/queue/reply", function(payload){
                let message:Message = JSON.parse(payload.body);
                if(message.fromId != myUsername){
                    let user = that.filteredUsers.find(x => x.id == message.fromId);
                    that.onMessageReceived(user, message);
                }
            });
            // Tell your username to the server
            that.stompClient.send("/app/chat.addUser",{},
                JSON.stringify({sender: myUsername, type: 'JOIN'})
            )
        }, this.onError);
    }

    onError(error) {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    }

    sendMessage(message){
		//console.log(message);
        //this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    }

    sendCommand(command){
        this.stompClient.send("/app/social.command", {}, JSON.stringify(command));
    }

}
