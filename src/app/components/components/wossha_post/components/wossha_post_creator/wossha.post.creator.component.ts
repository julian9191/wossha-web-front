import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { LoginUser } from 'app/models/user/login/loginUser';
import { CreatePostCommand } from 'app/models/social/commands/createPostCommand';
import { SocialService } from 'app/providers/social/social.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { Post } from 'app/models/social/posts/post';
declare var $:any;

@Component({
    selector: 'wossha-post-creator',
    templateUrl: './wossha.post.creator.component.html',
})
export class WosshaPostCreatorComponent implements OnInit {
    
    inFocus:boolean = false;
    @Input() userSessionInfo:LoginUser;
    @Output() postCreatedEvent = new EventEmitter<Post>();
    private createPostCommand: CreatePostCommand;
    @ViewChild('textVar') textVar;
    
    constructor(private socialService:SocialService,
        private notificationsService: NotificationsService){}

    ngOnInit(){
        this.createPostCommand = new CreatePostCommand();
        this.createPostCommand.username = this.userSessionInfo.username;
    }

    post(){
        let post:Post = new Post();
        post.username = this.createPostCommand.username;
        post.text = this.createPostCommand.text;
        post.created = new Date();

        this.socialService.executeCommand(this.createPostCommand).subscribe( 
            (messaje) => {
                this.createPostCommand.text = "";
                this.textVar.nativeElement.innerHTML = "";
                this.inFocus = false;
                this.postCreatedEvent.emit(post);
            }, (error: any) => {
                this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
            }
        );
    }

    insertTextModel(text){
        this.createPostCommand.text = text;
    }

}