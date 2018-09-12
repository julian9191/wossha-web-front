import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import {Colores} from './colores';
import ntc from 'ntcjs';
import { BaseColor } from '../../../models/clothing/baseColor';
import { ClothingService } from '../../../providers/clothing/clothing.service';

declare var $:any;

@Component({
    selector: 'colorpicker-cmp',
    templateUrl: './wossha.colorpicker.component.html',
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WosshaColorpickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WosshaColorpickerComponent),
      multi: true,
    }]            
})
export class WosshaColorpickerComponent implements ControlValueAccessor, Validator{
    private parseError: boolean;
    private data: any;
    
    selectedColorName:string = "";
    color:any = {hexString:""};
    baseColors:BaseColor[];

    constructor(private clothingService: ClothingService){}

    // this is the initial value set to the component
    public writeValue(obj: any) {
        if (obj) {
            this.data = obj;
        }
    }

    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // validates the form, returns null when valid else the validation object
    public validate(c: FormControl) {
        return (this.parseError===undefined || this.parseError) ? {
            error: {
                valid: false,
            },
        } : null;
    }

    // not used, used for touch input
    public registerOnTouched() { }

    // the method set in registerOnChange to emit changes back to the form
    private propagateChange = (_: any) => { };
    

    ngOnInit(){
        this.clothingService.getAllBaseColors().subscribe( 
            (data:any) => {
                this.baseColors = data;
            }, (error: any) => {}
        );
    }

    colorChanged($event){
        this.getApproximateColor();

        if(this.selectedColorName != ""){
            this.parseError = false;
        }else{
            this.parseError = true;
        }

        // update the form
        this.propagateChange(this.selectedColorName);
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