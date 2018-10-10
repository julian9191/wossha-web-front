import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../../../models/user/user';
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import { Country } from "../../../models/country/country";
import {Router} from '@angular/router';
import { PictureFile } from '../../../models/global/pictureFile';

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
    public countries:Country[] = [];

    constructor(private userService: UserService, 
        private notificationsService: NotificationsService,
        private router: Router){
            this.getCountries();
        }

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

        //  Init Bootstrap Select Picker
        if($(".selectpicker").length != 0){
            $(".selectpicker").selectpicker({
                iconBase: "fa",
                tickIcon: "fa-check",
                style: 'selectpicker-background',
            });
        }

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    }

    save(model: User, isValid: boolean) {
        if(isValid){
            this.userService.registerUser(model).subscribe( 
                (messaje) => {
                    this.router.navigate(['pages','login']);
                    this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
                }, (error: any) => {
                    this.notificationsService.showNotification(error.error.msj, this.notificationsService.WARNING);
                }
            );
        }
    }

    getCountries(){
        this.userService.getCountires().subscribe( 
            (data:any) => {
                this.countries = data;
                
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener los paises", this.notificationsService.WARNING);
            },
            () => {
                setTimeout(() => {
                    $('.selectpicker').selectpicker('refresh');
                }, 150);
            }
        );
    }

    refreshUser(){
        this.register = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            country: null,
            password: '',
            confirmPassword: '',
            birthday: null,
            profilePicture: new PictureFile(),
            coverPicture: new PictureFile()
        }
    }
}