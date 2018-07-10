/*import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
    moduleId:module.id,
    selector: 'datepicker-cmp',
    templateUrl: './wossha.datepicker.component.html'
})

export class WosshaDatepickerComponent implements OnInit{
    public date: string;
    public datePickerPlaceHolder:string ;
    public datepickerColor:string;
    public minDate:string;
    public maxDate:string;
    public dateSelected:boolean;


    ngOnInit(){
        this.date = "";
        this.datePickerPlaceHolder = "Fecha de nacimiento";
        this.datepickerColor = "#aaa";
        this.minDate = "1900-01-01";
        this.maxDate = "2003-01-01";
        this.dateSelected = false;
    }


    datepickerEmpty(){
        if (!this.dateSelected) {
            this.datePickerPlaceHolder="";
            this.datepickerColor="#565656";
            this.dateSelected=true;
        }else{
            this.datePickerPlaceHolder="Fecha de nacimiento";
            this.datepickerColor="#aaa";
            this.dateSelected=false;
            this.date = null;
        }
    }
}
*/

import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Component({
    selector: 'datepicker-cmp',
    /*template:
        `
        <input type="date"
          [value]="date" 
          (change)="onChange($event)"/>
        `,*/
    templateUrl: './wossha.datepicker.component.html',
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WosshaDatepickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WosshaDatepickerComponent),
      multi: true,
    }]        
})
export class WosshaDatepickerComponent implements ControlValueAccessor, Validator {
    private parseError: boolean;
    private data: any;
    public date: string;
    public datePickerPlaceHolder:string ;
    public datepickerColor:string;
    public minDate:string;
    public maxDate:string;
    public dateSelected:boolean;


    ngOnInit(){
        this.date = "";
        this.datePickerPlaceHolder = "Fecha de nacimiento";
        this.datepickerColor = "#aaa";
        this.minDate = "1900-01-01";
        this.maxDate = "2003-01-01";
        this.dateSelected = false;
    }

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

    public mama(){
        return "orale!!";
    }

    // not used, used for touch input
    public registerOnTouched() { }

    // change events from the textarea
    private onChange(event) {
        // get value from text area
        let newValue = event.target.value;

        if(newValue != ""){
            this.parseError = false;
        }else{
            this.parseError = true;
        }

        if (!this.dateSelected) {
            this.datePickerPlaceHolder="";
            this.datepickerColor="#565656";
            this.dateSelected=true;
        }else{
            this.datePickerPlaceHolder="Fecha de nacimiento";
            this.datepickerColor="#aaa";
            this.dateSelected=false;
            this.date = null;
        }

        // update the form
        this.propagateChange(newValue);
    }

    // the method set in registerOnChange to emit changes back to the form
    private propagateChange = (_: any) => { };




}