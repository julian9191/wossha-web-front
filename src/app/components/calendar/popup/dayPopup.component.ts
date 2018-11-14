import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { CalendarService } from 'app/providers/clothing/calendar.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { Clothe } from 'app/models/clothing/clothe';
import { AddCalendarComponent } from './addcalendar/addCalendar.component';
import { AddDayDescriptionCommand } from 'app/models/calendar/commands/addDayDescriptionCommand';
import { LoginUser } from 'app/models/user/login/loginUser';
import { RemoveClotheFromDayCommand } from 'app/models/calendar/commands/removeClotheFromDayCommand';

declare var $:any;

export interface ConfirmModel {
  title:string;
  message:string;
  date:Date;
}
@Component({  
    selector: 'confirm',
    templateUrl: './dayPopup.component.html',
    styleUrls: [ './dayPopup.component.css' ]
})
export class DayPopup extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;
  date: Date;
  public winHeight: number;
  public winWidth: number;
  @ViewChild(AddCalendarComponent) child:AddCalendarComponent;
  public showDescriptionEdit:boolean;
  public addDayDescriptionCommand: AddDayDescriptionCommand;
  removeClotheFromDayCommand:RemoveClotheFromDayCommand;
  private user:LoginUser;

  public clothes: Clothe[] = [];

  constructor(dialogService: DialogService,
              private calendarService: CalendarService,
              private notificationsService: NotificationsService,
              private userService: UserService) {
    super(dialogService);
    this.winHeight = (window.innerHeight);
    this.winWidth = (window.innerWidth);
  }

  ngOnInit(){
    this.user = this.userService.getLoggedUserSessionInfo().user;
    this.addDayDescriptionCommand = new AddDayDescriptionCommand();
    this.addDayDescriptionCommand.username = this.user.username;
    this.addDayDescriptionCommand.day = this.date;
    this.showDescriptionEdit = true;
    this.removeClotheFromDayCommand = new RemoveClotheFromDayCommand();
    this.removeClotheFromDayCommand.username = this.user.username;
    this.removeClotheFromDayCommand.day = this.date;
    this.getDayDescription();
    this.getDayClothing();
  }

  openAddCalendarTab(){
    this.child.isInitSlideImages = true;
    this.child.initSlideImages();
  }

  getDayDescription(){
    this.calendarService.getDayDescription(this.date).subscribe(
      (data:any) => {
        this.addDayDescriptionCommand.description = data.description;
        if(this.addDayDescriptionCommand.description){
          this.showDescriptionEdit = false;
        }
      }, (error: any) => {
        this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las prendas", this.notificationsService.DANGER);
      }
    );
  }

  getDayClothing(){
    this.calendarService.getDayClothing(this.date).subscribe(
        (data:any) => {
            this.clothes = data;
            let images:string[] = this.clothes.map((x) => {return x.picture});
            this.initSlideImages(images);
          }, (error: any) => {
            this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las prendas", this.notificationsService.DANGER);
        }
    );
  }

  saveDescription(){
    this.calendarService.executeCommand(this.addDayDescriptionCommand).subscribe( 
        (messaje) => {
            this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
            this.showDescriptionEdit=false;
          }, (error: any) => {
            this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
        }
    );
  }

  removeClothe(uuid:string){
    let nthis = this;
    this.notificationsService.showConfirmationAlert("¿Esta seguro?", "¿ Esta seguro de remover la prenda de esta fecha ?", this.notificationsService.WARNING).then(function (response) {
      if(response){
        nthis.removeClotheFromDayCommand.uuidClothe = uuid;
        nthis.calendarService.executeCommand(nthis.removeClotheFromDayCommand).subscribe( 
            (messaje) => {
              nthis.notificationsService.showNotification(messaje["msj"], nthis.notificationsService.SUCCESS);
              nthis.removeLocalClothe(uuid);
            }, (error: any) => {
              nthis.notificationsService.showNotification(error.error.msj, nthis.notificationsService.DANGER);
            }
        );
      }
    });    
  }

  removeLocalClothe(uuid:string){
    this.clothes = this.clothes.filter(c => c.uuid!=uuid);
  }

  getImage(uuid:string):string{
    if(uuid){
      return "http://localhost:8083/pictures/static-picture/"+uuid;
    }else{
      return "../assets/img/blog-1.jpg";
    }
  }

  initSlideImages(images: any) {
      this.result = images;
      this.ngOnDestroy();
  }

  openSlideshow(index:any){
    this.result = index;
    this.ngOnDestroy();
  }

  confirm() {
    this.close();
  }

  closeDialog(){
    this.result = null;
    this.close();
  }
  
}