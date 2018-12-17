import { ChatAdapter} from './components/components/ng-chat/core/chat-adapter';
import { User} from './components/components/ng-chat/core/user';
import { Message} from './components/components/ng-chat/core/message';
import { UserStatus } from './components/components/ng-chat/core/user-status.enum';
import { Observable/*, of*/ } from 'rxjs';
//import { delay } from "rxjs/operators";

export class DemoAdapter extends ChatAdapter
{
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
        /*let mockedHistory: Array<Message>;

        mockedHistory = [
            {
                fromId: 1,
                toId: 999,
                message: "Hi there, just type any message bellow to test this Angular module."
            }
        ];

        return of(mockedHistory).pipe(delay(2000));*/

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
    
    sendMessage(message: Message): void {
        setTimeout(() => {
            let replyMessage = new Message();
            
            replyMessage.fromId = message.toId;
            replyMessage.toId = message.fromId;
            replyMessage.message = "You have typed '" + message.message + "'";
            
            let user = DemoAdapter.mockedUsers.find(x => x.id == replyMessage.fromId);

            this.onMessageReceived(user, replyMessage);
        }, 1000);
    }
}
