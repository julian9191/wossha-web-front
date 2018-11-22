import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { CalendarService } from 'app/providers/clothing/calendar.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { LoginUser } from 'app/models/user/login/loginUser';
import { AddToCalendarCommand } from 'app/models/calendar/commands/addToCalendarCommand';
import { AddOutfitToCalendarCommand } from 'app/models/calendar/commands/addOutfitToCalendarCommand';

declare var $:any;

export interface ConfirmModel {
  title:string;
  message:string;
  ids:any[];
}
@Component({  
    selector: 'confirm',
    templateUrl: './datePopup.component.html',
    styleUrls: [ './datePopup.component.css' ]
})
export class DatePopup extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;
  date: Date;
  ids:any[];
  public winHeight: number;
  public winWidth: number;
  private user:LoginUser;
  public addOutfitToCalendarCommand: AddOutfitToCalendarCommand;

  constructor(dialogService: DialogService,
              private calendarService: CalendarService,
              private notificationsService: NotificationsService,
              private userService: UserService) {
    super(dialogService);
    this.winHeight = (window.innerHeight);
    this.winWidth = (window.innerWidth);
    calendarService.setToken(userService.getToken());
  }

  ngOnInit(){
    this.user = this.userService.getLoggedUserSessionInfo().user;
    this.addOutfitToCalendarCommand = new AddOutfitToCalendarCommand();
    this.addOutfitToCalendarCommand.username = this.user.username;
    this.addOutfitToCalendarCommand.uuids = this.ids;
  }

  confirm() {
    if(this.date){
      this.addOutfitToCalendarCommand.day = this.date;

      this.calendarService.executeCommand(this.addOutfitToCalendarCommand).subscribe( 
          (messaje) => {
              this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
          }, (error: any) => {
              this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
          }
      );
      this.close();
    }else{
      this.notificationsService.showNotification("Debe seleccionar una fecha", this.notificationsService.DANGER);
    }
  }

  closeDialog(){
    this.result = null;
    this.close();
  }
  
}