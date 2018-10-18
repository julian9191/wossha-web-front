import {Authority} from "./authority";
import { UserSessionInfo } from "./userSessionInfo";

export class LoginUser {
  password: string;
  username:string;
  userSessionInfo: UserSessionInfo;
  authorities:Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;

}
