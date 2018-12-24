import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SOCIAL_PATH } from "../../globals";
import { Router} from '@angular/router';
import 'rxjs';
import { FollowingUser } from 'app/models/social/followingUser';
import { Message} from '../../components/components/ng-chat/core/message';


@Injectable()
export class SocialService {

  private TOKEN_PREFIX:string = "Bearer ";
  private TOKEN:string;

  private commandsUrl:string = SOCIAL_PATH+'commands';
  private socialUrl:string = SOCIAL_PATH+'social/';
  private followingUsersUrl:string = this.socialUrl+'following-users';
  private messageHistoryUrl:string = this.socialUrl+'message-history';

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

  getMessageHistory() : Observable<Message[]>{
    return this.http.get<Message[]>(this.messageHistoryUrl, {headers: this.httpHeaders});
  }
  

  executeCommand(data) : Observable<String>{
    return this.http.post<String>(this.commandsUrl, data, {headers: this.httpHeaders})
  }

}
