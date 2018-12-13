import { Injectable } from '@angular/core';
import { SessionInfo } from '../../models/user/login/sessionInfo';
import { LoginParams } from '../../models/user/login/loginParams';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { USERS_PATH, TOKEN_PREFIX, SESSION_STORAGE_KEY, SOCIAL_STORAGE_KEY } from "../../globals";
import { User } from '../../models/user/user';
import {SESSION_STORAGE, WebStorageService, LOCAL_STORAGE} from 'angular-webstorage-service';
import { Inject } from '@angular/core'; 
import { Router} from '@angular/router';
import { Country } from "../../models/country/country";
import 'rxjs';
import { UserSessionInfo } from 'app/models/user/login/userSessionInfo';
import { FollowingUser } from 'app/models/social/followingUser';

@Injectable()
export class UserService {

  private commandsUrl:string = USERS_PATH+'commands';
  private loginUrl:string = USERS_PATH+'login';
  private countriesUrl:string = USERS_PATH+'countries';
  private userUrl:string = USERS_PATH+'users/';
  private registerUserUrl:string = this.userUrl+"register-user";
  private updateLoggedUserSessionInfoUrl:string = this.userUrl+"logged-user-info";
  private static userInfo:SessionInfo
  private static socialInfo:FollowingUser[];
  
  httpHeaders:HttpHeaders;

  constructor(@Inject(SESSION_STORAGE) private sessionStorage: WebStorageService,
  @Inject(LOCAL_STORAGE) private localStorage: WebStorageService,
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
    UserService.userInfo = this.sessionStorage.get(SESSION_STORAGE_KEY);
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
      this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': TOKEN_PREFIX+this.getToken()})
    }
  }

  storageLoginUserSessionInfo(loginAnswer:SessionInfo){
    this.sessionStorage.set(SESSION_STORAGE_KEY, loginAnswer);
  }

  storageSocialInfo(followingUsers:FollowingUser[]){
    this.localStorage.set(SOCIAL_STORAGE_KEY, followingUsers);
  }

  getSocialInfo():FollowingUser[]{
    if(UserService.socialInfo){
      return UserService.socialInfo;
    }
    let socualInfo:FollowingUser[] = this.localStorage.get(SOCIAL_STORAGE_KEY)
    
    if(socualInfo){
      if(socualInfo.length > 0){
        return socualInfo;
      }
    }
    return null;
  }

  destroyLoginUserSessionInfo(){
    this.sessionStorage.remove(SESSION_STORAGE_KEY);
  }

  login(loginParams: LoginParams) : Observable<SessionInfo> {
    return this.http.post<SessionInfo>(this.loginUrl, loginParams, {headers: this.httpHeaders})
  }

  logout() {
    this.sessionStorage.remove(SESSION_STORAGE_KEY);
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
