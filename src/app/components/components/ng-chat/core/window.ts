import { Message } from "./message";
import { ChatUser } from "./chatUser";

export class Window
{
    public chattingTo: ChatUser;
    public messages: Message[] = [];
    public newMessage?: string = "";
    
    // UI Behavior properties
    public isCollapsed?: boolean = false; 
    public isLoadingHistory: boolean = false;
    public hasFocus: boolean = false;
    public hasMoreMessages: boolean = true;
    public historyPage: number = 0;
}
