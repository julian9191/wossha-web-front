import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { NotificationsService } from '../../components/components/notifications/notifications.service';
import { LoginAnswer } from '../../models/user/login/loginAnswer';

@Injectable()
export class ActivateGuard  implements CanActivate{
  
    private session:LoginAnswer = null;

    constructor(private notificationsService: NotificationsService, 
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private router: Router){}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(state)
        if (!this.isLoggedIn()) {
            this.router.navigate(['pages', 'login']);
          return false;
        }
    
        return true;
    }

    isLoggedIn(){
        if(this.session == null){
            this.session = this.storage.get('loginInfo');
            if(this.session!=null){
                return true;
            }
        }
        return false
    }

}
