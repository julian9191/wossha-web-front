import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CLOTHING_PATH } from "../../globals";
import { Router} from '@angular/router';
import 'rxjs';

@Injectable()
export class StatisticsService {

  private TOKEN_PREFIX:string = "Bearer ";
  private TOKEN:string;

  private commandsUrl:string = CLOTHING_PATH+'commands';
  private statisticsUrl:string = CLOTHING_PATH+'statistics/';
  private generalStatisticsUrl:string = this.statisticsUrl+'general-statistics';

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

  getGeneralStatistics() : Observable<string>{
    return this.http.get<string>(this.generalStatisticsUrl, {headers: this.httpHeaders});
  }

  executeCommand(data) : Observable<String>{
    return this.http.post<String>(this.commandsUrl, data, {headers: this.httpHeaders})
  }

}
