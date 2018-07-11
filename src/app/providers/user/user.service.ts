import { Injectable } from '@angular/core';
import { LoginAnswer } from '../../components/pages/login/model/loginAnswer';
import { LoginParams } from '../../components/pages/login/model/loginParams';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PATH } from "../../globals";
import { User } from '../../components/pages/register/model/user';

@Injectable()
export class UserService {
  private loginUrl: string = PATH+'login';
  private RegisterUserUrl: string = PATH+'register-user';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  login(loginParams: LoginParams) : Observable<LoginAnswer> {
    return this.http.post<LoginAnswer>(this.loginUrl, loginParams, {headers: this.httpHeaders})
  }

  registerUser(user:User) : Observable<String>{
    return this.http.post<String>(this.RegisterUserUrl, user, {headers: this.httpHeaders})
  }

}
