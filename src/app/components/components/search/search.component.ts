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

  constructor(private clothingService: ClothingService) {}

  search(word: string) {
    if(word == ""){
      this.reset();
      return;
    }
    this.loading = true;
    this.getMatches( word, this.searchKey)
          .subscribe( (data: any) => {
            this.matches = data;
            this.loading = false;
          });
  }

  getMatches(word, searchKey){
    switch(searchKey) {
      case "clothing-type":
        return this.clothingService.searchClothingType(word);
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

  reset(){
    this.matches = [];
  }

}
