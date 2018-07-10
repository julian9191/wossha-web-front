import { Component, OnInit, ElementRef } from '@angular/core';


declare var $:any;
declare interface User {
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string; //  must be valid email format
    password?: string; // required, value must be equal to confirm password.
    confirmPassword?: string; // required, value must be equal to password.
    birthday?: string;
}

@Component({
    moduleId:module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
    public register: User;
    public maxDate:string;
    public minDate:string;

    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    

    ngOnInit(){
        this.register = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthday: ''
        }

        this.minDate = "1900-01-01";
        this.maxDate = "2003-01-01";

        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    }

    save(model: User, isValid: boolean) {
        // call API to save customer
        console.log(model, isValid);
        console.log(this.register);
        if(isValid){
            console.log(model, isValid);
        }
    }
}