import { UserStatus } from "./user-status.enum";

export class User
{
    public id: string;
    public displayName: string;
    public status: UserStatus;
    public avatar: string;
}