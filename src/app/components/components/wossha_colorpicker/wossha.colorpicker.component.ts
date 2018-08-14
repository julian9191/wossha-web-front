import { Component, Input, forwardRef } from '@angular/core';
import {Colores} from './colores';
import ntc from 'ntcjs';

declare var $:any;

@Component({
    selector: 'colorpicker-cmp',
    templateUrl: './wossha.colorpicker.component.html',     
})
export class WosshaColorpickerComponent {
    selectedColorName:string = "";
    color:any = {hexString:""};

    ngOnInit(){
       
    }

    colorChanged($event){
        this.getApproximateColor();
    }
    
    getApproximateColor(){
        if(!this.color){
            return "";
        }
        const n_match = ntc.name(this.color.hexString);
        var n_rgb = n_match[0]; // RGB value of closest match
        var n_name = n_match[1]; // Text string: Color name
        var n_exactmatch = n_match[2]; // True if exact color match
    
        return this.selectedColorName = Colores[n_rgb]; // [ '#6495ED', 'Cornflower Blue', false ]
    }
    
}