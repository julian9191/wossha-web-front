import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user';
import { Country } from "../../../models/country/country";
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import {UserSessionInfo} from "../../../models/user/login/userSessionInfo";
import {HttpErrorHandlerService} from "../../../providers/auth/httpErrorHandler.service";
import { ModifyUserCommand } from '../../../models/user/modifyUserCommand';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'editUser.component.html'
})

export class EditUserComponent implements OnInit{ 

    public user: User;
    public userAux: User;
    public countries:Country[] = [];
    public minDate:Date;
    public maxDate:Date;
    public modifyUserCommand:ModifyUserCommand = new ModifyUserCommand();
    
    constructor(private userService: UserService, 
        private notificationsService: NotificationsService,
        private httpErrorHandlerService: HttpErrorHandlerService){
            this.getCountries();
    }

    ngOnInit(){
        this.minDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth() - (12*90));
        this.maxDate = new Date();
        this.minDate.setMonth(this.minDate.getMonth() - (12*15));

        this.refreshUser();
    }

    save(model: User, isValid: boolean) {
        if(isValid){
            let _this = this;
            this.notificationsService.showConfirmationAlert("¿Está seguro?", "¿Está seguro de guardar los cambios?", this.notificationsService.WARNING).then(function (response) {
                if(response){
                    model.username=_this.user.username;
                    _this.modifyUserCommand.username=_this.userService.getLoggedUserSessionInfo().user.username;
                    _this.modifyUserCommand.user=model;
                    _this.userService.executeCommand(_this.modifyUserCommand).subscribe( 
                        (messaje) => {
                            _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
                            _this.userAux = Object.assign({}, _this.user);
                        }, (error: any) => {
                            _this.httpErrorHandlerService.handleHttpError(error, error.error.msj);
                        }
                    );
                }
	        });
        }
    }

    getCountries(){
        this.userService.getCountires().subscribe( 
            (data:any) => {
                this.countries = data;
                this.getUser();
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los paises", this.notificationsService.WARNING);
            }
        );
    }

    getUser(){
        let loginInfo:UserSessionInfo = this.userService.getLoggedUserSessionInfo();
        this.userService.getUserByUsername(loginInfo.user.username).subscribe( 
            (data:any) => {
                this.user = data;
                this.userAux = Object.assign({}, this.user);
            }, (error: any) => {
                this.httpErrorHandlerService.handleHttpError(error, "Ha ocurrido un error al intentar la información del usuario");
            }
        );
    }

    somthingChanged(){
        let result:Boolean = false;
        try{
            if(this.user.firstName!=this.userAux.firstName){
                result = true;
            }
            if(this.user.lastName!=this.userAux.lastName){
                result = true;
            }
            if(this.user.email!=this.userAux.email){
                result = true;
            }
            if(this.user.country!=this.userAux.country){
                result = true;
            }
            if(this.user.about!=this.userAux.about){
                result = true;
            }
            if(this.user.birthday!=this.userAux.birthday){
                result = true;
            }
            if(this.user.gender!=this.userAux.gender){
                result = true;
            }
        }catch(e){}
        return result;
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
            gender: null
        }
    }

    
}
