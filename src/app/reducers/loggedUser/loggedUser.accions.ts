import { Action } from '@ngrx/store';
import { SessionInfo } from 'app/models/user/login/sessionInfo';
import { UserSessionInfo } from 'app/models/user/login/userSessionInfo';


export const SET_USER_SESSION_INFO = '[LoggedUser] SET_USER_SESSION_INFO';
export const CHANGE_USER_SESSION_INFO = '[LoggedUser] CHANGE_USER_INFO';
export const RESET_USER_SESSION_INFO = '[LoggedUser] RESET_USER_SESSION_INFO';

export class SetUserSessionInfo implements Action {
    readonly type = SET_USER_SESSION_INFO;
    constructor( public sessionInfo: SessionInfo ) {}
}

export class ChangeUserSessionInfo implements Action {
    readonly type = CHANGE_USER_SESSION_INFO;
    constructor( public userSessionInfo: UserSessionInfo ) {}
}

export class ResetUserSessionInfo implements Action {
    readonly type = RESET_USER_SESSION_INFO;
}

export type acciones = SetUserSessionInfo | ChangeUserSessionInfo | ResetUserSessionInfo;
