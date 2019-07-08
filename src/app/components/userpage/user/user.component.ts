import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user/user';
import {UserService} from "../../../providers/user/user.service";
import {SessionInfo} from "../../../models/user/login/sessionInfo";
import {HttpErrorHandlerService} from "../../../providers/auth/httpErrorHandler.service";
import { PictureFile } from '../../../models/global/pictureFile';
import { UserReference } from 'app/models/user/userReference';
import { ActivatedRoute } from '@angular/router';
import { FollowUserCommand } from 'app/models/social/commands/followUserCommand';
import { SocialService } from 'app/providers/social/social.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { FollowingUser } from 'app/models/social/followingUser';
import { StopFollowingUserCommand } from 'app/models/social/commands/stopFollowingUserCommand';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { ChangeSocialInfo } from 'app/reducers/socialInfo/socialInfo.accions';
import { PICTURES_PATH } from "../../../globals";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: './user.component.html',
    styles: ['.image { height: 270px; }', '.content { min-height: 0; }']
})

export class UserComponent implements OnInit{ 

    public user: User;
    public data: UserReference;
    public userAux: User;
    public minDate:Date;
    public maxDate:Date;
    public defaultCoverPicture = "../../assets/img/default_cover.jpg";
    public defaultProfilePicture = "../../assets/img/default-avatar.png";
    
    public username:string;
    public ownProfile: boolean = false;
    public followUserCommand:FollowUserCommand = new FollowUserCommand();
    public stopFollowingUserCommand:StopFollowingUserCommand = new StopFollowingUserCommand();
    public socialInfo:FollowingUser[];
    public slideImages: any[];
    public loading = false;
    public loadingAction = false;
    myConfig = {
        masonry: true
    };
    
    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private socialService: SocialService, 
        private notificationsService: NotificationsService,
        private httpErrorHandlerService: HttpErrorHandlerService,
        public lightbox: CrystalLightbox,
        private store: Store<AppState>){

        socialService.setToken(userService.getToken());
        this.data = new UserReference();
        this.refreshUser();
    }

    ngOnInit(){

        let _that = this;
        this.store.select(x=>x.socialInfo).subscribe(function(userSessionInfo){
            _that.socialInfo = userSessionInfo.followingUser;
        });

        let loginInfo:SessionInfo = this.userService.getLoggedUserSessionInfo();
        let myUserName:string = loginInfo.user.username;
        this.username = this.route.snapshot.paramMap.get("username");

        this.followUserCommand.username=myUserName;
        this.followUserCommand.senderUsername=myUserName;
        this.followUserCommand.senderName=loginInfo.user.userSessionInfo.firstName+" "+loginInfo.user.userSessionInfo.lastName;
        this.followUserCommand.senderPicture=loginInfo.user.userSessionInfo.picture;
        this.followUserCommand.receiverUsername=this.username;

        this.stopFollowingUserCommand.username=myUserName;
        this.stopFollowingUserCommand.followingUserName=this.username;

        if(!this.username){
            this.username = myUserName;
        }
        if(this.username == myUserName){
            this.ownProfile = true;
        }
        
        this.getUser();
    }

    getUser(){
        this.loading = true;
        this.userService.getUserByUsername(this.username).subscribe( 
            (data:any) => {
                this.loading = false;
                this.data = Object.assign({}, data);
                this.user = data;
                this.user.profilePicture = new PictureFile(),
                this.user.coverPicture = new PictureFile()
                this.userAux = Object.assign({}, this.user);
                this.initSlideImages();
            }, (error: any) => {
                this.loading = false;
                this.httpErrorHandlerService.handleHttpError(error, "Ha ocurrido un error al intentar la información del usuario");
            }
        );
    }

    initSlideImages(){
        this.slideImages = [
            {
                preview: this.getProfileImage(this.data.profilePicture),
                full: this.getProfileImage(this.data.profilePicture),
                width: 1000,
                height: 333,
                description: ""
            },
            {
                preview: this.getCoverImage(this.data.coverPicture),
                full: this.getProfileImage(this.data.coverPicture),
                width: 1000,
                height: 333,
                description: ""
            }
        ];
    }

    getProfileImage(uuid:string):string{
        if(uuid && !this.user.profilePicture.value){
            return PICTURES_PATH+uuid;
        }
        else if(this.user.profilePicture.value){
            return this.user.profilePicture.value;
        }
        else{
            return this.defaultProfilePicture;
        }
    }

    getCoverImage(uuid:string):string{
        if(uuid && !this.user.coverPicture.value){
          return PICTURES_PATH+uuid;
        }
        else if(this.user.coverPicture.value){
            return this.user.coverPicture.value;
        }
        else{
          return this.defaultCoverPicture;
        }
    }

    followUser(){
        this.loadingAction = true;
        this.socialService.executeCommand(this.followUserCommand).subscribe( 
            (messaje) => {
                this.loadingAction = false;
                this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
                this.loadFollowingUsers();
            }, (error: any) => {
                this.loadingAction = false;
                this.httpErrorHandlerService.handleHttpError(error, error.error.msj);
            }
        );
    }

    stopFollowingUser(){
        this.loadingAction = true;
        this.socialService.executeCommand(this.stopFollowingUserCommand).subscribe( 
            (messaje) => {
                this.loadingAction = false;
                this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
                this.loadFollowingUsers();
            }, (error: any) => {
                this.loadingAction = false;
                this.httpErrorHandlerService.handleHttpError(error, error.error.msj);
            }
        );
    }

    followStatus():string{
        if(this.ownProfile){
            return "OWN_PROFILE";
        }
        if(this.socialInfo){
            for (let item of this.socialInfo) {
                if(item.username == this.username){
                    if(item.state == 0){
                        return "WAITING_FOR_APPROVAL";
    
                    }else{
                        return "FOLLOWING";
                    }
                }
            }
        }
        return "NOT_FOLLOWING";
    }

    loadFollowingUsers(){
        this.socialService.getFollowingUsers().subscribe( 
            (data:any) => {
                this.store.dispatch(new ChangeSocialInfo(data));
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error de conexión", this.notificationsService.DANGER);
            }
        );
    }

    refreshUser(){
        this.user = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            country: null,
            about: '',
            password: '',
            confirmPassword: '',
            birthday: null,
            gender: null,
            profilePicture: new PictureFile(),
            coverPicture: new PictureFile()
        }
    }
}
