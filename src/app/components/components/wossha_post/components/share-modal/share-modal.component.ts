import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';
import {Location} from '@angular/common';
import { Post } from 'app/models/social/posts/post';
import { SharePostCommand } from 'app/models/social/commands/sharePostCommand';
import { LoginUser } from 'app/models/user/login/loginUser';
import { SocialService } from 'app/providers/social/social.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';

declare var $: any;

@Component({
  selector: 'three-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.css']
})
export class ShareModalComponent implements OnInit {

  @ViewChild('popupthree') popupthree:NgxSmartModalComponent;
  post:Post;
  uuidPost:any = "";
  inFocus:boolean = false;
  placeholder:string = "Comenta algo"
  @ViewChild('textVar') textVar: ElementRef;
  @Output() postCreatedEvent = new EventEmitter<Post>();
  userSessionInfo:LoginUser;
  private sharePostCommand: SharePostCommand = new SharePostCommand();


  constructor(public ngxSmartModalService: NgxSmartModalService,
              private socialService:SocialService,
              private userService: UserService,
              private notificationsService: NotificationsService,
              private _location: Location) { }

  ngOnInit(){
      if(!this.uuidPost){
          this.uuidPost = null;
      }
      this.userSessionInfo = this.userService.getLoggedUserSessionInfo().user;
      this.textVar.nativeElement.innerHTML = "";
      this.textVar.nativeElement.setAttribute('placeholder', this.placeholder);
      this.sharePostCommand.username = this.userSessionInfo.username;
  }


  close(){
    this.popupthree.close();
  }

  onOpen(event){
    this.post = this.popupthree.getData();
    this.textVar.nativeElement.innerHTML = "";
  }

  insertTextModel(text){
    this.sharePostCommand.text = text;
  }

  share(){
    let post:Post = new Post();
    post.username = this.sharePostCommand.username;
    post.text = this.sharePostCommand.text ? this.sharePostCommand.text : "";
    post.created = new Date();
    post.uuidParent = this.uuidPost;
    post.name = this.userSessionInfo.userSessionInfo.firstName+" "+this.userSessionInfo.userSessionInfo.lastName;
    post.profilePicture = this.userSessionInfo.userSessionInfo.picture;
    post.reactions = [];
    post.originalPost = this.post;
    post.showComments = false;

    this.sharePostCommand.uuidOriginalPost = this.post.uuid;
    this.socialService.executeCommand(this.sharePostCommand).subscribe( 
        (messaje) => {
            console.log(messaje);
            this.sharePostCommand.text = "";
            this.textVar.nativeElement.innerHTML = "";
            this.inFocus = false;

            post.uuid = messaje["response"].uuidPost;
            this.postCreatedEvent.emit(post);
            this.popupthree.close();
        }, (error: any) => {
            this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
        }
    );
  }
}