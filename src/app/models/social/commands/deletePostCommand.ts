import { Attachment } from "../posts/attachments";

export class DeletePostCommand {
    commandName:string = "DeletePost";
    username:string;
    uuidPost:string;
    comments:string[] = [];
    attachments:Attachment[] = [];
  }