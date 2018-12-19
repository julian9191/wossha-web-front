import { MessageType } from './message-type.enum';

export class Message
{
    public type?: MessageType = MessageType.Text;
    public fromId: String;
    public toId: String;
    public message: string;
    public seenOn?: Date;
}
