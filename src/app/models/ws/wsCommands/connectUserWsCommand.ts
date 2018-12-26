import { ConnectMessage } from "../connectMessage";

export class ConnectUserWsCommand {
    commandName:string = "ConnectUser";
	message:ConnectMessage;
}