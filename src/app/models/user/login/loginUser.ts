import {Authority} from "./authority";

export class LoginUser {
  password: string;
  username:string;
  firstName:string;
  lastName:string;
  authorities:Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;

}
