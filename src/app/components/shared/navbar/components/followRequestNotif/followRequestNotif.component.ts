import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppNotification } from 'app/models/social/appNotification';
import { UserService } from 'app/providers/user/user.service';
import { SocialService } from 'app/providers/social/social.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { AcceptFollowCommand } from 'app/models/social/commands/acceptFollowCommand';
import { LoginUser } from 'app/models/user/login/loginUser';
import { RefuseFollowCommand } from 'app/models/social/commands/refuseFollowCommand';


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
  public refuseFollowCommand:RefuseFollowCommand = new RefuseFollowCommand();

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

  refuse(notification:AppNotification){
    this.refuseFollowCommand.username = this.user.username;
    this.refuseFollowCommand.senderUsername = notification.senderUserName;

    let nthis = this;
    this.notificationsService.showConfirmationAlert("??Est?? seguro?", "??Est??s seguro de rechazar esta solicitud?", this.notificationsService.WARNING).then(function (response) {
        if(response){
          nthis.socialService.executeCommand(nthis.refuseFollowCommand).subscribe(
            (messaje) => {
              nthis.notificationRemovedEvent.emit(notification);
              nthis.notificationsService.showNotification(messaje["msj"], nthis.notificationsService.SUCCESS);
            }, (error: any) => {
              nthis.notificationsService.showNotification("Ha ocurrido un error al intentar rechazar la solicitud", nthis.notificationsService.DANGER);
            }
          );
        }
    });    
  }

}
