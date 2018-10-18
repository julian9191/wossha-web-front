import { PictureFile } from "../global/pictureFile";

export class UserReference {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string; //  must be valid email format
    country?:number;
    about?: string;
    password?: string; // required, value must be equal to confirm password.
    confirmPassword?: string; // required, value must be equal to password.
    birthday?: Date;
    gender?: string;
    profilePicture: string = "";
    coverPicture: string = "";
}
