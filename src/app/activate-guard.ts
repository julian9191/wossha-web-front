import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { NotificationsService } from './components/notifications/notifications.service';
import { LoginAnswer } from './pages/login/model/loginAnswer';

@Injectable()
export default class ActivateGuard implements CanActivate {

  private can: boolean = false;
  private session:LoginAnswer = null;

  constructor(private notificationsService: NotificationsService, 
    @Inject(SESSION_STORAGE) private storage: WebStorageService){}
  
  canActivate() {
    if(this.session == null){
        this.session = this.storage.get('loginInfo');
        if(this.session!=null){
            this.can=true;
        }
    }

    if (!this.can) {
        this.notificationsService.showNotification("Por favor inicie sesión", this.notificationsService.WARNING);
      return false;
    }

    return true;
  }
}