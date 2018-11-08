import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { SearchCriteriaParams } from 'app/models/clothing/searchCriteriaParams';
import { ClothingService } from 'app/providers/clothing/clothing.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';

declare var $:any;

@Component({
    selector: 'searchcriteria-cmp',
    templateUrl: './wossha.searchcriteria.component.html'       
})
export class SearchCriteriaComponent implements OnInit {
    
    private parseError: boolean;
    private data: any;
    public searchCriteriaParams:SearchCriteriaParams = new SearchCriteriaParams();
    selectedItems = [];
    settings = {};
    howLike = 5;

    constructor(private clothingService: ClothingService,
                private notificationsService: NotificationsService,
                private userService: UserService){
        
    }

    ngOnInit(){
        this.getSearchCriteriaParams();
        this.selectedItems = [];
        this.settings = {
            text: "Tipos de prenda",
            selectAllText: 'Seleccionar todo',
            unSelectAllText: 'reestablecer',
            classes: "btn-warning btn-block"
        };  
    }

    getSearchCriteriaParams(){
        this.clothingService.getSearchCriteriaParams().subscribe(
          (data:any) => {
            this.searchCriteriaParams = data;
    
            console.log(this.searchCriteriaParams);
    
            //  Init Bootstrap Select Picker
            if($(".selectpicker").length != 0){
              $(".selectpicker").selectpicker({
                  iconBase: "fa",
                  tickIcon: "fa-check"
              });
            }
    
          }, (error: any) => {
            this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de prendas", this.notificationsService.DANGER);
          }
        );
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

        /*if(!newValue){
            this.resetDatepicker();
        }else if (!this.dateSelected) {
            this.datePickerPlaceHolder="";
            this.datepickerColor="#565656";
            this.dateSelected=true;
        }*/

        // update the form
        this.propagateChange(newValue);
    }

    // the method set in registerOnChange to emit changes back to the form
    private propagateChange = (_: any) => { };

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }

}