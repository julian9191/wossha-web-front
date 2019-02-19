import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import {LoginParams} from "../../../models/user/login/loginParams";
import {SessionInfo} from "../../../models/user/login/sessionInfo"; 
import {Router} from '@angular/router';
import { SocialService } from 'app/providers/social/social.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { SetUserSessionInfo } from 'app/reducers/loggedUser/loggedUser.accions';
import { Subscription } from 'rxjs';

declare var $:any;

@Component({
    moduleId:module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit{
    test : Date = new Date();
    loginParams: LoginParams = new LoginParams();
    sessionInfoSubs: Subscription = new Subscription();
    @Output() loggedinEvent = new EventEmitter<boolean>();

    constructor(private userService: UserService, 
        private socialService: SocialService, 
        private notificationsService: NotificationsService,
        private router: Router,
        private store: Store<AppState>){}
    


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
        let _that = this;
        this.sessionInfoSubs = this.store.subscribe(function(userSessionInfo){
            _that.userService.storageLoginUserSessionInfo(userSessionInfo.loggedUser);
        });

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }

    login(){
        this.userService.login(this.loginParams).subscribe( 
            (userSessionInfo:SessionInfo) => {
                this.store.dispatch( new SetUserSessionInfo(userSessionInfo));
                this.router.navigate(['start']);
                
                this.socialService.setToken(userSessionInfo.token);
                this.loadFollowingUsers();
                this.loggedinEvent.emit(true);
            }, (error: any) => {
                this.notificationsService.showNotification("El usuario o la contraseña son incorrectos", this.notificationsService.WARNING);
            }
        );
    }

    loadFollowingUsers(){
        this.socialService.getFollowingUsers().subscribe( 
            (data:any) => {
                this.userService.storageSocialInfo(data);
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error de conexión", this.notificationsService.DANGER);
            }
        );
    }

}
