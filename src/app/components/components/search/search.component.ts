import { Component, Input } from '@angular/core';
import { ClothingService } from '../../../providers/clothing/clothing.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  @Input() searchKey: string;
  @Input() placeHolder: string;
  matches: any[] = [];
  loading: boolean;
  currentValue :any = {"id":-1,"name":""};
  focusIndexElement: number = 0;
  focusIdElement: number = 0;
  showListTab:boolean = false;

  constructor(private clothingService: ClothingService) {}

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
