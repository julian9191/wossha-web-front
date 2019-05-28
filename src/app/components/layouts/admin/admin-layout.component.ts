import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SessionInfo } from 'app/models/user/login/sessionInfo';
import { UserService } from 'app/providers/user/user.service';
import { DemoAdapter } from 'app/components/components/ng-chat/chat-adapter';
import { ChatAdapter } from 'app/components/components/ng-chat/core/chat-adapter';
import { AppNotification } from 'app/models/social/appNotification';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { PICTURES_PATH } from "../../../globals";

declare var $: any;

@Component({
    selector: 'app-layout',
    templateUrl: './admin-layout.component.html'
})

export class AdminLayoutComponent implements OnInit {
    location: Location;
    private _router: Subscription;
    public userSessionInfo: SessionInfo;
    public adapter: ChatAdapter;
    public innerHeight: any;
    notificationSubject:Subject<any> = new Subject();
    // url: string;

    @ViewChild('sidebar') sidebar;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    constructor( private router: Router, 
                location:Location, 
                private userService: UserService,
                private store: Store<AppState> ) {

        this.location = location;
        this.innerHeight = window.innerHeight;
        this.adapter = new DemoAdapter(store);
    }

    ngOnInit() {
        this.getUserSessionInfo();
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
        //   this.url = event.url;
          this.navbar.sidebarClose();
        });

        /*var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        if (isWindows){
        // if we are on windows OS we activate the perfectScrollbar function
            var $main_panel = $('.main-panel');
            $main_panel.perfectScrollbar();
        }*/

    }
    public isMap() {
        if (window.location.pathname.indexOf("/maps/fullscreen") !== -1) {
            return true;
        } else {
            return false;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerHeight = window.innerHeight;
    }

    getUserSessionInfo(){
        this.userSessionInfo = this.userService.getLoggedUserSessionInfo();
    }

    getProfilePicture():string{
        let uuid:string = this.userSessionInfo.user.userSessionInfo.picture;
        if(uuid){
            return PICTURES_PATH+"pictures/static-picture/"+uuid;
        }
        else{
            return "../assets/img/default-avatar.png";
        }
    }

    followRequestNotifMessage(notification:AppNotification){
        this.notificationSubject.next(notification);
    }
}
