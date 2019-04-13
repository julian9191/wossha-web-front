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
        if(!this.createPostCommand.text){
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
        post.text = this.createPostCommand.text;
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
                this.createPostCommand.text = "";
                this.textVar.nativeElement.innerHTML = "";
                this.inFocus = false;

                post.uuid = messaje["response"].uuidPost;
                post.attachments = messaje["response"].attachments;
                if(messaje["response"].attachments && messaje["response"].attachments.length > 0){
                    post.type='IMAGE_POST';
                }
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
        this.createPostCommand.text = text;
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