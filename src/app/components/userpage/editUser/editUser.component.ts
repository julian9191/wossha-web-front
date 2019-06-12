import { Component, OnInit, ViewChild} from '@angular/core';
import { User } from '../../../models/user/user';
import { Country } from "../../../models/country/country";
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import {SessionInfo} from "../../../models/user/login/sessionInfo";
import {HttpErrorHandlerService} from "../../../providers/auth/httpErrorHandler.service";
import { ModifyUserCommand } from '../../../models/user/modifyUserCommand';
import { PictureFile } from '../../../models/global/pictureFile';
import { NgForm } from '@angular/forms';
import { UserReference } from 'app/models/user/userReference';
import { UserSessionInfo } from 'app/models/user/login/userSessionInfo';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { ChangeUserSessionInfo } from 'app/reducers/loggedUser/loggedUser.accions';
import { PICTURES_PATH } from "../../../globals";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'editUser.component.html',
    styleUrls: [ './editUser.component.css' ]
})

export class EditUserComponent implements OnInit{ 

    public user: User;
    public data: UserReference;
    public userAux: User;
    public countries:Country[] = [];
    public minDate:Date;
    public maxDate:Date;
    public defaultCoverPicture = "../../assets/img/default_cover.jpg";
    public defaultProfilePicture = "../../assets/img/default-avatar.png";
    public slideImages: any[];
    public loading = false;
    public editLoading = false;
    myConfig = {
        masonry: true
    };
    
    public modifyUserCommand:ModifyUserCommand = new ModifyUserCommand();
    
    constructor(private userService: UserService, 
        private notificationsService: NotificationsService,
        private httpErrorHandlerService: HttpErrorHandlerService,
        public lightbox: CrystalLightbox,
        private store: Store<AppState>){

            this.data = new UserReference();
            this.refreshUser();
            this.getCountries();
    }

    ngOnInit(){
        this.minDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth() - (12*90));
        this.maxDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth() - (12*15));
    }

    save(model: User, isValid: boolean, pp:NgForm, cp:NgForm) {
        cp.reset();
        if(isValid){
            let nthis = this;
            this.notificationsService.showConfirmationAlert("¿Está seguro?", "¿Está seguro de guardar los cambios?", this.notificationsService.WARNING).then(function (response) {
                if(response){
                    model.username=nthis.user.username;
                    nthis.modifyUserCommand.username=nthis.userService.getLoggedUserSessionInfo().user.username;
                    nthis.modifyUserCommand.user=model;
                    nthis.editLoading = true;
                    nthis.userService.executeCommand(nthis.modifyUserCommand).subscribe( 
                        (messaje) => {
                            nthis.editLoading = false;
                            nthis.notificationsService.showNotification(messaje["msj"], nthis.notificationsService.SUCCESS);
                            nthis.userAux = Object.assign({}, nthis.user);

                            nthis.updateLoggedUserSessionInfo();
                            cp.reset();
                            pp.reset();
                            nthis.refreshUser();
                            nthis.getUser(); 
                        }, (error: any) => {
                            nthis.editLoading = false;
                            nthis.httpErrorHandlerService.handleHttpError(error, error.error.msj);
                        }
                    );
                }
	        });
        }
    }

    updateLoggedUserSessionInfo(){
        this.userService.updateLoggedUserSessionInfo().subscribe( 
            (messaje) => {
                let userSessionInfo:UserSessionInfo = messaje;
                let loginInfo:SessionInfo = this.userService.getLoggedUserSessionInfo();
                loginInfo.user.userSessionInfo = userSessionInfo;
                this.userService.storageLoginUserSessionInfo(loginInfo);

                //this.updateSlide(userSessionInfo);
                this.store.dispatch(new ChangeUserSessionInfo(userSessionInfo));
            }, (error: any) => {
                this.httpErrorHandlerService.handleHttpError(error, error.error.msj);
            }
        );
    }

    /*updateSlide(userSessionInfo:UserSessionInfo){
        $("#slide-profile-picture").attr("src",PICTURES_PATH+userSessionInfo.picture);
        $("#slide-user-name").attr("http",userSessionInfo.firstName+" "+userSessionInfo.lastName);
    }*/

    getCountries(){
        this.loading = true;
        this.userService.getCountires().subscribe( 
            (data:any) => {
                this.countries = data;
                this.getUser();
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los paises", this.notificationsService.DANGER);
            }
        );
    }

    getUser(){
        this.loading = true;
        let loginInfo:SessionInfo = this.userService.getLoggedUserSessionInfo();
        this.userService.getUserByUsername(loginInfo.user.username).subscribe( 
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
                width: 800,
                height: 800,
                description: ""
            },
            {
                preview: this.getCoverImage(this.data.coverPicture),
                full: this.getCoverImage(this.data.coverPicture),
                width: 1000,
                height: 333,
                description: ""
            }
        ];
    }

    somthingChanged(){
        let result:Boolean = false;
        try{
            if(this.user.firstName!=this.userAux.firstName){
                result = true;
            }
            else if(this.user.lastName!=this.userAux.lastName){
                result = true;
            }
            else if(this.user.email!=this.userAux.email){
                result = true;
            }
            else if(this.user.country!=this.userAux.country){
                result = true;
            }
            else if(this.user.about!=this.userAux.about){
                result = true;
            }
            else if(this.user.birthday!=this.userAux.birthday){
                result = true;
            }
            else if(this.user.gender!=this.userAux.gender){
                result = true;
            }
            else if(this.user.profilePicture!=this.userAux.profilePicture){
                result = true;
            }
            else if(this.user.coverPicture!=this.userAux.coverPicture){
                result = true;
            }
        }catch(e){}
        return result;
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
        this.user.profilePicture = new PictureFile();
        this.user.coverPicture = new PictureFile();
    }

    
}
