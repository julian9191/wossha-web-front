import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginUser } from 'app/models/user/login/loginUser';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.reducer';
import { SocialService } from 'app/providers/social/social.service';
import { UserService } from 'app/providers/user/user.service';
import { NotificationsService } from 'app/providers/notifications/notifications.service';
import { HttpParams } from '@angular/common/http';
import { Post } from 'app/models/social/posts/post';
declare var $:any;

import { style, animate, transition, trigger, query as q } from '@angular/animations';
import { UserMinimumInfo } from 'app/models/user/userMinimumInfo';
const query = (s,a,o={optional:true})=>q(s,a,o);

@Component({
    selector: 'wossha-post',
    templateUrl: './wossha.post.component.html',
    animations: [
        trigger('items', [
          // cubic-bezier for a tiny bouncing feel
          transition(':enter', [
            style({ transform: 'scale(0.5)', opacity: 0 }),
            animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
              style({ transform: 'scale(1)', opacity: 1 }))
          ]),
          transition(':leave', [
            style({ transform: 'scale(1)', opacity: 1, height: '*' }),
            animate('1s cubic-bezier(.8,-0.6,0.2,1.5)', 
              style({ transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }))
          ]),      
        ])
      ],
    styleUrls: [ './wossha.post.component.css' ]
})
export class WosshaPostComponent implements OnInit, OnDestroy {

    @Input() username:string;
    sessionInfoSubs: Subscription = new Subscription();
    userSessionInfo:LoginUser;
    public currentPage = 1;
    public itemsPerPage = 5;
    public posts:Post[] = [];
    public loading:boolean = true;

    constructor(private socialService:SocialService,
        private userService: UserService,
        private notificationsService: NotificationsService,
        private store: Store<AppState>){

            userService.setHeaderToken();
            socialService.setToken(userService.getToken());
    }

    ngOnInit(){
        this.userSessionInfo = this.userService.getLoggedUserSessionInfo().user;
        let _that = this;
        this.sessionInfoSubs = this.store.select(state => state.loggedUser.user)
        .subscribe(function(userSessionInfo){
            if(userSessionInfo){
                _that.userSessionInfo = userSessionInfo;
            }
        });

        this.getPosts();
    }

    ngOnDestroy(){
        this.sessionInfoSubs.unsubscribe();
    }

    getPosts(){
        let params = new HttpParams();
        params = params.append("init", (this.itemsPerPage * (this.currentPage - 1))+"");
        params = params.append("limit", this.itemsPerPage+"");
        params = params.append("username", this.username?this.username:"");
        this.loading = true;
        this.socialService.getPosts(params).subscribe(
            (data:any) => {
                this.loading = false;
                this.posts = data.result;
                this.getMinuimumUserInfo();
            }, (error: any) => {
                this.loading = false;
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de posts", this.notificationsService.DANGER);
            }
        );
    }

    getMinuimumUserInfo(){
        const usernames:string[] = this.posts.filter(p => !p.name).map((x) => {return x.username});
        var usernamesUnique = usernames.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
        });
        this.userService.getMinuimumUserInfo(usernamesUnique).subscribe(
            (data:UserMinimumInfo[]) => {
                for(let i=0; i<this.posts.length; i++){
                    let userMinimumInfo:UserMinimumInfo[] = data.filter(x=>x.username==this.posts[i].username);
                    if(userMinimumInfo.length>0){
                        this.posts[i].name = userMinimumInfo[0].name;
                        this.posts[i].profilePicture = userMinimumInfo[0].profilePicture;
                    }
                }
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener alguna información", this.notificationsService.DANGER);
            }
        );
    }

    loadingEventListener(isLoading){
        this.loading = isLoading;
    }

    postCreatedListener(post){
        this.posts.unshift(post);
        this.loading = false;  
    }
}