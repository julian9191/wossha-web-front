import { ChatAdapter} from './core/chat-adapter';
import { ChatUser} from './core/chatUser';
import { Message} from './core/message';
import { WS_SOCIAL_PATH } from "../../globals";
import { REPLY_QUEUE } from "../../globals";
import { COMMAND_QUEUE } from "../../globals";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SocialService } from 'app/providers/social/social.service';
import { ConnectUserWsCommand } from 'app/models/ws/wsCommands/connectUserWsCommand';
import { ConnectMessage } from 'app/models/ws/connectMessage';
import { ConnectedUser } from './core/ConnectedUser';

export class DemoAdapter extends ChatAdapter
{

    private stompClient;
    public filteredUsers: ChatUser[] = []
    public onlineUsers: ChatUser[] = []
    public myUsername:String = "";
    private socialService: SocialService

    initializeWebSocketConnection(myUsername:string, token:string){
        this.myUsername = myUsername;
        let ws = new SockJS(WS_SOCIAL_PATH+"?token=Bearer "+token);
        this.stompClient = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function(frame) {
            that.stompClient.subscribe(REPLY_QUEUE, function(payload){
                that.receiveMessage(payload, myUsername, that);
            });
            // Tell your username to the server
            let connectMessage:ConnectMessage = new ConnectMessage();
            connectMessage.sender = myUsername;
            connectMessage.type = 'JOIN';
            let connectUserWsCommand:ConnectUserWsCommand = new ConnectUserWsCommand();
            connectUserWsCommand.message = connectMessage;
            that.sendCommand(connectUserWsCommand);
        }, this.onError);
    }

    receiveMessage(payload, myUsername, that){
        let payloadObject = JSON.parse(payload.body);
        if(payloadObject.responseType == "CONNECTED-USER-MESSAGE"){
            let connectedUser:ConnectedUser = payloadObject;
            for(let i=0; i<that.onlineUsers.length; i++) {
                if(that.onlineUsers[i].id==connectedUser.username){
                    that.onlineUsers[i].status = 1;
                    break;
                }
            }
        }else if((payloadObject.responseType == "DISCONNECTED-USER-MESSAGE")){
            let connectedUser:ConnectedUser = payloadObject;
            for(let i=0; i<that.onlineUsers.length; i++) {
                if(that.onlineUsers[i].id==connectedUser.username){
                    that.onlineUsers[i].status = 0;
                    break;
                }
            }
        }else if((payloadObject.responseType == "CHAT-MESSAGE")){
            let message:Message = payloadObject;
            if(message.fromId != myUsername){
                let user = that.filteredUsers.find(x => x.id == message.fromId);
                that.onMessageReceived(user, message);
            }
        }
    }

    onError(error) {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    }

    sendMessage(message){
		//console.log(message);
        //this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    }

    sendCommand(command){
        this.stompClient.send(COMMAND_QUEUE, {}, JSON.stringify(command));
    }

}
