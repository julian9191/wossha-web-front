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
import { ReactPostCommand } from 'app/models/social/commands/reactPostCommand';
import { Reaction } from 'app/models/social/posts/reaction';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { LoadingEventDTO } from './components/wossha_post_creator/loadingEventDTO';
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
    public totalItems = 0;
	public currentPage = 1;
    public itemsPerPage = 5;
    public posts:Post[] = [];
    public loading:boolean = true;
    private reactPostCommand: ReactPostCommand;
    private consts = {
        "POST": "POST",
        "REACTION": "REACTION"
    };

    constructor(private socialService:SocialService,
        private userService: UserService,
        private notificationsService: NotificationsService,
        public ngxSmartModalService: NgxSmartModalService,
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

        this.reactPostCommand = new ReactPostCommand();
        this.reactPostCommand.username = this.userSessionInfo.username;

        this.getPosts(false);
    }

    ngOnDestroy(){
        this.sessionInfoSubs.unsubscribe();
    }

    getMorePosts(append:boolean){
        this.currentPage = 1;
        this.getPosts(append);
    }

    getPosts(append:boolean){
        let params = new HttpParams();
        params = params.append("init", (this.itemsPerPage * (this.currentPage - 1))+"");
        params = params.append("limit", this.itemsPerPage+"");
        params = params.append("username", this.username?this.username:"");
        this.loading = true;
        this.socialService.getPosts(params).subscribe(
            (data:any) => {
                this.loading = false;
                if(append){
                    this.posts = this.posts.concat(data.result);
                }else{
                    this.posts = data.result;
                }

                this.setMinuimumUserInfo(data.result);
                for(let i=0; i<data.result.length; i++){
                    if(data.result[i].comments.length>0){
                        this.setMinuimumUserInfo(data.result[i].comments);
                    }
                }

                this.totalItems = data.pagination.size;
                this.currentPage++;
                
            }, (error: any) => {
                this.loading = false;
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener el listado de posts", this.notificationsService.DANGER);
            }
        );
    }

    removeDups(array):string[] {
        let unique = {};
        array.forEach(function(i) {
          if(!unique[i]) {
            unique[i] = true;
          }
        });
        return Object.keys(unique);
      }

    setMinuimumUserInfo(posts:Post[]){
        for(let i=0; i<posts.length; i++){
            let reactionsTypes:string[] = posts[i].reactions.map((x:any) => {return x.type});
            reactionsTypes = this.removeDups(reactionsTypes);
            //let reactions = {} as IDictionary;
            let reactions:any[] = [];

            for (const iterator of reactionsTypes) {
                let reactionsByType:Reaction[] = posts[i].reactions.filter((r:any) =>r.type==iterator);
                reactions[iterator] = reactionsByType;
            }

            const usernames:string[] = posts[i].reactions.map((x) => {return x.username});
            posts[i].reactions = reactions;
            this.getMinuimumUserInfo(this.consts.REACTION, usernames, posts, posts[i].reactions);
        }
        const usernames:string[] = posts.filter(p => !p.name).map((x) => {return x.username});
        this.getMinuimumUserInfo(this.consts.POST, usernames, posts, null);
    }

    getMinuimumUserInfo(feature:string, usernames:string[], posts:Post[], reactions:any[]){
        var usernamesUnique = usernames.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
        });

        if(usernamesUnique.length==0){
            return;
        }

        this.userService.getMinuimumUserInfo(usernamesUnique).subscribe(
            (data:UserMinimumInfo[]) => {

                if(feature==this.consts.POST){
                    for(let i=0; i<posts.length; i++){
                        let userMinimumInfo:UserMinimumInfo[] = data.filter(x=>x.username==posts[i].username);
                        if(userMinimumInfo.length>0){
                            posts[i].name = userMinimumInfo[0].name;
                            posts[i].profilePicture = userMinimumInfo[0].profilePicture;
                        }
                    }
                }else if(feature==this.consts.REACTION){

                    let reactionsTypes:string[] = Object.keys(reactions);

                    for (const iterator of reactionsTypes) {
                        for(let i=0; i<reactions[iterator].length; i++){
                            let userMinimumInfo:UserMinimumInfo[] = data.filter(x=>x.username==reactions[iterator][i].username);
                            if(userMinimumInfo.length>0){
                                reactions[iterator][i].name = userMinimumInfo[0].name;
                                reactions[iterator][i].profilePicture = userMinimumInfo[0].profilePicture;
                            }
                        } 
                    }
                    
                }

                
            }, (error: any) => {
                this.notificationsService.showNotification("Ha ocurrido un error al intentar obtener alguna información", this.notificationsService.DANGER);
            }
        );
    }

    loadingEventListener(isLoading: LoadingEventDTO){
        if(isLoading.uuidParent){
            for(let i=0; i<this.posts.length; i++){
                if(this.posts[i].uuid==isLoading.uuidParent){
                    this.posts[i].loading = isLoading.loading;
                    break;
                }
            }
        }else{
            this.loading = isLoading.loading;
        }
    }

    postCreatedListener(post:Post){
        if(post.uuidParent){
            for(let i=0; i<this.posts.length; i++){
                if(this.posts[i].uuid==post.uuidParent){
                    this.posts[i].comments.push(post);
                    this.posts[i].loading = false;
                    break;
                }
            }
        }else{
            this.posts.unshift(post);
            this.loading = false; 
        }
    }

    react(reactionType:string, uuidPost:string, uuidComment:string){
        this.reactPostCommand.reactionType=reactionType;
        this.reactPostCommand.uuidPost = uuidComment==null ? uuidPost : uuidComment;

        this.socialService.executeCommand(this.reactPostCommand).subscribe( 
            (messaje) => {
                if(messaje["msj"]=="ok"){
                    this.addReaction(reactionType, uuidPost, uuidComment, false, null);
                }else if(messaje["msj"]=="remove"){
                    this.addReaction(reactionType, uuidPost, uuidComment, true, null);
                }else{
                    this.addReaction(reactionType, uuidPost, uuidComment, false, messaje["msj"]);
                }
                
            }, (error: any) => {
                this.notificationsService.showNotification(error.error.msj, this.notificationsService.DANGER);
            }
        );
    }

    addReaction(reactionType:string, uuidPost:string, uuidComment:string, remove:boolean, previousType:string){
        for(let i=0; i<this.posts.length; i++){
            if(this.posts[i].uuid==uuidPost){
                let post:Post;
                if(!uuidComment){
                    post = this.posts[i];
                }else{
                    for(let j=0; j<this.posts[i].comments.length; j++){
                        if(this.posts[i].comments[j].uuid==uuidComment){
                            post = this.posts[i].comments[j];
                            break;
                        }
                    }
                }

                let reaction:Reaction = new Reaction;
                reaction.type = reactionType;
                reaction.uuidPost = uuidPost;
                reaction.username = this.userSessionInfo.username;
                reaction.name = this.userSessionInfo.userSessionInfo.firstName+" "+this.userSessionInfo.userSessionInfo.lastName;
                reaction.profilePicture = this.userSessionInfo.userSessionInfo.picture;
                reaction.created = new Date();
                if(!post.reactions[reactionType]){
                    post.reactions[reactionType] = [];
                }

                if(remove){
                    post.reactions[reactionType] = post.reactions[reactionType].filter(r => r.username!=this.userSessionInfo.username);
                }else{
                    post.reactions[reactionType].push(reaction);
                    if(previousType){
                        post.reactions[previousType] = post.reactions[previousType].filter(r => r.username!=this.userSessionInfo.username);
                    }
                }

                break;
            }
        }
    }

    openReactionsPopup(reactions:any[], reactionType:string){
        const data: Object = {
            reactions: reactions,
            reactionType: reactionType
        };

        this.ngxSmartModalService.resetModalData('popuptwo');
        this.ngxSmartModalService.setModalData(data, 'popuptwo');
        this.ngxSmartModalService.getModal('popuptwo').open()
    }

    iReacted(reactions){
        if(reactions){
            let reaction = reactions.filter(r => r.username==this.userSessionInfo.username);
            if(reaction && reaction.length > 0){
                return true;
            }
        }
        return false;
    }

    showComments(uuidPost){
        for(let i=0; i<this.posts.length; i++){
            if(this.posts[i].uuid==uuidPost){
                this.posts[i].showComments = !this.posts[i].showComments;
                break;
            }
        }
    }
    
}