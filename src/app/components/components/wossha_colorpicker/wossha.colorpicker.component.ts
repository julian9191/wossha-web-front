import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
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
    
    @Input() selectedColor:any;
    color:any = {hexString:""};
    baseColors:BaseColor[];
    colores:any[];

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
        if(this.isValueValid()){
            this.parseError = false;
        }else{
            this.parseError = true;
        }
        return (this.parseError===undefined || this.parseError) ? {
            error: {
                valid: false,
            },
        } : null;
    }

    validateError(){
        if(this.isValueValid()){
            this.parseError = false;
        }else{
            this.reset();
            this.parseError = true;
        }
        // update the form
        this.propagateChange(this.selectedColor);
    }

    isValueValid():boolean{
        if(this.selectedColor.baseColorId != "" && this.selectedColor.baseColorId !== undefined && this.selectedColor.baseColorId != null &&
        this.selectedColor.realColorHexa != "" && this.selectedColor.realColorHexa !== undefined && this.selectedColor.realColorHexa != null){
            return true;
        }return false;
    }

    // not used, used for touch input
    public registerOnTouched() { }

    // the method set in registerOnChange to emit changes back to the form
    private propagateChange = (_: any) => { };
    

    ngOnInit(){
        this.reset();
        this.clothingService.getColorsMap().subscribe( 
            (data:any) => {
                this.colores = data;
            }, (error: any) => {}
        );

        this.clothingService.getAllBaseColors().subscribe( 
            (data:any) => {
                this.baseColors = data;
            }, (error: any) => {}
        );
    }

    colorChanged($event){
        this.getApproximateColor();
        this.validateError();
    }
    
    getApproximateColor(){
        if(!this.color){
            return "";
        }
        let hexString = (' ' + this.color.hexString).slice(1);

        if(!hexString){
            return "";
        }
        const n_match = ntc.name(hexString);
        var n_rgb = n_match[0]; // RGB value of closest match
        var n_name = n_match[1]; // Text string: Color name
        var n_exactmatch = n_match[2]; // True if exact color match
        return this.selectedColor = {"baseColorId": this.colores[n_rgb], "realColorHexa": hexString};
    }

    reset(){
        this.selectedColor = {"baseColorId": "", "realColorHexa": ""}
    }
    
}