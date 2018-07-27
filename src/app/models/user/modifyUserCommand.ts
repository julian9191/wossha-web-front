import { User } from "./user"

export class ModifyUserCommand {
    commandName:string = "ModifyUser";
    username:string;
    user:User;
  }