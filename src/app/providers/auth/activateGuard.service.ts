import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService} from "../user/user.service";
import { NotificationsService } from '../notifications/notifications.service';
import { UserSessionInfo } from '../../models/user/login/userSessionInfo';

@Injectable()
export class ActivateGuard  implements CanActivate{
  
    private session:UserSessionInfo = null;

    constructor(private notificationsService: NotificationsService,
        private userService: UserService,  
        private router: Router){}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.isLoggedIn()) {
            this.router.navigate(['pages', 'login']);
          return false;
        }
    
        return true;
    }

    isLoggedIn(){
        if(this.session == null){
            this.session = this.userService.getLoggedUserSessionInfo();
            if(this.session!=null){
                return true;
            }
        }
        return false
    }

}
