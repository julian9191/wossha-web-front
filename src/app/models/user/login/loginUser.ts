import {Authority} from "./authority";

export class LoginUser {
  password: string;
  username:string;
  authorities:Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;

}
