export interface User {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string; //  must be valid email format
    password?: string; // required, value must be equal to confirm password.
    confirmPassword?: string; // required, value must be equal to password.
    birthday?: string;
    gender?: string;
}