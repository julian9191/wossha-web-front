

import * as fromLoggedUser from './loggedUser.accions';
import { SessionInfo } from 'app/models/user/login/sessionInfo';
import { LoginUser } from 'app/models/user/login/loginUser';

const initState: SessionInfo = {
    message: "",
    user: new LoginUser(),
    token: "",
};

export function loggedUserReducer( state = initState, action: fromLoggedUser.acciones ): SessionInfo {

    switch ( action.type ) {

        case fromLoggedUser.SET_USER_SESSION_INFO:
            return {...action.sessionInfo};

        case fromLoggedUser.CHANGE_USER_SESSION_INFO:
            let sessionInfo: SessionInfo = {...state};
            sessionInfo.user.userSessionInfo = action.userSessionInfo;
            return sessionInfo;

        case fromLoggedUser.RESET_USER_SESSION_INFO:
            return initState;

        default:
            return state;
    }
}
