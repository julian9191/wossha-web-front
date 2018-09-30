import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PICTURES_PATH } from "../../globals";
import 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class PicturesService {

  private TOKEN_PREFIX:string = "Bearer ";
  private TOKEN:string;

  private commandsUrl:string = PICTURES_PATH+'commands';
  private picturesUrl:string = PICTURES_PATH+'pictures/';
  
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

  getPictureByUuid(uuid:string) : Observable<string>{
    return this.http.get<string>(this.picturesUrl+"/"+uuid, {headers: this.httpHeaders});
  }

  

  executeCommand(data) : Observable<String>{
    return this.http.post<String>(this.commandsUrl, data, {headers: this.httpHeaders})
  }

}
