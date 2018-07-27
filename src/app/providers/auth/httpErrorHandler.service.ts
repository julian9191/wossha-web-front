import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { NotificationsService } from '../notifications/notifications.service';
import { UserService } from "../user/user.service";

@Injectable()
export class HttpErrorHandlerService {

  constructor(private router: Router,
    private notificationsService: NotificationsService,
    private userService:UserService) {} 

  handleHttpError(error:any, message:string){
    if(error.status==403){
        this.userService.destroyLoginUserSessionInfo();
        this.notificationsService.showNotification("Su sesión ha expirado", this.notificationsService.DANGER);
        this.router.navigate(['pages','login']);
    }else{
        this.notificationsService.showNotification(message, this.notificationsService.DANGER);
    }
  }

}
