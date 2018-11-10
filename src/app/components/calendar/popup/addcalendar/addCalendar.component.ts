import { Component, OnInit, forwardRef, ViewChild } from '@angular/core';
import { ClothingService } from 'app/providers/clothing/clothing.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { SearchCriteriaResult } from 'app/models/clothing/searchCriteria/searchCriteriaResult';
import { Clothe } from 'app/models/clothing/clothe';
import { PhotoSwipeComponent } from 'app/components/components/photo-swipe/photo-swipe.component';
import { PhotoSwipeImage } from 'app/models/global/photoSwipeImage';
import { CalendarService } from 'app/providers/clothing/calendar.service';
import { HttpParams } from '@angular/common/http';
import { PictureFile } from 'app/models/global/pictureFile';

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
    @ViewChild('photoSwipe') 
    public photoSwipe: PhotoSwipeComponent;
    public slideImages: PhotoSwipeImage[];

    constructor(private clothingService: ClothingService,
        private calendarService: CalendarService,
        private notificationsService: NotificationsService,
        private userService: UserService ) {

        clothingService.setToken(userService.getToken());
        calendarService.setToken(userService.getToken());
        this.winHeight = (window.innerHeight);
        this.winWidth = (window.innerWidth);
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

    ngOnInit(){}


    getImage(uuid:string):string{
        if(uuid){
            return "http://localhost:8083/pictures/static-picture/"+uuid;
        }else{
            return "../assets/img/blog-1.jpg";
        }
    }

    initSlideImages(){  
        /*this.slideImages = [];
        for (let clothe of this.clothes) {
        let item:PhotoSwipeImage = {
            src: this.getImage(clothe.picture),
            w: 800,
            h: 600
        }
        this.slideImages.push(item);
        }*/
    }

    openSlideshow(index:number){
        //this.photoSwipe.openGallery(this.slideImages, index);
    }


    createClothe(){
        return {
        id: null,
        uuid:'',
        username:'',
        name:'',
        description:'',
        type:'',
        category:'',
        purchaseDate:null,
        howLike:5,
        brand:'',
        state:null,
        colorCode:{"baseColorId": "", "realColorHexa": ""},
        baseColor:null,
        picture: new PictureFile(),
        pictureValue: null
        }
    }

}