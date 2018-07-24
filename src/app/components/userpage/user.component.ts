import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user';
import { Country } from "../../models/country/country";
import {UserService} from "../../providers/user/user.service";
import { NotificationsService } from '../../providers/notifications/notifications.service';
import {UserSessionInfo} from "../../models/user/login/userSessionInfo";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{ 

    public user: User;
    public userAux: User;
    public countries:Country[] = [];
    public minDate:Date;
    public maxDate:Date;
    
    constructor(private userService: UserService, 
        private notificationsService: NotificationsService){
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
                    _this.userService.updateUser(model).subscribe( 
                        (messaje) => {
                            _this.notificationsService.showNotification(messaje["msj"], _this.notificationsService.SUCCESS);
                            _this.userAux = Object.assign({}, _this.user);
                        }, (error: any) => {
                            _this.notificationsService.showNotification(error.error.msj, _this.notificationsService.WARNING);
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
                this.notificationsService.showNotification("Ha ocurrido un error al intentar la información del usuario", this.notificationsService.DANGER);
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
