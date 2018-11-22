import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { ChartType, LegendItem } from '../lbd/lbd-chart/lbd-chart.component';
import { StatisticsService } from 'app/providers/clothing/statistics.service';

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
    public colorsChartData: any;
	public colorsChartLegendItems:LegendItem[];
	public initComponent:boolean = false;


	constructor(private statisticsService: StatisticsService,
				private notificationsService: NotificationsService,
				private userService: UserService){
		statisticsService.setToken(userService.getToken());
	}

    ngOnInit(){
		this.pieChartType = ChartType.Pie;
		this.colorsChartLegendItems = [];
		this.getGeneralStatistics();
		//this.initTypePie(null);
	}


	getGeneralStatistics(){
		this.statisticsService.getGeneralStatistics().subscribe(
			(data:any) => {
				
				this.initTypePie(data.types);

			}, (error: any) => {
				this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las estadísticas generales", this.notificationsService.DANGER);
			}
		);
	}

	initTypePie(types){
		let labels:string[] = [];
		let series:number[] = [];
		for(let i=0; i<types.length; i++) {
			labels.push(types[i].value+"%");
			series.push(types[i].value);
			this.colorsChartLegendItems.push({ title: types[i].key, imageClass: 'fa fa-circle' });
		}
        this.colorsChartData = {
          labels: labels,
          series: series
        };
		this.initComponent=true;
	}

	
}
