import { Observable } from 'rxjs';
import { Message } from "./message";
import { ChatUser } from "./chatUser";

export abstract class ChatAdapter
{
    // ### Abstract adapter methods ###

    public abstract initializeWebSocketConnection(myUsername:string);
    
    public abstract getMessageHistory(userId: any): Observable<Message[]>;

    public abstract sendMessage(message: Message): void;

    // ### Adapter/Chat income/ingress events ###

    public onFriendsListChanged(users: ChatUser[]): void
    {
        this.friendsListChangedHandler(users);
    }

    public onMessageReceived(user: ChatUser, message: Message): void
    {
        this.messageReceivedHandler(user, message);
    }
    
    // Event handlers
    friendsListChangedHandler: (users: ChatUser[]) => void  = (users: ChatUser[]) => {};
    messageReceivedHandler: (user: ChatUser, message: Message) => void = (user: ChatUser, message: Message) => {};
}
