import { ActionReducerMap } from '@ngrx/store';

import * as fromLoggedUserReducer from './reducers/loggedUser/loggedUser.reducer';
import * as fromSocialInfoReducer from './reducers/socialInfo/socialInfo.reducer';
import { SessionInfo } from './models/user/login/sessionInfo';


export interface AppState {
    loggedUser: SessionInfo;
    socialInfo: fromSocialInfoReducer.SocialInfoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    loggedUser: fromLoggedUserReducer.loggedUserReducer,
    socialInfo: fromSocialInfoReducer.socialInfoReducer,
};

