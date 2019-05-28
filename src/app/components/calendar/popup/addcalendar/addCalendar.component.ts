import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ClothingService } from 'app/providers/clothing/clothing.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { SearchCriteriaResult } from 'app/models/clothing/searchCriteria/searchCriteriaResult';
import { Clothe } from 'app/models/clothing/clothe';
import { CalendarService } from 'app/providers/clothing/calendar.service';
import { HttpParams } from '@angular/common/http';
import { AddToCalendarCommand } from 'app/models/calendar/commands/addToCalendarCommand';
import { LoginUser } from 'app/models/user/login/loginUser';
import { PICTURES_PATH } from "../../../../globals";

declare var $:any;

@Component({
    selector: 'addcalendar-cmp',
    templateUrl: './addCalendar.component.html',
    styleUrls: [ './addCalendar.component.css' ]     
})
export class AddCalendarComponent implements OnInit {
    
    public clothes: Clothe[] = [];
    public winHeight: number;
    public winWidth: number;
    public searchCriteriaResult:SearchCriteriaResult = new SearchCriteriaResult();
    public totalItems = 0;
    public currentPage = 1;
    public itemsPerPage = 5;
    public addToCalendarCommand: AddToCalendarCommand;
    private user:LoginUser;
    public isInitSlideImages:boolean = false;
     
    @Output() initSlideImagesEvent = new EventEmitter<string[]>();
    @Output() openSlideshowEvent = new EventEmitter<number>();
    @Output() clotheAddedEvent = new EventEmitter<boolean>();
    @Input() date: Date;

    constructor(private clothingService: ClothingService,
        private calendarService: CalendarService,
        private notificationsService: NotificationsService,
        private userService: UserService ) {

        clothingService.setToken(userService.getToken());
        calendarService.setToken(userService.getToken());
        this.winHeight = (window.innerHeight);
        this.winWidth = (window.innerWidth);
    }

    ngOnInit(){
        this.user = this.userService.getLoggedUserSessionInfo().user;
        this.addToCalendarCommand = new AddToCalendarCommand();
        this.addToCalendarCommand.username = this.user.username;
        this.addToCalendarCommand.day = this.date;
        this.getClothing(false);
    }

    getClothing(append:boolean){
        let params = new HttpParams();
        params = params.append("init", (this.itemsPerPage * (this.currentPage - 1))+"");
        params = params.append("limit", this.itemsPerPage+"");
        this.calendarService.searchClothingCalendar(this.searchCriteriaResult, params).subscribe(
            (data:any) => {
                if(append){
                    this.clothes = this.clothes.concat(data.result);
                }else{
                    this.clothes = data.result;
                }
                this.totalItems = data.pagination.size;
                this.currentPage++;
                this.initSlideImages();
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las prendas", this.notificationsService.DANGER);
            }
        );
    }

    getImage(uuid:string):string{
        if(uuid){
            return PICTURES_PATH+"pictures/static-picture/"+uuid;
        }else{
            return "../assets/img/blog-1.jpg";
        }
    }

    initSlideImages(){ 
        if(this.isInitSlideImages){
            let images:string[] = this.clothes.map((x) => {return x.picture});
            this.initSlideImagesEvent.emit(images);
        } 
        
    }

    openSlideshow(index:number){
        this.openSlideshowEvent.emit(index);
    }

    addToCalendar(id, uuid){
        this.addToCalendarCommand.idClothe = id;
        this.addToCalendarCommand.uuidClothe = uuid;

        this.calendarService.executeCommand(this.addToCalendarCommand).subscribe( 
            (messaje) => {
                this.notificationsService.showNotification(messaje["msj"], this.notificationsService.SUCCESS);
                this.clotheAddedEvent.emit(true);
            }, (error: any) => {
                this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
            }
        );
    }

}