import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { LoginUser } from 'app/models/user/login/loginUser';
import { CreatePostCommand } from 'app/models/social/commands/createPostCommand';
import { SocialService } from 'app/providers/social/social.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { Post } from 'app/models/social/posts/post';
import { LoadingEventDTO } from './loadingEventDTO';
import { PictureFile } from 'app/models/global/pictureFile';
import Tribute from 'tributejs';
import { PICTURES_PATH } from 'app/globals';
import { UserService } from 'app/providers/user/user.service';
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
    public tributeMultipleTriggers = this.initTribute();
    
    constructor(private socialService:SocialService,
        private notificationsService: NotificationsService,
        private userService: UserService){}

    ngOnInit(){
        let $this = this;

        //initializ mention system (zurb tribute js)
        this.tributeMultipleTriggers.attach(this.textVar.nativeElement);
        this.textVar.nativeElement.addEventListener('tribute-replaced', function (e) {
            $this.createPostCommand.mentionedUsers.push(e.detail.item.original.key);
        });

        if(!this.uuidPost){
            this.uuidPost = null;
        }
        this.createPostCommand.username = this.userSessionInfo.username;
        this.createPostCommand.uuidParent = this.uuidPost;
        this.textVar.nativeElement.setAttribute('placeholder', this.placeholder);
    }

    initTribute(){
        let $this = this;
        return new Tribute({
            collection: [{
              // The function that gets call on select that retuns the content to insert
              selectTemplate: function (item) {
                if (this.range.isContentEditable(this.current.element)) {
                  return '<a href="javascript:void(0)" title="' + item.original.name + '">@' + item.original.key + '</a>';
                }
    
                return '@' + item.original.name;
              },
              menuItemTemplate: function (item) {
    
                let imageSrc = item.original.picture ? PICTURES_PATH+item.original.picture : "../assets/img/default-avatar.png";
    
                return `
                    <div class="search-picture">
                        <img id="slide-profile-picture" style="width: 34px; height: 34px;" src="${imageSrc}" />
                    </div>
                    <div style="float: left">
                        <strong>${item.original.name}</strong><br>
                        <span style="color: #ffa534">@${item.original.key}</span>
                    </div>
                    <div class="clear"></div>
                `;
              },
              // the array of objects
              /*values: [
                {key: 'juliancho9191', name: 'Julian Giraldo', picture: '29f794fd-8eca-11e9-a116-6fcd3081ca34'},
                {key: 'Sir Walter Riley', name: 'Sir Walter Riley'}
              ]*/
              values: function (text, cb) {
                $this.getMentionData(text, users => cb(users));
              },
              lookup: 'name',
              fillAttr: 'name'
            }/*,
            {
              // The symbol that starts the lookup
              trigger: '#',
    
              // The function that gets call on select that retuns the content to insert
              selectTemplate: function (item) {
                if (this.range.isContentEditable(this.current.element)) {
                  return '<a href="mailto:'+item.original.email+'">#' + item.original.name.replace() + '</a>';
                }
    
                return '#' + item.original.name;
              },
    
              // function retrieving an array of objects
              values: [
                {name: 'Bob Bill', email: 'bobbill@example.com'},
                {name: 'Steve Stevenston', email: 'steve@example.com'}
              ],
    
              lookup: 'name',
    
              fillAttr: 'name'
            }*/]
          });
    }

    getMentionData(word, cb) {
        /*cb( [
            {key: 'juliancho9191', value: 'Julian Giraldo', picture: '29f794fd-8eca-11e9-a116-6fcd3081ca34'},
            {key: 'Sir Walter Riley', value: 'Sir Walter Riley'}
        ]);*/

        this.userService.searchUser(word).subscribe(
            (data:any) => {
                if(data && data.length>0){
                    let result = data.map((x) => {
                        return {key: x.username, name: x.name, picture: x.profilePicture};
                    });
                    cb(result);
                }else{
                    cb([]);  
                }
            }, (error: any) => {
                cb([]);
            }
        );

        
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
        this.createPostCommand.mentionedUsers = this.removeRemovedMentionedUsers();

        let post:Post = new Post();
        post.username = this.createPostCommand.username;
        post.text = this.createPostCommand.text ? this.createPostCommand.text : "";
        post.created = new Date();
        post.uuidParent = this.uuidPost;
        post.name = this.userSessionInfo.userSessionInfo.firstName+" "+this.userSessionInfo.userSessionInfo.lastName;
        post.profilePicture = this.userSessionInfo.userSessionInfo.picture;
        post.reactions = [];
        post.mentionedUsers = this.createPostCommand.mentionedUsers;
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

    removeRemovedMentionedUsers(){
        return this.createPostCommand.mentionedUsers.filter(x=>this.createPostCommand.text.includes("@"+x));
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
