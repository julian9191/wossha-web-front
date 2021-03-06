import { Component, OnInit, Renderer, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import {UserService} from "../../../providers/user/user.service";
import { NotificationsService } from '../../../providers/notifications/notifications.service';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { SocialService } from 'app/providers/social/social.service';
import { AppNotification } from 'app/models/social/appNotification';
import { ChangeNotifToViewedCommand } from 'app/models/social/commands/changeNotifToViewedCommand';
import { Subject } from 'rxjs';

var misc:any ={
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
}
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: [ './navbar.component.css' ] 
})

export class NavbarComponent implements OnInit, OnDestroy{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    public searchText:string = "";
    public notifications:AppNotification[] = [];
    public changeNotifToViewedCommand:ChangeNotifToViewedCommand = new ChangeNotifToViewedCommand();
    @Input() notificationSubject:Subject<AppNotification>;
    @ViewChild("navbar-cmp") button;

    constructor(location:Location, private renderer : Renderer, 
        private element : ElementRef,
        private userService: UserService, 
        private notificationsService: NotificationsService, 
        @Inject(SESSION_STORAGE) private storage: WebStorageService,
        private router: Router,
        private socialService: SocialService) {

        socialService.setToken(userService.getToken());
        this.getNotification();
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }


    ngOnInit(){

        this.notificationSubject.subscribe(event => {
            this.notifications.push(event);
        });

        this.listTitles = ROUTES.filter(listTitle => listTitle);

        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        if($('body').hasClass('sidebar-mini')){
            misc.sidebar_mini_active = true;
        }
        $('#minimizeSidebar').click(function(){
            var $btn = $(this);

            if(misc.sidebar_mini_active == true){
                $('body').removeClass('sidebar-mini');
                misc.sidebar_mini_active = false;

            }else{
                setTimeout(function(){
                    $('body').addClass('sidebar-mini');

                    misc.sidebar_mini_active = true;
                },300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            var simulateWindowResize = setInterval(function(){
                window.dispatchEvent(new Event('resize'));
            },180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(function(){
                clearInterval(simulateWindowResize);
            },1000);
        });
    }

    ngOnDestroy() {
        this.notificationSubject.unsubscribe();
    }

    isMobileMenu(){
        if($(window).width() < 991){
            return false;
        }
        return true;
    }

    sidebarOpen(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        },500);
        body.classList.add('nav-open');
        this.sidebarVisible = true;
    }
    sidebarClose(){
        var body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    }
    sidebarToggle(){
        // var toggleButton = this.toggleButton;
        // var body = document.getElementsByTagName('body')[0];
        if(this.sidebarVisible == false){
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle(){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 2 );
        }
        for(var item = 0; item < this.listTitles.length; item++){
            var parent = this.listTitles[item];
            if(parent.path === titlee){
                return parent.title;
            }else if(parent.children){
                var children_from_url = titlee.split("/")[2];
                for(var current = 0; current < parent.children.length; current++){
                    if(parent.children[current].path === children_from_url ){
                        return parent.children[current].title;
                    }
                }
            }
        }
        return 'Dashboard';
    }

    notificationRemovedEvent(notif:AppNotification){
        this.notifications = this.notifications.filter(n => n!=notif);
    }

    notifDropDownOpened(event){
        this.notifications.forEach(function(part, index) {
            this[index].viewed = event;
        }, this.notifications);

        this.changeNotifToViewedCommand.ids = this.notifications.map((x) => {return x.id});
        this.socialService.executeCommand(this.changeNotifToViewedCommand).subscribe( 
        (messaje) => {}, 
        (error: any) => {
            this.notificationsService.showNotification("Ha ocurrido un error al intentar actualizar las notificaciones", this.notificationsService.DANGER);
        });
    }

    getNotViewedNotifSize():number{
        return this.notifications.filter(n => !n.viewed).length;
    }

    getPath(){
        return this.location.prepareExternalUrl(this.location.path());
    }

    logout(){
        this.userService.logout();
    }


    getNotification(){
        this.socialService.getNotifications().subscribe(
            (data:any) => {
                this.notifications = data;
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las notificaciones", this.notificationsService.DANGER);
            }
        );
    }
}
