import { Component, OnInit, ViewChild } from '@angular/core';
import {ClothingService} from "../../../providers/clothing/clothing.service";
import {UserService} from "../../../providers/user/user.service";;
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { PictureFile } from 'app/models/global/pictureFile';
import {Location} from '@angular/common';
import { ClotheView } from 'app/models/clothing/clotheView';
import { ChartType } from 'app/components/lbd/lbd-chart/lbd-chart.component';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { PICTURES_PATH } from "../../../globals";

declare var $:any;

@Component({
  selector: 'app-vieweClothe',
  templateUrl: './vieweClothe.component.html',
  styleUrls: [ './vieweClothe.component.css' ],
})

export class VieweClotheComponent implements OnInit{
  
    public clotheView:ClotheView;
    public viewsChartType: ChartType;
    public viewsChartData: any;
    public viewsChartOptions: any;
    public viewsChartResponsive: any[];
    public initChar:boolean = false;
    public slideImages: any[];
    myConfig = {
        masonry: true
    };

    constructor(private clothingService: ClothingService,
                private userService: UserService,
                private notificationsService: NotificationsService,
                private route: ActivatedRoute,
                private _location: Location,
                public lightbox: CrystalLightbox){
        clothingService.setToken(userService.getToken());
        this.clotheView = new ClotheView();
    }

    ngOnInit() {
        this.viewsChartType = ChartType.Bar;
        this.refreshClothe();
        this.getClothe(); 
    }

    getClothe(){
        let uuid:string = this.route.snapshot.paramMap.get("uuid");
        this.clothingService.getClotheViewByUuid(uuid).subscribe( 
            (data:any) => {
                this.clotheView = data;
                this.initSlideImages();
                this.initCharCpt(this.clotheView.useTimesByMonth);
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener la información de la prenda", this.notificationsService.DANGER);
            }
        );
    }

    initCharCpt(useTimesByMonth){

        let series:number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for(let i=0; i< useTimesByMonth.length; i++){
            series[parseInt(useTimesByMonth[i].key)-1] = useTimesByMonth[i].value;
        }

        this.viewsChartData = {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            series: [series]
        };

        this.viewsChartOptions = {
            seriesBarDistance: 10,
            classNames: {
                bar: 'ct-bar ct-orange'
            },
            axisX: {
                showGrid: false
            }
        };
        this.viewsChartResponsive = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        this.initChar = true;
    }

    initSlideImages(){
        this.slideImages = [
            {
                preview: this.getImage(this.clotheView.clothe.picture),
                full: this.getImage(this.clotheView.clothe.picture),
                width: 800,
                height: 600,
                description: ""
            }
        ];
    }

    getImage(uuid:string):string{
        if(uuid){
          return PICTURES_PATH+uuid;
        }
        else{
          return "../assets/img/blog-1.jpg";
        }
    }

    goBack(){
        this._location.back();
    }

    refreshClothe(){
        this.clotheView.clothe = {
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

