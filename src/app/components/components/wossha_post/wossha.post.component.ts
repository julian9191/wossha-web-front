import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'wossha-post',
    templateUrl: './wossha.post.component.html',
    styleUrls: [ './wossha.post.component.css' ]
})
export class WosshaPostComponent implements OnInit {

    sessionInfoSubs: Subscription = new Subscription();
    userSessionInfo:LoginUser;
    public currentPage = 1;
    public itemsPerPage = 5;
    public posts:Post[] = [];

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

    getPosts(){
        let params = new HttpParams();
        params = params.append("init", (this.itemsPerPage * (this.currentPage - 1))+"");
        params = params.append("limit", this.itemsPerPage+"");
        this.socialService.getPosts(params).subscribe(
            (data:any) => {
                this.posts = data.result;
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de posts", this.notificationsService.DANGER);
            }
        );
    }

    postCreatedListener(post){
        this.posts.unshift(post);
    }
}