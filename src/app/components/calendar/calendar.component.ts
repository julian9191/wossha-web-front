import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { DayPopup } from './popup/dayPopup.component';
import { PhotoSwipeComponent } from '../components/photo-swipe/photo-swipe.component';
import { PhotoSwipeImage } from 'app/models/global/photoSwipeImage';

declare var swal: any;
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'calendar-cmp',
	templateUrl: 'calendar.component.html',
	styleUrls: [ 'calendar.component.css' ]
})

export class CalendarComponent implements OnInit{

	public showMoreLink:boolean = false;
	@ViewChild('photoSwipe')
	public photoSwipe: PhotoSwipeComponent;
    public slideImages: PhotoSwipeImage[];

	constructor(private dialogService:DialogService){}

    ngOnInit(){
        var $calendar = $('#fullCalendar');

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

        $calendar.fullCalendar({
            viewRender: function(view, element) {
                // We make sure that we activate the perfect scrollbar when the view isn't on Month
                if (view.name != 'month'){
                    var $fc_scroller = $('.fc-scroller');
                    $fc_scroller.perfectScrollbar();
                }
            },
            header: {
				left: 'title',
				//center: 'month,agendaWeek,agendaDay',
				right: 'prev,next,today'
			},
			defaultDate: today,
			selectable: true,
			selectHelper: true,
            views: {
                month: { // name of view
                    titleFormat: 'MMMM YYYY'
                    // other view-specific options here
                },
                week: {
                    titleFormat: " MMMM D YYYY"
                },
                day: {
                    titleFormat: 'D MMM, YYYY'
                }
            },
			dayClick: function(date, jsEvent, view, resourceObj) {
				//alert('Date: ' + date.format());
				//alert('Resource ID: ' + resourceObj.id);
				$this.openDialog(date, jsEvent, view, resourceObj);
			},
			
			editable: true,
			eventLimit: this.showMoreLink, // allow "more" link when too many events


            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: [
				{
					title: 'Camiseta verde Americanino',
					start: new Date(y, m, 1),
					backgroundColor: "#7aee25",
					allDay: true,
					imageurl: this.getImage('75bcf6d1-d700-11e8-bdff-55e7a7a77f37'),
					description: "esto es una prendita"
				},
				{
					title: 'Camiseta verde Americanino',
					start: new Date(y, m, 1),
					className: 'event-orange',
					allDay: true,
					imageurl:this.getImage('75bcf6d1-d700-11e8-bdff-55e7a7a77f37'),
					description: "esto es una prendita"
				},
				{
					title: 'Camiseta verde Americanino',
					start: new Date(y, m, 1),
					className: 'event-orange',
					allDay: true,
					imageurl:this.getImage('75bcf6d1-d700-11e8-bdff-55e7a7a77f37'),
					description: "esto es una prendita"
				},
				{
					id: 999,
					start: new Date(y, m, 2),
					title  : 'event',
					className: 'event-orange',
					allDay: true,
        			imageurl:this.getImage('75bcf6d1-d700-11e8-bdff-55e7a7a77f37'),
					description: "esto es una prendita"
				},
				{
					id: 999,
					start: new Date(y, m, 2),
					title  : 'event',
					className: 'event-orange',
					allDay: true,
        			imageurl:this.getImage('75bcf6d1-d700-11e8-bdff-55e7a7a77f37'),
					description: "esto es una prendita"
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: new Date(y, m, d+3, 6, 0),
					allDay: true,
					className: 'event-rose'
				},
				{
					title: 'Meeting',
					start: new Date(y, m, d-1, 10, 30),
					allDay: true,
					className: 'event-green'
				},
				{
					title: 'Lunch',
					start: new Date(y, m, d+7, 12, 0),
					end: new Date(y, m, d+7, 14, 0),
					allDay: true,
					className: 'event-red'
				},
				{
					title: 'Md-pro Launch',
					start: new Date(y, m, d-2, 12, 0),
					allDay: true,
					className: 'event-azure'
				},
				{
					title: 'Birthday Party',
					start: new Date(y, m, d+1, 19, 0),
					end: new Date(y, m, d+1, 22, 30),
					allDay: true,
                    className: 'event-azure'
				},
				{
					title: 'Click for Wossha',
					start: new Date(y, m, 21),
					allDay: true,
					url: 'https://www.wossha.com/',
					className: 'event-orange'
				},
				{
					title: 'Click for Google',
					start: new Date(y, m, 21),
					allDay: true,
					url: 'https://www.wossha.com/',
					className: 'event-orange'
				}
			],
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

	
}
