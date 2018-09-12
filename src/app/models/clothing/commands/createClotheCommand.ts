import { Clothe } from "../clothe";

export class CreateClotheCommand {
    commandName:string = "CreateClothe";
	username:string;
	clothe: Clothe;
}