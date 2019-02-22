import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginUser } from 'app/models/user/login/loginUser';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
declare var $:any;

@Component({
    selector: 'wossha-post',
    templateUrl: './wossha.post.component.html',
    styleUrls: [ './wossha.post.component.css' ]
})
export class WosshaPostComponent implements OnInit {

    sessionInfoSubs: Subscription = new Subscription();
    userSessionInfo:LoginUser;

    constructor(private store: Store<AppState>){}

    ngOnInit(){
        let _that = this;
        this.sessionInfoSubs = this.store.select(state => state.loggedUser.user)
        .subscribe(function(userSessionInfo){
            if(userSessionInfo){
                _that.userSessionInfo = userSessionInfo;
            }
        });
    }

}