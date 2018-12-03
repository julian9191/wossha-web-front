import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CLOTHING_PATH } from "../../globals";
import { Router} from '@angular/router';
import 'rxjs';
import { Clothe } from '../../models/clothing/clothe';
import { SearchCriteriaResult } from 'app/models/clothing/searchCriteria/searchCriteriaResult';

@Injectable()
export class CalendarService {

  private TOKEN_PREFIX:string = "Bearer ";
  private TOKEN:string;

  private commandsUrl:string = CLOTHING_PATH+'commands';
  private calendarUrl:string = CLOTHING_PATH+'calendar/';
  private searchClothingCalendarUrl:string = this.calendarUrl+'search-clothing';
  private getDayClothingUrl:string = this.calendarUrl+'day-clothing';
  private getDayDescriptionUrl:string = this.calendarUrl+'day-description';
  private getEventsByViewUrl:string = this.calendarUrl+'view-events';

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

  searchClothingCalendar(searchCriteriaResult:SearchCriteriaResult, params: HttpParams) : Observable<Clothe>{
    return this.http.post<Clothe>(this.searchClothingCalendarUrl, searchCriteriaResult, {params: params, headers: this.httpHeaders});
  }

  getDayClothing(date:string) : Observable<Clothe>{
    return this.http.get<Clothe>(this.getDayClothingUrl+"/"+date, {headers: this.httpHeaders});
  }

  getDayDescription(date:string) : Observable<string>{
    return this.http.get<string>(this.getDayDescriptionUrl+"/"+date, {headers: this.httpHeaders});
  }

  getEventsByView(startDate:number, endDate:number) : Observable<string>{
    return this.http.get<string>(this.getEventsByViewUrl+"/"+startDate+"/"+endDate, {headers: this.httpHeaders});
  }

  executeCommand(data) : Observable<String>{
    return this.http.post<String>(this.commandsUrl, data, {headers: this.httpHeaders})
  }

}
