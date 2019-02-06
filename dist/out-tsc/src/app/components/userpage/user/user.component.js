"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserComponent = /** @class */ (function () {
    function UserComponent() {
    }
    /*public user: User;
    public data: UserReference;
    public userAux: User;
    public minDate:Date;
    public maxDate:Date;
    public defaultCoverPicture = "../../assets/img/default_cover.jpg";
    public defaultProfilePicture = "../../assets/img/default-avatar.png";
    @ViewChild('photoSwipe') photoSwipe: PhotoSwipeComponent;
    public slideImages: PhotoSwipeImage[];
    public username:string;
    public ownProfile: boolean = false;
    public followUserCommand:FollowUserCommand = new FollowUserCommand();
    public stopFollowingUserCommand:StopFollowingUserCommand = new StopFollowingUserCommand();
    public socialInfo:FollowingUser[];
    
    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private socialService: SocialService,
        private notificationsService: NotificationsService,
        private httpErrorHandlerService: HttpErrorHandlerService){

        alert(111);
        socialService.setToken(userService.getToken());
        this.socialInfo = userService.getSocialInfo();
        this.data = new UserReference();
        this.refreshUser();
    }*/
    UserComponent.prototype.ngOnInit = function () {
        /*let loginInfo:SessionInfo = this.userService.getLoggedUserSessionInfo();
        let myUserName:string = loginInfo.user.username;
        this.username = this.route.snapshot.paramMap.get("username");

        this.followUserCommand.username=myUserName;
        this.followUserCommand.senderUsername=myUserName;
        this.followUserCommand.senderName=loginInfo.user.userSessionInfo.firstName+" "+loginInfo.user.userSessionInfo.lastName;
        this.followUserCommand.senderPicture=loginInfo.user.userSessionInfo.picture;
        this.followUserCommand.receiverUsername=this.username;

        this.stopFollowingUserCommand.username=myUserName;
        this.stopFollowingUserCommand.followingUserName=this.username;

        if(!this.username){
            this.username = myUserName;
        }
        if(this.username == myUserName){
            this.ownProfile = true;
        }
        
        this.getUser();*/
    };
    UserComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-cmp',
            templateUrl: './user.component.html',
            styles: ['.image { height: 270px; }', '.content { min-height: 0; }']
        })
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map