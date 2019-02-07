import { ChatUser } from './chatUser';

export interface IChatController
{
    triggerOpenChatWindow(user: ChatUser): void;

    triggerCloseChatWindow(userId: any): void;

    triggerToggleChatWindowVisibility(userId: any): void;
}
