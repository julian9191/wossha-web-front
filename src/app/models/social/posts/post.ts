import { Reaction } from "./reaction";

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
    showComments:boolean = false;
}