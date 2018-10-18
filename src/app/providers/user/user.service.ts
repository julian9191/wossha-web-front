import { Injectable } from '@angular/core';
import { SessionInfo } from '../../models/user/login/sessionInfo';
import { LoginParams } from '../../models/user/login/loginParams';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USERS_PATH } from "../../globals";
import { User } from '../../models/user/user';
import {SESSION_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { Router} from '@angular/router';
import { Country } from "../../models/country/country";
import 'rxjs';
import { UserSessionInfo } from 'app/models/user/login/userSessionInfo';

@Injectable()
export class UserService {

  private STORAGE_KEY:string = "loginInfo";
  private TOKEN_PREFIX:string = "Bearer ";

  private commandsUrl:string = USERS_PATH+'commands';
  private loginUrl:string = USERS_PATH+'login';
  private countriesUrl:string = USERS_PATH+'countries';
  private userUrl:string = USERS_PATH+'users/';
  private registerUserUrl:string = this.userUrl+"register-user";
  private updateLoggedUserSessionInfoUrl:string = this.userUrl+"logged-user-info";
  private static userInfo:SessionInfo
  
  httpHeaders:HttpHeaders;

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,
    private router: Router,
    private http: HttpClient) {
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    } 

  updateLoggedUserSessionInfo(): Observable<UserSessionInfo>{
    UserService.userInfo = null;
    return this.http.get<UserSessionInfo>(this.updateLoggedUserSessionInfoUrl, {headers: this.httpHeaders});
  }

  getLoggedUserSessionInfo():SessionInfo{
    if(UserService.userInfo){
      return UserService.userInfo;
    }
    UserService.userInfo = this.storage.get(this.STORAGE_KEY);
    if(UserService.userInfo){
      UserService.userInfo.user.userSessionInfo.firstName=decodeURI(UserService.userInfo.user.userSessionInfo.firstName);
      UserService.userInfo.user.userSessionInfo.lastName=decodeURI(UserService.userInfo.user.userSessionInfo.lastName);
      return UserService.userInfo;
    }
    return null;
  }

  getToken():string{
    return this.getLoggedUserSessionInfo().token;
  }

  setHeaderToken(){
    if(!this.httpHeaders.get("Authorization")){
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.TOKEN_PREFIX+this.getToken()})
    }
  }

  storageLoginUserSessionInfo(loginAnswer:SessionInfo){
    this.storage.set(this.STORAGE_KEY, loginAnswer);
  }

  destroyLoginUserSessionInfo(){
    this.storage.remove(this.STORAGE_KEY);
  }

  login(loginParams: LoginParams) : Observable<SessionInfo> {
    return this.http.post<SessionInfo>(this.loginUrl, loginParams, {headers: this.httpHeaders})
  }

  logout() {
    this.storage.remove(this.STORAGE_KEY);
    this.router.navigate(['pages','login']);
  }

  registerUser(user:User) : Observable<String>{
    return this.http.post<String>(this.registerUserUrl, user, {headers: this.httpHeaders})
  }

  getUserByUsername(userName:string) : Observable<User>{
    this.setHeaderToken();
    return this.http.get<User>(this.userUrl+userName, {headers: this.httpHeaders});
  }

  getCountires() : Observable<Country>{
    return this.http.get<Country>(this.countriesUrl, {headers: this.httpHeaders});
  }

  executeCommand(data) : Observable<String>{
    this.setHeaderToken();
    return this.http.post<String>(this.commandsUrl, data, {headers: this.httpHeaders})
  }

}
