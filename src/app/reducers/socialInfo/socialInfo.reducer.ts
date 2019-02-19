

import * as fromSocialInfo from './socialInfo.accions';
import { SessionInfo } from 'app/models/user/login/sessionInfo';
import { FollowingUser } from 'app/models/social/followingUser';

export interface SocialInfoState {
    followingUser: FollowingUser[];
}

const initState: SocialInfoState = {
    followingUser: []
};

export function socialInfoReducer( state = initState, action: fromSocialInfo.acciones ): SocialInfoState {

    switch ( action.type ) {

        case fromSocialInfo.SET_SOCIAL_INFO:
            return {followingUser: [...action.followingUser]};

        case fromSocialInfo.CHANGE_SOCIAL_INFO:
        return {followingUser: [...action.followingUser]};

        case fromSocialInfo.RESET_SOCIAL_INFO:
            return initState;

        default:
            return state;
    }
}
