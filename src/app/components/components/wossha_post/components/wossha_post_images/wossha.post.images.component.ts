import { Component, OnInit, Input} from '@angular/core';
import { Attachment } from 'app/models/social/posts/attachments';
declare var $:any;

@Component({
    selector: 'wossha-post-images',
    templateUrl: './wossha.post.images.component.html',
    styleUrls: [ './wossha.post.images.component.css' ]
})
export class WosshaPostImagesComponent implements OnInit {
    
    @Input() images:Attachment[];

    constructor(){}

    ngOnInit(){
        
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