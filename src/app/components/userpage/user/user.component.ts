import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user/user';
import {UserService} from "../../../providers/user/user.service";
import {SessionInfo} from "../../../models/user/login/sessionInfo";
import {HttpErrorHandlerService} from "../../../providers/auth/httpErrorHandler.service";
import { PictureFile } from '../../../models/global/pictureFile';
import { UserReference } from 'app/models/user/userReference';
import { PhotoSwipeComponent } from 'app/components/components/photo-swipe/photo-swipe.component';
import { PhotoSwipeImage } from 'app/models/global/photoSwipeImage';
import { UserSessionInfo } from 'app/models/user/login/userSessionInfo';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html',
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
    @ViewChild('photoSwipe') photoSwipe: PhotoSwipeComponent;
    public slideImages: PhotoSwipeImage[];
    public username:string;
    public ownProfile: boolean = false;
    
    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private httpErrorHandlerService: HttpErrorHandlerService){
        this.data = new UserReference();
        this.refreshUser();
    }

    ngOnInit(){
        let loginInfo:SessionInfo = this.userService.getLoggedUserSessionInfo();
        let myUserName:string = loginInfo.user.username;
        this.username = this.route.snapshot.paramMap.get("username");
        if(!this.username){
            this.username = myUserName;
        }
        if(this.username == myUserName){
            this.ownProfile = true;
        }
        
        this.getUser();
    }

    getUser(){
        this.userService.getUserByUsername(this.username).subscribe( 
            (data:any) => {
                this.data = Object.assign({}, data);
                this.user = data;
                this.user.profilePicture = new PictureFile(),
                this.user.coverPicture = new PictureFile()
                this.userAux = Object.assign({}, this.user);
                this.initSlideImages();
            }, (error: any) => {
                this.httpErrorHandlerService.handleHttpError(error, "Ha ocurrido un error al intentar la información del usuario");
            }
        );
    }

    initSlideImages(){
        this.slideImages = [
            {
                src: this.getProfileImage(this.data.profilePicture),
                w: 800,
                h: 800
            },
            {
                src: this.getCoverImage(this.data.coverPicture),
                w: 1000,
                h: 333
            }
        ];
    }

    getProfileImage(uuid:string):string{
        if(uuid && !this.user.profilePicture.value){
            return "http://localhost:8083/pictures/static-picture/"+uuid;
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
          return "http://localhost:8083/pictures/static-picture/"+uuid;
        }
        else if(this.user.coverPicture.value){
            return this.user.coverPicture.value;
        }
        else{
          return this.defaultCoverPicture;
        }
    }

    openSlideshow(index:number){
        this.photoSwipe.openGallery(this.slideImages, index);
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
