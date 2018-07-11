import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from './model/user';
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../components/notifications/notifications.service';

declare var $:any;


@Component({
    moduleId:module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
    public register: User;
    public maxDate:string;
    public minDate:string;

    constructor(private userService: UserService, 
        private notificationsService: NotificationsService){}

    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    

    ngOnInit(){
        this.minDate = "1900-01-01";
        this.maxDate = "2003-01-01";

        this.refreshUser();
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    }

    save(model: User, isValid: boolean) {
        if(isValid){
            this.userService.registerUser(model).subscribe( 
                (messaje) => {
                    this.refreshUser();
                    this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
                }, (error: any) => {
                    this.notificationsService.showNotification(error.error.msj, this.notificationsService.WARNING);
                }
            );
        }
    }

    refreshUser(){
        this.register = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthday: ''
        }
    }
}