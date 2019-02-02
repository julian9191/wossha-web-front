import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SessionInfo } from 'app/models/user/login/sessionInfo';
import { UserService } from 'app/providers/user/user.service';
import { ChatAdapter } from 'app/components/components/ng-chat/core/chat-adapter';
import { DemoAdapter } from 'app/components/components/ng-chat/chat-adapter';

declare var $: any;

@Component({
    selector: 'app-layout',
    templateUrl: './admin-layout.component.html'
})

export class AdminLayoutComponent implements OnInit {
    location: Location;
    private _router: Subscription;
    public userSessionInfo: SessionInfo;
    // url: string;
    public adapter: ChatAdapter = new DemoAdapter();
    public innerHeight: any;

    @ViewChild('sidebar') sidebar;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;
    constructor( private router: Router, location:Location, private userService: UserService ) {
      this.location = location;
      this.innerHeight = window.innerHeight;
    }

    ngOnInit() {
        this.getUserSessionInfo();
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
        //   this.url = event.url;
          this.navbar.sidebarClose();
        });

        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        /*if (isWindows){
        // if we are on windows OS we activate the perfectScrollbar function
            var $main_panel = $('.main-panel');
            $main_panel.perfectScrollbar();
        }*/

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
            return "http://localhost:8083/pictures/static-picture/"+uuid;
        }
        else{
            return "../assets/img/default-avatar.png";
        }
    }
}
