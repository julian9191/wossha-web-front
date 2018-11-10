import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl} from '@angular/forms';
import { SearchCriteriaParams } from 'app/models/clothing/searchCriteria/searchCriteriaParams';
import { ClothingService } from 'app/providers/clothing/clothing.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { UserService } from 'app/providers/user/user.service';
import { SearchCriteriaResult } from 'app/models/clothing/searchCriteria/searchCriteriaResult';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

declare var $:any;

@Component({
    selector: 'searchcriteria-cmp',
    templateUrl: './wossha.searchcriteria.component.html',
    providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SearchCriteriaComponent),
        multi: true,
    },
    {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => SearchCriteriaComponent),
        multi: true,
    }]        
})
export class SearchCriteriaComponent implements ControlValueAccessor, OnInit {
    
    private parseError: boolean;
    private data: any;
    public searchCriteriaParams:SearchCriteriaParams = new SearchCriteriaParams();
    public searchCriteriaResult:SearchCriteriaResult = new SearchCriteriaResult();

    typesSettings:any = {};
    categoriesSettings:any = {};
    brandsSettings:any = {};
    colorsSettings:any = {};
    howLike = 5;

    constructor(private clothingService: ClothingService,
                private notificationsService: NotificationsService,
                private userService: UserService){
        
    }

    ngOnInit(){
        this.getSearchCriteriaParams();
        this.typesSettings = {
            text: "Tipos de prenda",
            selectAllText: 'Seleccionar todo',
            unSelectAllText: 'reestablecer',
            classes: "btn-warning btn-block"
        };

        this.categoriesSettings = Object.assign({}, this.typesSettings);
        this.categoriesSettings.text="Categoías";

        this.brandsSettings = Object.assign({}, this.typesSettings);
        this.brandsSettings.text="Marcas";

        this.colorsSettings = Object.assign({}, this.typesSettings);
        this.colorsSettings.text="Colores";
    }

    getSearchCriteriaParams(){
        this.clothingService.getSearchCriteriaParams().subscribe(
          (data:any) => {
            this.searchCriteriaParams = data;
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
    private onChange() {
        // update the form
        this.propagateChange(this.searchCriteriaResult);
    }

    // the method set in registerOnChange to emit changes back to the form
    private propagateChange = (_: any) => { };

    onItemSelect(item: any) {
        this.onChange();
    }
    OnItemDeSelect(item: any) {
        this.onChange();
    }
    onSelectAll(items: any) {
        this.onChange();
    }
    onDeSelectAll(items: any) {
        this.onChange();
    }

    showTypes(){
        this.searchCriteriaResult.showTypes = !this.searchCriteriaResult.showTypes
        if(!this.searchCriteriaResult.showTypes){
            this.searchCriteriaResult.types = [];
        }
        this.onChange();
    }

    showCategories(){
        this.searchCriteriaResult.showCategories = !this.searchCriteriaResult.showCategories
        if(!this.searchCriteriaResult.showCategories){
            this.searchCriteriaResult.categories = [];
        }
        this.onChange();
    }

    showBrands(){
        this.searchCriteriaResult.showBrands = !this.searchCriteriaResult.showBrands
        if(!this.searchCriteriaResult.showBrands){
            this.searchCriteriaResult.brands = [];
        }
        this.onChange();
    }

    showColors(){
        this.searchCriteriaResult.showColors = !this.searchCriteriaResult.showColors
        if(!this.searchCriteriaResult.showColors){
            this.searchCriteriaResult.colors = [];
        }
        this.onChange();
    }

    showcHowLike(){
        this.searchCriteriaResult.showcHowLike = !this.searchCriteriaResult.showcHowLike
        if(this.searchCriteriaResult.showcHowLike){
            this.searchCriteriaResult.howLike = 5;
        }else{
            this.searchCriteriaResult.howLike = "";
        }
        this.onChange();
    }

    showNoWearingDays(){
        this.searchCriteriaResult.showNoWearingDays = !this.searchCriteriaResult.showNoWearingDays
        if(!this.searchCriteriaResult.showNoWearingDays){
            this.searchCriteriaResult.noWearingDaysSimbol = "";
            this.searchCriteriaResult.noWearingDays = "";
        }
        this.onChange();
    }

}