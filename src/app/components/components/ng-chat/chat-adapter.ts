import { ChatAdapter} from './core/chat-adapter';
import { User} from './core/user';
import { Message} from './core/message';
import { UserStatus } from './core/user-status.enum';
import { Observable} from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class DemoAdapter extends ChatAdapter
{

    private serverUrl = 'http://localhost:8084/ws';
    private stompClient;

    public static mockedUsers: User[] = [
    {
        id: 1,
        displayName: "Arya Stark",
        avatar: "https://pbs.twimg.com/profile_images/894833370299084800/dXWuVSIb.jpg",
        status: UserStatus.Online
    },
    {
        id: 2,
        displayName: "Cersei Lannister",
        avatar: null,
        status: UserStatus.Online
    },
    {
        id: 3,
        displayName: "Daenerys Targaryen",
        avatar: "https://68.media.tumblr.com/avatar_d28d7149f567_128.png",
        status: UserStatus.Busy
    },
    {
        id: 4,
        displayName: "Eddard Stark",
        avatar: "https://pbs.twimg.com/profile_images/600707945911844864/MNogF757_400x400.jpg",
        status: UserStatus.Offline
    },
    {
        id: 5,
        displayName: "Hodor",
        avatar: "https://pbs.twimg.com/profile_images/378800000449071678/27f2e27edd119a7133110f8635f2c130.jpeg",
        status: UserStatus.Offline
    },
    {
        id: 6,
        displayName: "Jaime Lannister",
        avatar: "https://pbs.twimg.com/profile_images/378800000243930208/4fa8efadb63777ead29046d822606a57.jpeg",
        status: UserStatus.Busy
    },
    {
        id: 7,
        displayName: "John Snow",
        avatar: "https://pbs.twimg.com/profile_images/3456602315/aad436e6fab77ef4098c7a5b86cac8e3.jpeg",
        status: UserStatus.Busy
    },
    {
        id: 8,
        displayName: "Lorde Petyr 'Littlefinger' Baelish",
        avatar: "http://68.media.tumblr.com/avatar_ba75cbb26da7_128.png",
        status: UserStatus.Offline
    },
    {
        id: 9,
        displayName: "Sansa Stark",
        avatar: "http://pm1.narvii.com/6201/dfe7ad75cd32130a5c844d58315cbca02fe5b804_128.jpg",
        status: UserStatus.Online
    },
    {
        id: 10,
        displayName: "Theon Greyjoy",
        avatar: "https://thumbnail.myheritageimages.com/502/323/78502323/000/000114_884889c3n33qfe004v5024_C_64x64C.jpg",
        status: UserStatus.Away
    }];

    listFriends(): Observable<User[]> {
        //return of(DemoAdapter.mockedUsers);

        function sequenceSubscriber(observer) {
            // synchronously deliver 1, 2, and 3, then complete
            observer.next({
                id: 1,
                displayName: "Arya Stark",
                avatar: "https://pbs.twimg.com/profile_images/894833370299084800/dXWuVSIb.jpg",
                status: UserStatus.Online
            });
            observer.next({
                id: 2,
                displayName: "Cersei Lannister",
                avatar: null,
                status: UserStatus.Online
            });
            observer.complete();
           
            // unsubscribe function doesn't need to do anything in this
            // because values are delivered synchronously
            return {unsubscribe() {}};
          }
           
          // Create a new Observable that will deliver the above sequence
          return new Observable(sequenceSubscriber);
    }

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





    initializeWebSocketConnection(){
        let ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        
        let that = this;
        this.stompClient.connect({}, function(frame) {
            that.stompClient.subscribe("/topic/public", function(payload){
                let message:Message = JSON.parse(payload.body);
                if(message.fromId != 999){
                    let user = DemoAdapter.mockedUsers.find(x => x.id == 5/*message.fromId*/);
                    that.onMessageReceived(user, message);
                }
            });
            // Tell your username to the server
            that.stompClient.send("/app/chat.addUser",{},
                JSON.stringify({sender: "username", type: 'JOIN'})
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
