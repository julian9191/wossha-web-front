import { Injectable } from '@angular/core';
import { UserSessionInfo } from '../../models/user/login/userSessionInfo';
import { LoginParams } from '../../models/user/login/loginParams';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PATH } from "../../globals";
import { User } from '../../models/user/user';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { Router} from '@angular/router';
import { Country } from "../../models/country/country";
import 'rxjs';

@Injectable()
export class UserService {

  private STORAGE_KEY:string = "loginInfo";

  private loginUrl:string = PATH+'login';
  private countriesUrl:string = PATH+'countries';
  private userUrl:string = PATH+'users/';
  private registerUserUrl:string = this.userUrl+"register-user";
  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})


  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,
    private router: Router,
    private http: HttpClient) {} 

  getLoggedUserSessionInfo():UserSessionInfo{
    return this.storage.get(this.STORAGE_KEY);
  }

  storageLoginUserSessionInfo(loginAnswer:UserSessionInfo){
    this.storage.set(this.STORAGE_KEY, loginAnswer);
  }

  getLoggedUserInfo():UserSessionInfo{
    return this.storage.get(this.STORAGE_KEY);
  }

  login(loginParams: LoginParams) : Observable<UserSessionInfo> {
    return this.http.post<UserSessionInfo>(this.loginUrl, loginParams, {headers: this.httpHeaders})
  }

  logout() {
    this.storage.remove(this.STORAGE_KEY);
    this.router.navigate(['pages','login']);
  }

  registerUser(user:User) : Observable<String>{
    return this.http.post<String>(this.registerUserUrl, user, {headers: this.httpHeaders})
  }

  getUserByUsername(userName:string) : Observable<User>{
    return this.http.get<User>(this.userUrl+userName, {headers: this.httpHeaders});
  }

  getCountires() : Observable<Country>{
    return this.http.get<Country>(this.countriesUrl, {headers: this.httpHeaders});
  }

  updateUser(user:User) : Observable<String>{
    return this.http.put<String>(this.userUrl, user, {headers: this.httpHeaders})
  }

}
