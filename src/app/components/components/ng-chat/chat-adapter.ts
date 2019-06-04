import { ChatAdapter} from './core/chat-adapter';
import { ChatUser} from './core/chatUser';
import { Message} from './core/message';
import { WS_SOCIAL_PATH } from "../../../globals";
import { REPLY_QUEUE } from "../../../globals";
import { COMMAND_QUEUE } from "../../../globals";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { SocialService } from 'app/providers/social/social.service';
import { ConnectedUser } from './core/ConnectedUser';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { FollowingUser } from 'app/models/social/followingUser';
import { Subscription } from 'rxjs';
import { ChangeSocialInfo } from 'app/reducers/socialInfo/socialInfo.accions';
import Sockette from 'sockette'


export class DemoAdapter extends ChatAdapter
{
    private wsClient;
    //private stompClient;
    private token;
    public filteredUsers: ChatUser[] = []
    public onlineUsers: ChatUser[] = []
    public myUsername:String = "";
    private socialService: SocialService
    public component:any;
    public followingUsers:FollowingUser[];
    public chatSubs:Subscription = new Subscription();
    private notificationTypes = ["FOLLOW-REQUEST-NOTIF", "ACCEPT-FOLLOW"];
    
    constructor(private store: Store<AppState>){
        super();
        let _that = this;
        this.store.select(x=>x.socialInfo).subscribe(function(userSessionInfo){
            _that.followingUsers = userSessionInfo.followingUser;
        });
    }

    
    initializeWebSocketConnection(myUsername:string, token:string){
        this.token = token;
        this.myUsername = myUsername;
        /*let ws = new SockJS(WS_SOCIAL_PATH+"?token=Bearer "+token);
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
        }, this.onError);*/

        this.wsClient = new Sockette('wss://tzt7u85zs4.execute-api.us-east-1.amazonaws.com/dev'+"?token=Bearer "+token, {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => console.log('Connected!', e),
            onmessage: e => this.receiveMessage(e.data, myUsername),
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop Attempting!', e),
            onclose: e => console.log('Closed!', e),
            onerror: e => console.log('Error:', e)
        });

       

    }

    disconectSocket(){
        this.wsClient.close();
    }

    receiveMessage(payload, myUsername){

        console.log("receive message: "+payload);
        let payloadObject = JSON.parse(payload);
        if(payloadObject.responseType == "CONNECTED-USER-MESSAGE"){
            let connectedUser:ConnectedUser = payloadObject;
            for(let i=0; i<this.onlineUsers.length; i++) {
                if(this.onlineUsers[i].id==connectedUser.username){
                    this.onlineUsers[i].status = 1;
                    break;
                }
            }
        }else if((payloadObject.responseType == "DISCONNECTED-USER-MESSAGE")){
            let connectedUser:ConnectedUser = payloadObject;
            for(let i=0; i<this.onlineUsers.length; i++) {
                if(this.onlineUsers[i].id==connectedUser.username){
                    this.onlineUsers[i].status = 0;
                    break;
                }
            }
        }else if((payloadObject.responseType == "CHAT-MESSAGE")){
            let message:Message = payloadObject;
            if(message.fromId != myUsername){
                let user = this.filteredUsers.find(x => x.id == message.fromId);
                this.onMessageReceived(user, message);
            }
        }else if(this.notificationTypes.includes(payloadObject.responseType)){
            let message:any = payloadObject;
            if(message.fromId != myUsername){
                for(let i=0; i<this.followingUsers.length; i++){
                    if(message.message.senderUserName==this.followingUsers[i].username){
                        this.followingUsers[i].state=1;
                        break;
                    }
                }
                this.store.dispatch(new ChangeSocialInfo(this.followingUsers));
                this.component.followRequestNotifMessageEmit(message.message);
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
        //command = {"action":"sendMessage","commandName":"SendChatMessage","payload":{"type":1,"fromId":"julian","toId":"carito","message":"fgh","sendOn":"2019-05-24T20:07:30.196Z"},"token":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6Ilt7XCJhdXRob3JpdHlcIjpcIkFETUlOXCJ9LHtcImF1dGhvcml0eVwiOlwiVVNFUlwifSx7XCJhdXRob3JpdHlcIjpcImFkbWluXCJ9XSIsImZpcnN0TmFtZSI6Ikp1bGklQzMlQTFuIiwibGFzdE5hbWUiOiJHaXJhbGRvIiwicHJvZmlsZVBpY3R1cmUiOiJlMjVjODUxZC0zM2Q3LTExZTktOTkzNy0xOWQ4ZjA1N2EyODkiLCJzdWIiOiJqdWxpYW4iLCJpYXQiOjE1NTg3MjE3NTAsImV4cCI6MTU1ODczNTc1MH0.3ZWQYLvtZRcXUZkT-tvJ70ssMKlUy_YuH-XmJ_hSdJBseuyF6u8Q-PRE2PTOq7HI3AdCQCDjLCs0JZkPphopXA"};
        command.token = "Bearer "+this.token;
        let message:string = JSON.stringify(command);
        console.log("enviar: "+message);
        this.wsClient.send(message);
    }

}
