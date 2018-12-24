import { Message } from "app/components/components/ng-chat/core/message";

export class SendChatMessageWsCommand {
    commandName:string = "SendChatMessage";
	message:Message;
}