import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { ChartType, LegendItem } from '../../lbd/lbd-chart/lbd-chart.component';
import { StatisticsService } from 'app/providers/clothing/statistics.service';
import { ClothigTop } from 'app/models/clothing/clothigTop';
import {Location} from '@angular/common';
import { CrystalLightbox } from 'ngx-crystal-gallery';

declare var swal: any;
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'statistics-cmp',
	templateUrl: 'statistics.component.html',
	styleUrls: [ 'statistics.component.css' ]
})

export class StatisticsComponent implements OnInit{

	public pieChartType: ChartType;
	public totalClothing:number = 0;
	public mostUsedClothing:ClothigTop[];
	public slideImages: any[];
	myConfig = {
		masonry: true
	};

	//Types
    public typesChartData: any;
	public typesChartLegendItems:LegendItem[];
	public initTypesPie:boolean = false;

	//Categories
    public categoriesChartData: any;
	public categoriesChartLegendItems:LegendItem[];
	public initCategoriesPie:boolean = false;

	//How Like
    public howLikeChartData: any;
	public howLikeChartLegendItems:LegendItem[];
	public isInitHowLikePie:boolean = false;

	//Brands
    public brandsChartData: any;
	public brandsChartLegendItems:LegendItem[];
	public initBrandsPie:boolean = false;

	//Brands
    public colorsChartData: any;
	public colorsChartLegendItems:LegendItem[];
	public initColorsPie:boolean = false;


	constructor(private statisticsService: StatisticsService,
				private notificationsService: NotificationsService,
				private userService: UserService,
				private _location: Location,
				public lightbox: CrystalLightbox){
		statisticsService.setToken(userService.getToken());
	}

    ngOnInit(){
		this.pieChartType = ChartType.Pie;
		this.typesChartLegendItems = [];
		this.categoriesChartLegendItems = [];
		this.howLikeChartLegendItems = [];
		this.brandsChartLegendItems = [];
		this.colorsChartLegendItems = [];
		this.getGeneralStatistics();
	}

	goBack(){
        this._location.back();
    }

	getGeneralStatistics(){
		this.statisticsService.getGeneralStatistics().subscribe(
			(data:any) => {
				this.totalClothing = data.total;
				this.mostUsedClothing = data.mostUsedClothing;
				this.initTypePie(data.types);
				this.initCategoryPie(data.categories);
				this.initHowLikePie(data.howLike);
				this.initBrandPie(data.brands);
				this.initColorPie(data.colors);

				this.initSlideImages();
			}, (error: any) => {
				this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las estadísticas generales", this.notificationsService.DANGER);
			}
		);
	}

	initTypePie(types){
		let labels:string[] = [];
		let series:number[] = [];
		for(let i=0; i<types.length; i++) {
			labels.push("("+types[i].total+") "+types[i].value+"%");
			series.push(types[i].value);
			this.typesChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
		}
        this.typesChartData = {
          labels: labels,
          series: series
        };
		this.initTypesPie=true;
	}

	initCategoryPie(types){
		let labels:string[] = [];
		let series:number[] = [];
		for(let i=0; i<types.length; i++) {
			labels.push("("+types[i].total+") "+types[i].value+"%");
			series.push(types[i].value);
			this.categoriesChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
		}
        this.categoriesChartData = {
          labels: labels,
          series: series
        };
		this.initCategoriesPie=true;
	}

	initHowLikePie(types){
		let labels:string[] = [];
		let series:number[] = [];
		for(let i=0; i<types.length; i++) {
			labels.push("("+types[i].total+") "+types[i].value+"%");
			series.push(types[i].value);
			this.howLikeChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
		}
        this.howLikeChartData = {
          labels: labels,
          series: series
        };
		this.isInitHowLikePie=true;
	}

	initBrandPie(types){
		let labels:string[] = [];
		let series:number[] = [];
		for(let i=0; i<types.length; i++) {
			labels.push("("+types[i].total+") "+types[i].value+"%");
			series.push(types[i].value);
			this.brandsChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
		}
        this.brandsChartData = {
          labels: labels,
          series: series
        };
		this.initBrandsPie=true;
	}

	initColorPie(types){
		let labels:string[] = [];
		let series:number[] = [];
		for(let i=0; i<types.length; i++) {
			labels.push("("+types[i].total+") "+types[i].value+"%");
			series.push(types[i].value);
			this.colorsChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
		}
        this.colorsChartData = {
          labels: labels,
          series: series
        };
		this.initColorsPie=true;
	}

	getImage(uuid:string):string{
		if(uuid){
		  return "http://localhost:8083/pictures/static-picture/"+uuid;
		}else{
		  return "../assets/img/blog-1.jpg";
		}
	}

	initSlideImages(){  
		this.slideImages = [];
		for (let clothe of this.mostUsedClothing) {
		  let item:any = {
			  preview: this.getImage(clothe.picture),
			  full: this.getImage(clothe.picture),
			  width: 800,
			  height: 600,
			  description: ""
		  }
		  this.slideImages.push(item);
		}
	  }
	
}
