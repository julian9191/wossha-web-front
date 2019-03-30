import { PictureFile } from "app/models/global/pictureFile";

export class CreatePostCommand {
    commandName:string = "CreatePost";
    username:string;
    uuidParent:string;
    text:string;
    images:PictureFile[] = [];
  }