import { Component, OnInit, ElementRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PasswordValidation } from '../../forms/validationforms/password-validator.component';


declare var $:any;
declare interface User {
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string; //  must be valid email format
    password?: string; // required, value must be equal to confirm password.
    confirmPassword?: string; // required, value must be equal to password.
    birthday?: string;
}

@Component({
    moduleId:module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
    public register: User;
    public datePickerPlaceHolder:string ;
    public datepickerColor:string;
    public minDate:string;
    public maxDate:string;
    public dateSelected:boolean;

  
  constructor(private fb: FormBuilder) {}

    checkFullPageBackgroundImage(){
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if(image_src !== undefined){
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };
    

    ngOnInit(){
        this.register = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthday: ''
        }

        this.datePickerPlaceHolder = "Fecha de nacimiento";
        this.datepickerColor = "#aaa";
        this.minDate = "1900-01-01";
        this.maxDate = "2003-01-01";
        this.dateSelected = false;

        this.checkFullPageBackgroundImage();

        setTimeout(function(){
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);

        $('.datepicker').datetimepicker({
            format: 'MM/DD/YYYY',    //use this format if you want the 12hours timpiecker with AM/PM toggle
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
         });
    }

    save(model: User, isValid: boolean) {
        // call API to save customer
        console.log(model, isValid);
        console.log(this.register);
        if(isValid){
            console.log(model, isValid);
        }
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
            this.register.birthday = null;
        }
    }
}



/*import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template: `
      <h1>NgModel</h1>
      <form #form="ngForm">
        <json-input [(ngModel)]="result" name="result"></json-input>
      </form>
      
      <p>form is valid: {{ form.valid ? 'true' : 'false' }}</p>
      
      <p>Value:</p>
      <pre>{{ result | json }}</pre>
      
      <h1>Reactive Form</h1>
      
      <form [formGroup]="reactiveForm">
        <json-input formControlName="result"></json-input>
      </form>
      
      <p>form is valid: {{ reactiveForm.valid ? 'true' : 'false' }}</p>
      
      <p>Value:</p>
      <pre>{{ reactiveForm.value | json }}</pre>
    `
})
export class RegisterComponent {
  
  public result = {};
  public reactiveForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.result = {"hello":"world"};
    
    this.reactiveForm = this.fb.group({
      result: [{"test123":"test456"}]
    })
  }
}

*/
