import { Component, OnInit, Input} from '@angular/core';
import { Attachment } from 'app/models/social/posts/attachments';
import { CrystalLightbox } from 'ngx-crystal-gallery';
import { PICTURES_PATH } from "../../../../../globals";
import { PictureFile } from 'app/models/global/pictureFile';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs';
declare var $:any;

@Component({
    selector: 'wossha-post-images',
    templateUrl: './wossha.post.images.component.html',
    styleUrls: [ './wossha.post.images.component.css' ]
})
export class WosshaPostImagesComponent implements OnInit {
    
    @Input() images:Attachment[];
    @Input() localImages:PictureFile[];
    @Input() isComment:boolean;
    public slideImages: any[] = [];
    baseUrl:string = PICTURES_PATH+"pictures/static-picture/";
    myConfig = {
        masonry: true
    };

    constructor(public lightbox: CrystalLightbox, private http: Http){}

    ngOnInit(){
        this.beforeInitSlideImages();
    }

    beforeInitSlideImages(){
        console.log("1111");
        if(this.images.length > 0){
            console.log("2222");
            this.http.get(this.baseUrl+this.images[0]).map(
                res => {
                    console.log("3333");
                    this.initSlideImages();
                }
            )
            .catch((error:any) => {
                console.log("4444");
                let _that = this;
                setTimeout(function(){
                    _that.beforeInitSlideImages()
                },500);
                return Observable.throw(error);
            })
        }
    }

    initSlideImages(){
        console.log("aaaa");
        let images:string[] = this.images.map((x) => {return x.url});
        for (const image of images) {
            let item = {
                preview: this.baseUrl+image,
                full: this.baseUrl+image,
                width: 1000,
                height: 333,
                description: ""
            }
            this.slideImages.push(item);
        }
    }

    imgIsTaller(imgItem){
        let width = imgItem.offsetWidth;
        let height = imgItem.offsetHeight;
        if(width>height){
            return false;
        }
        return true;
    }

    waitAndReload(event){
        const originalSrc = event.target.src;

        if (parseInt(event.target.getAttribute('data-retry'), 10) !== parseInt(event.target.getAttribute('data-max-retry'), 10)) {

            event.target.setAttribute('data-retry', parseInt(event.target.getAttribute('data-retry'), 10) + 1);

            event.target.src = "../assets/img/blog-1.jpg";

            setTimeout(function () {
                event.target.src = originalSrc;
            }, 2000);
        } else {
            event.target.src = "../assets/img/blog-1.jpg";
        }
    }

}