import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { LoginUser } from 'app/models/user/login/loginUser';
import { CreatePostCommand } from 'app/models/social/commands/createPostCommand';
import { SocialService } from 'app/providers/social/social.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { Post } from 'app/models/social/posts/post';
import { LoadingEventDTO } from './loadingEventDTO';
import { PictureFile } from 'app/models/global/pictureFile';
declare var $:any;

@Component({
    selector: 'wossha-post-creator',
    templateUrl: './wossha.post.creator.component.html',
    styleUrls: [ './wossha.post.creator.component.css' ]
})
export class WosshaPostCreatorComponent implements OnInit {
    
    inFocus:boolean = false;
    showingImageUploader:boolean = false;
    showingVideoUploader:boolean = false;
    videoUrl:string = "";
    images:PictureFile[];
    @Input() userSessionInfo:LoginUser;
    @Input() profileUsername:string;
    @Input() uuidPost:string;
    @Input() placeholder:string;
    @Output() postCreatedEvent = new EventEmitter<Post>();
    @Output() loadingEvent = new EventEmitter<LoadingEventDTO>();
    private createPostCommand: CreatePostCommand = new CreatePostCommand();
    @ViewChild('textVar') textVar: ElementRef;
    
    constructor(private socialService:SocialService,
        private notificationsService: NotificationsService){}

    ngOnInit(){
        if(!this.uuidPost){
            this.uuidPost = null;
        }
        this.createPostCommand.username = this.userSessionInfo.username;
        this.createPostCommand.uuidParent = this.uuidPost;
        this.textVar.nativeElement.setAttribute('placeholder', this.placeholder);
    }

    post(){
        
        if(!this.createPostCommand.text && (!this.images || this.images.length==0) && this.getVideoCode()==""){
            return;
        }

        let videoCode = this.getVideoCode();
        if(videoCode && this.showingVideoUploader){
            this.createPostCommand.videoCode = videoCode;
        }

        if(this.showingImageUploader){
            this.createPostCommand.images = this.images
        }

        let post:Post = new Post();
        post.username = this.createPostCommand.username;
        post.text = this.createPostCommand.text ? this.createPostCommand.text : "";
        post.created = new Date();
        post.uuidParent = this.uuidPost;
        post.name = this.userSessionInfo.userSessionInfo.firstName+" "+this.userSessionInfo.userSessionInfo.lastName;
        post.profilePicture = this.userSessionInfo.userSessionInfo.picture;
        post.reactions = [];
        post.showComments = false;

        let loadingEventDTO = new LoadingEventDTO();
        loadingEventDTO.loading = true;
        loadingEventDTO.uuidParent = post.uuidParent;
        this.loadingEvent.emit(loadingEventDTO);

        this.socialService.executeCommand(this.createPostCommand).subscribe( 
            (messaje) => {
                console.log(messaje);
                this.createPostCommand.text = "";
                this.textVar.nativeElement.innerHTML = "";
                this.inFocus = false;

                post.uuid = messaje["response"].uuidPost;
                post.attachments = messaje["response"].attachments;
                if(messaje["response"].attachments && messaje["response"].attachments.length > 0){
                    post.type=messaje["response"].attachments[0].type;
                }

                this.createPostCommand.images = [];
                this.createPostCommand.videoCode = "";
                this.images = []; 
                this.videoUrl = "";
                this.postCreatedEvent.emit(post);
            }, (error: any) => {
                this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
            }
        );
    }

    getVideoCode(){
        if(this.videoUrl.startsWith("https://www.youtube.com/embed/")){
            let videoId = this.videoUrl.split("embed/");
            return videoId[1];
        }
        else if(this.videoUrl.startsWith("https://www.youtube.com/watch")){
            let videoId = this.videoUrl.split("=");
            if(videoId.length>0){
                videoId = videoId[1].split("&");
                return videoId[0];
            }
        }else{
            return "";
        }
    }

    insertTextModel(text){
        let startPos = window.getSelection().getRangeAt(0).startOffset;
        console.log("startPos: "+startPos);
        console.log("startPos2: "+window.getSelection().getRangeAt(0).startOffset);
        console.log(window.getSelection().getRangeAt(0).startContainer.parentNode);
        console.log("*******");
        let index = this.getIndexNode(window.getSelection().getRangeAt(0).startContainer.parentNode);
        
        this.createPostCommand.text = this.tagUser(text);
        this.textVar.nativeElement.innerHTML = this.tagUser(text);
        
        this.setStartPosition(index-1, startPos);
    }

    getIndexNode(node: Node):number{
        let index = 0;
        console.log("ITER----------------");
        while(true){
            try{
                console.log(node);
                node = node.previousSibling;
                index++
            }catch(e){
                console.log("++++: "+e);
                break;
            }
        }
        console.log("----------------ITER");
        return index;
    }

    startPos = 0; 
    index = 0;
    setStartPosition(index, startPos) {

        index = index ? index : this.index;
        startPos = startPos ? startPos : this.startPos;

        var range = window.getSelection().getRangeAt(0);
        var sel = window.getSelection();
        
        console.log("index: "+index);
        console.log("----|||");
        console.log(this.textVar.nativeElement.childNodes[index]);
        let element = this.getElement(index, 0);
        console.log(element);

        console.log(111)
        try{
            range.setStart(element, startPos);
        }catch(e){
            let element2 = this.getElement(index, 2);
            startPos = startPos-(element.length+1);
            console.log("&&&&&&: index: "+(index+2)+", startPos: "+startPos);

            range.setStart(element2, startPos);
        }
        
        console.log(222)
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    getElement(index, offset){
        let element = null;
        if(this.textVar.nativeElement.childNodes[index+offset].childNodes[0]){
            element = this.textVar.nativeElement.childNodes[index+offset].childNodes[0];
        }else{
            element = this.textVar.nativeElement.childNodes[index+offset];
        }

        return element;
    }

    tagUser(text):string{
        let lastCharacterIsSpace = false;
        let char = text[text.length-1];
        console.log("charCodeAt: "+text.charCodeAt(text.length-1));
        if(text.charCodeAt(text.length-1)==160){
            lastCharacterIsSpace = true;
        }

        text = text.replace(/\s+/g, " ");

        let array = text.split(" ");
        for (let i = 0; i < array.length; i++) {
            if(i==(array.length-2) && array[array.length-1]=="" && lastCharacterIsSpace){
                array[i] = array[i].startsWith("@") ? "<a id='wd_"+i+"'>"+array[i]+" "+char+"</a>" : "<span id='wd_"+i+"'>"+array[i]+" "+char+"</span>";
                array.pop();
                break;
            }
            array[i] = array[i].startsWith("@") ? "<a id='wd_"+i+"'>"+array[i]+"</a>" : "<span id='wd_"+i+"'>"+array[i]+"</span>";
        }

        let result = array.join(" ");

        console.log("antes2: "+text);
        console.log("despues: "+result);
        
        return result;
    }


    showImageOrVideoUploader(type:string){
        if(type=="IMAGE"){
            this.showingVideoUploader = false;
            this.showingImageUploader = !this.showingImageUploader;
        }else if(type=="VIDEO"){
            this.showingImageUploader = false;
            this.showingVideoUploader = !this.showingVideoUploader;
        }
    }

}