import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { CalendarService } from 'app/providers/clothing/calendar.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { Clothe } from 'app/models/clothing/clothe';
import { AddDayDescriptionCommand } from 'app/models/calendar/commands/addDayDescriptionCommand';
import { LoginUser } from 'app/models/user/login/loginUser';
import { RemoveClotheFromDayCommand } from 'app/models/calendar/commands/removeClotheFromDayCommand';
import { AddToCalendarCommand } from 'app/models/calendar/commands/addToCalendarCommand';

declare var $:any;

export interface ConfirmModel {
  title:string;
  message:string;
  uuid:string;
  idClothe: number;
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
  uuid: string;
  idClothe: number;
  public winHeight: number;
  public winWidth: number;
  private user:LoginUser;
  public addToCalendarCommand: AddToCalendarCommand;

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
    this.addToCalendarCommand = new AddToCalendarCommand();
    this.addToCalendarCommand.username = this.user.username;
    this.addToCalendarCommand.idClothe = this.idClothe;
    this.addToCalendarCommand.uuidClothe = this.uuid;
  }

  confirm() {
    if(this.date){
      this.addToCalendarCommand.day = this.date;

      this.calendarService.executeCommand(this.addToCalendarCommand).subscribe( 
          (messaje) => {
              this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
          }, (error: any) => {
              this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
          }
      );
    }

    this.close();
  }

  closeDialog(){
    this.result = null;
    this.close();
  }
  
}