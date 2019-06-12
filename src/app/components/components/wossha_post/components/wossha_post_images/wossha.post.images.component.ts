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
    myConfig = {
        masonry: true
    };

    constructor(public lightbox: CrystalLightbox){}

    ngOnInit(){
        this.initSlideImages();
    }

    initSlideImages(){

        let images:string[] = this.images.map((x) => {return x.url});
        for (const image of images) {
            let item = {
                preview: PICTURES_PATH+image,
                full: PICTURES_PATH+image,
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
            event.target.src = "../assets/img/Spinner-Loading.gif";
            setTimeout(function () {
                event.target.src = originalSrc;
            }, 2000);
        } else {
            event.target.src = "../assets/img/Spinner-Loading.gif";
        }
    }

}