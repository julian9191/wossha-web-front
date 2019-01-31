import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppNotification } from 'app/models/social/appNotification';
import { UserService } from 'app/providers/user/user.service';
import { SocialService } from 'app/providers/social/social.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { AcceptFollowCommand } from 'app/models/social/commands/acceptFollowCommand';
import { LoginUser } from 'app/models/user/login/loginUser';


@Component({
  selector: 'followRequestNotif-cmp',
  templateUrl: './followRequestNotif.component.html',
  styleUrls: ['./followRequestNotif.component.css'],
})
export class FollowRequestNotifComponent implements OnInit{

  @Input() public notification:AppNotification;
  public message:string;
  private user:LoginUser;
  @Output() notificationRemovedEvent = new EventEmitter<AppNotification>();
  public acceptFollowCommand:AcceptFollowCommand = new AcceptFollowCommand();

  constructor(private userService: UserService, 
    private socialService: SocialService, 
    private notificationsService: NotificationsService){
      socialService.setToken(userService.getToken());
      this.user = this.userService.getLoggedUserSessionInfo().user;
  }

  ngOnInit(){
    this.message = "<strong>@"+this.notification.senderUserName+" - "+this.notification.senderName+"</strong>"+
                    " ha solicitado seguirte";
  }

  accept(notification:AppNotification){
    this.acceptFollowCommand.username = this.user.username;
    this.acceptFollowCommand.senderUsername = notification.senderUserName;

    this.socialService.executeCommand(this.acceptFollowCommand).subscribe( 
      (messaje) => {
          this.notificationRemovedEvent.emit(notification);
          this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
      }, (error: any) => {
          this.notificationsService.showNotification("Ha ocurrido un error al intentar aceptar que te siga", this.notificationsService.DANGER);
      }
  );
  }

}
