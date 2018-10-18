import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';
import {UserService} from "../../../providers/user/user.service";
import {SessionInfo} from "../../../models/user/login/sessionInfo";
import {HttpErrorHandlerService} from "../../../providers/auth/httpErrorHandler.service";
import { PictureFile } from '../../../models/global/pictureFile';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html',
    styles: ['.image { height: 270px; }', '.content { min-height: 0; }']
})

export class UserComponent implements OnInit{ 

    public user: User;
    
    constructor(private userService: UserService,
        private httpErrorHandlerService: HttpErrorHandlerService){
        this.refreshUser();
    }

    ngOnInit(){
        this.getUser();
    }

    getUser(){
        let loginInfo:SessionInfo = this.userService.getLoggedUserSessionInfo();
        this.userService.getUserByUsername(loginInfo.user.username).subscribe( 
            (data:any) => {
                this.user = data;
            }, (error: any) => {
                this.httpErrorHandlerService.handleHttpError(error, "Ha ocurrido un error al intentar la información del usuario");
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
