import { Message } from "app/components/components/ng-chat/core/message";

export class SendChatMessageWsCommand {
    action:string = "sendMessage";
    commandName:string = "SendChatMessage";
	payload:Message;
}