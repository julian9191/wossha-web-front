import { ChatAdapter} from './core/chat-adapter';
import { ChatUser} from './core/chatUser';
import { Message} from './core/message';
import { UserStatus } from './core/user-status.enum';
import { Observable} from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class DemoAdapter extends ChatAdapter
{

    private serverUrl = 'http://localhost:8084/ws';
    private stompClient;
    public filteredUsers: ChatUser[] = []
    public myUsername:String = "";

    getMessageHistory(userId: any): Observable<Message[]> {
        function sequenceSubscriber(observer) {
            // synchronously deliver 1, 2, and 3, then complete
            observer.next({
                fromId: 1,
                toId: 999,
                message: "Hi there, just type any message bellow to test this Angular module."
            });
            observer.complete();
           
            // unsubscribe function doesn't need to do anything in this
            // because values are delivered synchronously
            return {unsubscribe() {}};
          }
           
          // Create a new Observable that will deliver the above sequence
          return new Observable(sequenceSubscriber);
    }

    initializeWebSocketConnection(myUsername:string, token:string){
        this.myUsername = myUsername;
        let ws = new SockJS(this.serverUrl+"?token=Bearer "+token);
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
		console.log(message);
        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    }

}
