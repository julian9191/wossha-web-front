import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { CalendarService } from 'app/providers/clothing/calendar.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { Clothe } from 'app/models/clothing/clothe';
import { AddCalendarComponent } from './addcalendar/addCalendar.component';

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
    this.getDayClothing();
  }

  openAddCalendarTab(){
    this.child.isInitSlideImages = true;
    this.child.initSlideImages();
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