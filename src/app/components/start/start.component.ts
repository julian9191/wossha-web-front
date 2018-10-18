import { Component, OnInit } from '@angular/core';
import {UserService} from "../../providers/user/user.service";
import {SessionInfo} from "../../models/user/login/sessionInfo";

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'start-cmp',
    templateUrl: 'start.component.html'
})

export class StartComponent implements OnInit{
    filledItems = ['Boxer', 'Camiseta', 'Medias'];
    public userSessionInfo:SessionInfo;
    
    constructor(private userService: UserService){}

    ngOnInit(){
        this.userSessionInfo = this.userService.getLoggedUserSessionInfo();
    }
}
