import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { DayPopup } from './popup/dayPopup.component';
import { CalendarService } from 'app/providers/clothing/calendar.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { CalendarClothe } from 'app/models/calendar/calendarClothe';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import * as moment from 'moment';

declare var swal: any;
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'calendar-cmp',
	templateUrl: 'calendar.component.html',
	styleUrls: [ 'calendar.component.css' ]
})

export class CalendarComponent implements OnInit{

	public calendar:any;
	public showMoreLink:boolean = false;
	@ViewChild('photoSwipe')
	public startViewDate:Date;
	public endViewDate:Date;
	public events:CalendarClothe[] = [];
	public currentDate:string;
	public slideImages: any[];
	myConfig = {
		masonry: true
	};

	constructor(private dialogService:DialogService,
				private calendarService: CalendarService,
				private notificationsService: NotificationsService,
				private userService: UserService,
				public lightbox: CrystalLightbox){
		calendarService.setToken(userService.getToken());
	}

    ngOnInit(){
        this.calendar = $('#fullCalendar');

        var today = new Date();
        var y = today.getFullYear();
        var m = today.getMonth();
		var d = today.getDate();
		let $this = this;

		var popTemplate = [
			'<div class="popover" style="max-width:400px;" >',
				'<div class="popover-header">',
					'<h3 class="popover-title"></h3>',
				'</div>',
				'<div class="popover-content"></div><br>',
			'</div>'].join('');

		this.calendar.fullCalendar({
            viewRender: function(view, element) {
				$this.startViewDate = new Date(view.start.format("YYYY-MM-DD"));
				$this.endViewDate = new Date(view.end.format("YYYY-MM-DD"));
				let monthDate = new Date(view.intervalEnd.format("YYYY-MM-DD"));
				let currentDateAux:Date;
				if(monthDate.getMonth()==m){
					currentDateAux=new Date();
					currentDateAux.setDate(d);
				}else{
					currentDateAux= monthDate;
					currentDateAux.setDate(15);
				}
				$this.currentDate = moment(currentDateAux).format('YYYY-MM-DD');

				$this.getEventsByView();
            },
            header: {
				left: 'title',
				right: 'prev,next,today'
			},
			defaultDate: today,
			lang: 'es',
			selectable: true,
			selectHelper: true,
			eventStartEditable: false,
            views: {
                month: { // name of view
                    titleFormat: 'MMMM YYYY'
                }
            },
			dayClick: function(date, jsEvent, view, resourceObj) {
				$this.openDialog(date, jsEvent, view, resourceObj);
			},
			editable: true,
			eventLimit: this.showMoreLink, 
            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: this.events,
			eventRender: function(event, eventElement) {
				let pictureUrl = event.imageurl ? event.imageurl : "../assets/img/blog-1.jpg";
				eventElement.find("div.fc-content").prepend(`<img src='${pictureUrl}' width='20%'>`);
				eventElement.popover({
					title: event.title,
					content: function () {
						return `<div class='col-md-12' style='padding: 0 0 10px 0'>
									<div class='col-md-6'  style='padding: 0'>
										<img style='width:100%' src='${event.imageurl}' />
									</div>
									<div class='col-md-6'>
										<p style='font-size: 9pt'>${event.description?event.description:""}</p>
									</div>
								</div>`;
					},
					template: popTemplate,
					html: true,
					trigger: 'hover'/*'click'*/,
					placement: 'bottom',
					animation: 'true',
					container: 'body'
				});
			},
		});

	}

	getImage(uuid:string):string{
		if(uuid){
			return "http://localhost:8083/pictures/static-picture/"+uuid;
		}else{
			return "../assets/img/blog-1.jpg";
		}
	}

	openDialog(date, jsEvent, view, resourceObj){
		let disposable = this.dialogService.addDialog(DayPopup, {
			title: moment.utc(date).format("YYYY/MM/DD"), 
			date: date,
			message: ""
		})
		.subscribe((result:any)=>{
			if(result !== undefined){
				if(result instanceof Array){
					this.initSlideImages(result);
				}else if(typeof result == 'number'){
					this.lightbox.open(this.slideImages, {index: result})
				}else if(typeof result == 'boolean'){
					this.getEventsByView();
				}
			}
			
		});
	}

	initSlideImages(images:string[]){
        this.slideImages = [];
        for (let image of images) {
            let item:any = {
				preview: this.getImage(image),
				full: this.getImage(image),
                width: 800,
				height: 600,
				description: ""
            }
            this.slideImages.push(item);
		}
    }

	getTextColor(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if ((parseInt(result[1], 16)*0.299 + parseInt(result[2], 16)*0.587 + parseInt(result[3], 16)*0.114) > 150){
			return "#000000";
		}
		return "#ffffff";
	}

	dateChanged(){
		this.calendar.fullCalendar('gotoDate', this.currentDate);
	}
	
	getEventsByView(){
		this.calendar.fullCalendar( 'removeEvents', function(e){ return !e.isUserCreated});
		this.calendarService.getEventsByView(this.startViewDate.getTime(), this.endViewDate.getTime()).subscribe(
			(data:any) => {
				this.events = data
				for (var i = 0; i < this.events.length; i++) {
					this.events[i].imageurl = this.getImage(this.events[i].imageurl);
					this.events[i].textColor = this.getTextColor(this.events[i].backgroundColor);
					this.calendar.fullCalendar('renderEvent', this.events[i]);
				} 
			  }, (error: any) => {
				this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener las prendas", this.notificationsService.DANGER);
			}
		);
	}

	
}
