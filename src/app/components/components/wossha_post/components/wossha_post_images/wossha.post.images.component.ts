import { Component, OnInit, Input} from '@angular/core';
import { Attachment } from 'app/models/social/posts/attachments';
import { CrystalLightbox } from 'ngx-crystal-gallery';
declare var $:any;

@Component({
    selector: 'wossha-post-images',
    templateUrl: './wossha.post.images.component.html',
    styleUrls: [ './wossha.post.images.component.css' ]
})
export class WosshaPostImagesComponent implements OnInit {
    
    @Input() images:Attachment[];
    @Input() isComment:boolean;
    public slideImages: any[] = [];
    baseUrl:string = "http://localhost:8083/pictures/static-picture/";
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

}