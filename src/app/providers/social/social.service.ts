import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SOCIAL_PATH } from "../../globals";
import { Router} from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { FollowingUser } from 'app/models/social/followingUser';
import { Message} from '../../components/components/ng-chat/core/message';
import { AppNotification } from 'app/models/social/appNotification';
import { Post } from 'app/models/social/posts/post';


@Injectable()
export class SocialService {

  private TOKEN_PREFIX:string = "Bearer ";
  private TOKEN:string;

  private commandsUrl:string = SOCIAL_PATH+'commands';
  private socialUrl:string = SOCIAL_PATH+'social/';
  private followingUsersUrl:string = this.socialUrl+'following-users';
  private messageHistoryUrl:string = this.socialUrl+'message-history';
  private notificationsUrl:string = this.socialUrl+'notifications';
  private postsUrl:string = this.socialUrl+'posts';

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

  getFollowingUsers() : Observable<FollowingUser>{
    return this.http.get<FollowingUser>(this.followingUsersUrl, {headers: this.httpHeaders});
  }

  getMessageHistory(params: HttpParams) : Observable<Message[]>{
    return this.http.get<Message[]>(this.messageHistoryUrl, {params: params, headers: this.httpHeaders});
  }

  getPosts(params: HttpParams) : Observable<Post[]>{
    return this.http.get<Post[]>(this.postsUrl, {params: params, headers: this.httpHeaders})
  }

  getNotifications() : Observable<AppNotification[]>{
    return this.http.get<AppNotification[]>(this.notificationsUrl, {headers: this.httpHeaders});
  }  

  executeCommand(data) : Observable<String>{
    return this.http.post<String>(this.commandsUrl, data, {headers: this.httpHeaders})
  }

}
