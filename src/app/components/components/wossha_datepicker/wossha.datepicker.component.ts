import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Component({
    selector: 'datepicker-cmp',
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
    @Input() date: string;
    private dateAux: string;
    public datePickerPlaceHolder:string ;
    public datepickerColor:string;
    @Input() minDate:string;
    @Input() maxDate:string;
    @Input() placeholder:string;
    public dateSelected:boolean;


    ngOnInit(){
        this.dateAux=this.date;
        this.resetDatepicker();
        this.datepickerColor=!this.date?"#aaa":"#565656";
    }

    // this is the initial value set to the component
    public writeValue(obj: any) {
        if (obj) {
            this.data = obj;
        }
    }

    resetDatepicker(){
        this.date = this.dateSelected?"":this.dateAux;
        this.datePickerPlaceHolder = this.placeholder;
        this.datepickerColor = "#aaa";
        this.dateSelected = false;
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

    // change events from the datepicker
    private onChange(event) {
        // get value from datepicker
        let newValue = event.target.value;

        if(newValue != ""){
            this.parseError = false;
        }else{
            this.parseError = true;
        }

        if(!newValue){
            this.resetDatepicker();
        }else if (!this.dateSelected) {
            this.datePickerPlaceHolder="";
            this.datepickerColor="#565656";
            this.dateSelected=true;
        }

        // update the form
        this.propagateChange(newValue);
    }

    // the method set in registerOnChange to emit changes back to the form
    private propagateChange = (_: any) => { };
}