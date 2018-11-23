import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, Input } from '@angular/core';
import {UserService} from "../../providers/user/user.service";
import {SessionInfo} from "../../models/user/login/sessionInfo";

declare var $:any;
//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/start',
        title: 'Inicio',
        type: 'link',
        icontype: 'pe-7s-graph'
    },{
        path: '/clothing/list-clothing',
        title: 'Prendas',
        type: 'link',
        icontype: 'fa fa-tshirt'
    },{
        path: '/calendar',
        title: 'Calendario',
        type: 'link',
        icontype: 'pe-7s-date'
    },{
        path: '/outfits',
        title: 'Combinaciones',
        type: 'link',
        icontype: 'pe-7s-shuffle'
    },{
        path: '/tiendas',
        title: 'Tiendas',
        type: 'link',
        icontype: 'pe-7s-cart'
    },{
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'pe-7s-plugin',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'pe-7s-note2',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'}
        ]
    },{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'pe-7s-news-paper',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'pe-7s-map-marker',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'pe-7s-graph1'

    },{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'pe-7s-gift',
        children: [
            {path: 'user', title: 'Perfil de usuario', ab:'UP'},
            {path: 'login', title: 'Login', ab:'LP'},
            {path: 'register', title: 'Registro', ab:'RP'},
            {path: 'lock', title: 'Página de bloqueo', ab:'LSP'}
        ]
    }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    public menuItems: any[];
    public userSessionInfo:SessionInfo;
    @Input()
    public profilePicture:any;
    
    constructor(private userService: UserService){}

    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.userSessionInfo = this.userService.getLoggedUserSessionInfo();

        var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (isWindows){
           // if we are on windows OS we activate the perfectScrollbar function
           $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();
           $('html').addClass('perfect-scrollbar-on');
       } else {
           $('html').addClass('perfect-scrollbar-off');
       }
    }
    ngAfterViewInit(){
        var $sidebarParent = $('.sidebar .nav > li.active .collapse li.active > a').parent().parent().parent();

        var collapseId = $sidebarParent.siblings('a').attr("href");

        $(collapseId).collapse("show");
    }

}
