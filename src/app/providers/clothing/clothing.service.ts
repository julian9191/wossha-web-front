import { Injectable } from '@angular/core';
import { ClothingType } from '../../models/clothing/clothingType';
import { ClothingCategory } from '../../models/clothing/clothingCategory';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CLOTHING_PATH } from "../../globals";
import { Router} from '@angular/router';
import { Brand } from '../../models/clothing/brand';
import 'rxjs';
import { BaseColor } from '../../models/clothing/baseColor';
import { Clothe } from '../../models/clothing/clothe';
import { SearchCriteriaParams } from 'app/models/clothing/searchCriteria/searchCriteriaParams';
import { SearchCriteriaResult } from 'app/models/clothing/searchCriteria/searchCriteriaResult';
import { ClotheView } from 'app/models/clothing/clotheView';

@Injectable()
export class ClothingService {

  private TOKEN_PREFIX:string = "Bearer ";
  private TOKEN:string;

  private commandsUrl:string = CLOTHING_PATH+'commands';
  private clothingUrl:string = CLOTHING_PATH+'clothing/';
  private clothingTypeUrl:string = this.clothingUrl+'clothing-types';
  private clothingCategoryUrl:string = this.clothingUrl+'clothing-categories';
  private clothingTypeSearchUrl:string = this.clothingUrl+'search-clouthing-type';
  private clothingCategorySearchUrl:string = this.clothingUrl+'search-clouthing-category';
  private clothingBrandSearchUrl:string = this.clothingUrl+'search-brand';
  private BaseColorUrl:string = this.clothingUrl+'base-colors';
  private colorsMapUrl:string = this.clothingUrl+'colors-map';
  private userClothesUrl:string = this.clothingUrl+'clothes';
  private clotheUrl:string = this.clothingUrl+'clothe';
  private clotheViewUrl:string = this.clothingUrl+'clothe-view';
  private searchCriteriaParamsUrl:string = this.clothingUrl+'search-criteria-params';
  private getOutfitUrl:string = this.clothingUrl+'outfit';

  httpHeaders:HttpHeaders;

  constructor(private router: Router,
    private http: HttpClient) {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    } 

    setToken(token:string){
        this.TOKEN = token;
        this.setHeaderToken();
    }

  setHeaderToken(){
    if(!this.httpHeaders.get("Authorization")){
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.TOKEN_PREFIX+this.TOKEN})
    }
  }

  getAllClothingTypes() : Observable<ClothingType>{
    return this.http.get<ClothingType>(this.clothingTypeUrl, {headers: this.httpHeaders});
  }

  getAllClothingCategories() : Observable<ClothingCategory>{
    return this.http.get<ClothingCategory>(this.clothingCategoryUrl, {headers: this.httpHeaders});
  }

  getAllBaseColors() : Observable<BaseColor>{
    return this.http.get<BaseColor>(this.BaseColorUrl, {headers: this.httpHeaders});
  }

  getColorsMap() : Observable<any>{
    return this.http.get<any>(this.colorsMapUrl, {headers: this.httpHeaders});
  }

  getClothes(searchCriteriaResult:SearchCriteriaResult, orderedBy: string, params: HttpParams) : Observable<Clothe>{
    return this.http.post<Clothe>(this.userClothesUrl+"/"+orderedBy, searchCriteriaResult, {params: params, headers: this.httpHeaders});
  }

  getClotheByUuid(uuid: string) : Observable<Clothe>{
    return this.http.get<Clothe>(this.clotheUrl+"/"+uuid, {headers: this.httpHeaders});
  }

  getClotheViewByUuid(uuid: string) : Observable<ClotheView>{
    return this.http.get<ClotheView>(this.clotheViewUrl+"/"+uuid, {headers: this.httpHeaders});
  }

  searchClothingType(word:string) : Observable<ClothingType>{
    return this.http.get<ClothingType>(this.clothingTypeSearchUrl+"/"+word, {headers: this.httpHeaders});
  }

  searchClothingCategory(word:string) : Observable<ClothingCategory>{
    return this.http.get<ClothingCategory>(this.clothingCategorySearchUrl+"/"+word, {headers: this.httpHeaders});
  }

  searchBrand(word:string) : Observable<Brand>{
    return this.http.get<Brand>(this.clothingBrandSearchUrl+"/"+word, {headers: this.httpHeaders});
  }

  getSearchCriteriaParams() : Observable<SearchCriteriaParams>{
    return this.http.get<SearchCriteriaParams>(this.searchCriteriaParamsUrl, {headers: this.httpHeaders});
  }

  getOutfit(searchCriteriaResult:SearchCriteriaResult, params: HttpParams) : Observable<Clothe>{
    return this.http.post<Clothe>(this.getOutfitUrl, searchCriteriaResult, {params: params, headers: this.httpHeaders});
  }

  executeCommand(data) : Observable<String>{
    return this.http.post<String>(this.commandsUrl, data, {headers: this.httpHeaders})
  }

}
