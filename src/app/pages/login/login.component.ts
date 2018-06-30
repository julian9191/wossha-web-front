import { Component, OnInit, ElementRef } from '@angular/core';
import {LoginService} from "./service/login.service";
import {LoginParams} from "./model/loginParams";
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core';  
import {Router} from '@angular/router';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    test : Date = new Date();
    loginParams: LoginParams = new LoginParams();

    constructor(private loginService: LoginService, 
        @Inject(SESSION_STORAGE) private storage: WebStorageService,
        private router: Router){}
    


    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit(){
        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    login(){
        this.loginService.login(this.loginParams).subscribe( 
            (loginAnswer) => {
                this.storage.set("loginInfo", loginAnswer);
                this.router.navigate(['inicio']);
            }, (error: any) => {
                alert("El usuario o la contraseña son incorrectos");
            }
        );
    }
}
