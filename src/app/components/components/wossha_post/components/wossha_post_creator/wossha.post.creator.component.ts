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
    @Input() userSessionInfo:LoginUser;
    @Input() profileUsername:string;
    @Input() uuidPost:string;
    @Input() placeholder:string;
    @Output() postCreatedEvent = new EventEmitter<Post>();
    @Output() loadingEvent = new EventEmitter<LoadingEventDTO>();
    private createPostCommand: CreatePostCommand;
    @ViewChild('textVar') textVar: ElementRef;
    picture:PictureFile;
    
    constructor(private socialService:SocialService,
        private notificationsService: NotificationsService){}

    ngOnInit(){
        if(!this.uuidPost){
            this.uuidPost = null;
        }
        this.createPostCommand = new CreatePostCommand();
        this.createPostCommand.username = this.userSessionInfo.username;
        this.createPostCommand.uuidParent = this.uuidPost;
        this.textVar.nativeElement.setAttribute('placeholder', this.placeholder);
    }

    post(){
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

                post.uuid = messaje["msj"];
                this.postCreatedEvent.emit(post);
            }, (error: any) => {
                this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
            }
        );
    }

    insertTextModel(text){
        this.createPostCommand.text = text;
    }

    showImageUploader(){
        /*if(!this.showingImageUploader){
            dropzone.showFileSelector()
        }*/
        this.showingImageUploader = !this.showingImageUploader;
    }

    onFilesAdded(event){

    }

    prueba(dropzone){
        //dropzone.reset()
        dropzone.fileCache = [];
        dropzone.previewImages = [];
    }

}