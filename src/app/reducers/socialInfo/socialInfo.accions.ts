import { Action } from '@ngrx/store';
import { FollowingUser } from 'app/models/social/followingUser';


export const SET_SOCIAL_INFO = '[LoggedUser] SET_SOCIAL_INFO';
export const CHANGE_SOCIAL_INFO = '[LoggedUser] CHANGE_SOCIAL_INFO';
export const RESET_SOCIAL_INFO = '[LoggedUser] RESET_SOCIAL_INFO';

export class SetSocialInfo implements Action {
    readonly type = SET_SOCIAL_INFO;
    constructor( public followingUser: FollowingUser[] ) {}
}

export class ChangeSocialInfo implements Action {
    readonly type = CHANGE_SOCIAL_INFO;
    constructor( public followingUser: FollowingUser[] ) {}
}

export class ResetSocialInfo implements Action {
    readonly type = RESET_SOCIAL_INFO;
}

export type acciones = SetSocialInfo | ChangeSocialInfo | ResetSocialInfo;
