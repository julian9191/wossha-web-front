import { Component, OnInit } from '@angular/core';
import {UserService} from "../../providers/user/user.service";
import {UserSessionInfo} from "../../models/user/login/userSessionInfo";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'inicio-cmp',
    templateUrl: 'inicio.component.html'
})

export class InicioComponent implements OnInit{
    filledItems = ['Boxer', 'Camiseta', 'Medias'];
    public userSessionInfo:UserSessionInfo;
    
    constructor(private userService: UserService){}

    ngOnInit(){
        this.userSessionInfo = this.userService.getLoggedUserSessionInfo();
    }
}
