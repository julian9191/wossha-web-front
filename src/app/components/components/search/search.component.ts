import { Component, Input, forwardRef } from '@angular/core';
import { ClothingService } from '../../../providers/clothing/clothing.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SearchComponent),
    multi: true,
  }] 
})
export class SearchComponent implements ControlValueAccessor, Validator{

  private parseError: boolean;
  private data: any;

  @Input() searchKey: string;
  @Input() placeHolder: string;
  matches: any[] = [];
  loading: boolean;
  currentValue :any = {"id":-1,"name":""};
  focusIndexElement: number = 0;
  focusIdElement: number = 0;
  showListTab:boolean = false;

  constructor(private clothingService: ClothingService) {}

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
      this.verifyValue(newValue);
  }

  verifyValue(value:string){
      if(value != ""){
          this.parseError = false;
      }else{
          this.parseError = true;
      }

      // update the form
      this.propagateChange(value);
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };

  search(word: string, event) {
    if(event.key=="Enter" || event.key == "ArrowDown" || 
    event.key == "ArrowUp" || event.key == "ArrowLeft" || 
    event.key == "ArrowRight"){
      return;
    }

    if(word == ""){
      this.reset();
      return;
    }
    this.loading = true;
    this.getMatches( word, this.searchKey)
          .subscribe( (data: any) => {
            this.matches = data;
            this.loading = false;
            if(this.matches.length>0){
              this.focusIdElement = this.matches[this.focusIndexElement].id;
            }
          });
  }

  getMatches(word, searchKey){
    switch(searchKey) {
      case "clothing-type":
        return this.clothingService.searchClothingType(word);
      case "clothing-category":
        return this.clothingService.searchClothingCategory(word);
      case "brand":
        return this.clothingService.searchBrand(word);
      default:
    }
  }

  selectItem(idItem:number){
    let item = this.matches.filter(x => x.id == idItem);
    if(item.length>0){
      this.currentValue = item[0];
      this.verifyValue(this.currentValue.name);
      this.reset();
    }
  }

  onArrowUp() {
    if(this.matches.length==0){
      return;
    }
    if (this.focusIndexElement > 0) {
      this.focusIndexElement--;
      this.focusIdElement = this.matches[this.focusIndexElement].id
    }
  }

  onArrowDown() {
    if(this.matches.length==0){
      return;
    }
    if (this.focusIndexElement <= this.matches.length - 2) {
      this.focusIndexElement++;
      this.focusIdElement = this.matches[this.focusIndexElement].id
    }
  }

  onFocusMethod(){
    this.showListTab = true;
  }

  onBlurMethod(e){
    try {
      if(!e.relatedTarget.className.includes("item-search-list")){
        this.showListTab = false;
      }
    }
    catch(err) {
      this.showListTab = false;
    }
  }

  reset(){
    this.matches = [];
    this.focusIndexElement = 0;
    this.focusIdElement = 0;
  }

}
