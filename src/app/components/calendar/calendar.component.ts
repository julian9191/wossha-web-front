import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { DayPopup } from './popup/dayPopup.component';
import { PhotoSwipeComponent } from '../components/photo-swipe/photo-swipe.component';
import { PhotoSwipeImage } from 'app/models/global/photoSwipeImage';
import { CalendarService } from 'app/providers/clothing/calendar.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { CalendarClothe } from 'app/models/calendar/calendarClothe';

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
	public photoSwipe: PhotoSwipeComponent;
	public slideImages: PhotoSwipeImage[];
	public startViewDate:Date;
	public endViewDate:Date;
	public events:CalendarClothe[] = [];

	constructor(private dialogService:DialogService,
				private calendarService: CalendarService,
				private notificationsService: NotificationsService,
				private userService: UserService){
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

				$this.getEventsByView();
            },
            header: {
				left: 'title',
				right: 'prev,next,today'
			},
			defaultDate: today,
			selectable: true,
			selectHelper: true,
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
										<p style='font-size: 9pt'>${event.description}</p>
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
			title: date, 
			date: date,
			message: ""
		})
		.subscribe((result:any)=>{
			if(result !== undefined){
				if(result instanceof Array){
					this.initSlideImages(result);
				}else if(typeof result == 'number'){
					this.openSlideshow(result);
				}
			}
			
		});
	}

	initSlideImages(images:string[]){
        this.slideImages = [];
        for (let image of images) {
            let item:PhotoSwipeImage = {
                src: this.getImage(image),
                w: 800,
                h: 600
            }
            this.slideImages.push(item);
        }
    }

    openSlideshow(index:number){
        this.photoSwipe.openGallery(this.slideImages, index);
	}

	invertColor(hex) {
		if (hex.indexOf('#') === 0) {
			hex = hex.slice(1);
		}
		// convert 3-digit hex to 6-digits.
		if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		if (hex.length !== 6) {
			throw new Error('Invalid HEX color.');
		}
		// invert color components
		var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
			g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
			b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
		// pad each with zeros and return
		return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
	}

	padZero(str) {
		let len =  2;
		var zeros = new Array(len).join('0');
		return (zeros + str).slice(-len);
	}

	getTextColor(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if ((parseInt(result[1], 16)*0.299 + parseInt(result[2], 16)*0.587 + parseInt(result[3], 16)*0.114) > 186){
			return "#000000";
		}
		return "#ffffff";
	}
	
	getEventsByView(){
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
