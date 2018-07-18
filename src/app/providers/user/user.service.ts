import { Injectable } from '@angular/core';
import { LoginAnswer } from '../../models/user/login/loginAnswer';
import { LoginParams } from '../../models/user/login/loginParams';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PATH } from "../../globals";
import { User } from '../../models/user/user';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { Router} from '@angular/router';
import { Country } from "../../models/country/country";

@Injectable()
export class UserService {
  private loginUrl: string = PATH+'login';
  private registerUserUrl: string = PATH+'register-user';
  private countriesUrl: string = PATH+'countries';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,
    private router: Router,
    private http: HttpClient) {
}

  login(loginParams: LoginParams) : Observable<LoginAnswer> {
    return this.http.post<LoginAnswer>(this.loginUrl, loginParams, {headers: this.httpHeaders})
  }

  logout() {
    this.storage.remove("loginInfo");
    this.router.navigate(['pages','login']);
  }

  registerUser(user:User) : Observable<String>{
    return this.http.post<String>(this.registerUserUrl, user, {headers: this.httpHeaders})
  }

  getCountires() : Observable<Country>{
    return this.http.get<Country>(this.countriesUrl, {headers: this.httpHeaders})
  }

}
