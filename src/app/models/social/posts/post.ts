import { Reaction } from "./reaction";
import { Attachment } from "./attachments";
import { PictureFile } from "app/models/global/pictureFile";

export class Post {
    id:number;
    uuid:string;
    type:string;
    username:string;
    name:string;
    profilePicture:string;
    text:string;
    uuidParent:string;
    created:Date;
    modified:Date;
    reactions:any;
    comments:Post[] = [];
    originalPost:Post;
    attachments:Attachment[] = [];
    mentionedUsers:string[] = []
    showComments:boolean = false;
    loading:boolean = false;
}