import { Injectable } from '@angular/core';
import { LoginAnswer } from '../model/loginAnswer';
import { LoginParams } from '../model/loginParams';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  private urlEndPoint: string = 'http://localhost:8080/login';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  login(loginParams: LoginParams) : Observable<LoginAnswer> {
    return this.http.post<LoginAnswer>(this.urlEndPoint, loginParams, {headers: this.httpHeaders})
  }

}
