import { Component, OnInit, Input } from '@angular/core';
import { LoginUser } from 'app/models/user/login/loginUser';
import { CreatePostCommand } from 'app/models/social/commands/createPostCommand';
import { SocialService } from 'app/providers/social/social.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
declare var $:any;

@Component({
    selector: 'wossha-post-creator',
    templateUrl: './wossha.post.creator.component.html',
})
export class WosshaPostCreatorComponent implements OnInit {
    
    inFocus:boolean = false;
    @Input() userSessionInfo:LoginUser;
    private createPostCommand: CreatePostCommand;
    
    constructor(private socialService:SocialService,
        private notificationsService: NotificationsService){}

    ngOnInit(){
        this.createPostCommand = new CreatePostCommand();
        this.createPostCommand.username = this.userSessionInfo.username;
    }

    post(){
        this.socialService.executeCommand(this.createPostCommand).subscribe( 
            (messaje) => {
                this.createPostCommand.text = "";
            }, (error: any) => {
                this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
            }
        );
    }

}