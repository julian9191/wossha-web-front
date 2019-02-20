import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl} from '@angular/forms';
declare var $:any;

@Component({
    selector: 'wossha-post',
    templateUrl: './wossha.post.component.html',
    styleUrls: [ './wossha.post.component.css' ]
})
export class WosshaPostComponent implements OnInit {
    
    profilePicture:string = "e25c851d-33d7-11e9-9937-19d8f057a289";
    inFocus:boolean = false;
    
    constructor(){}

    ngOnInit(){
        
    }

}