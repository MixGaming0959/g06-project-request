import { GendersInterface } from "./IGender";
import { RolesInterface } from "./IRole";
import { Educational_backgroundInterface } from "./IEducational_background";

export interface UsersInterface {

    ID?: number,
    Name?: string;
    Email?: string;
    Phonenumber?: string;
    Password?: string;

    Educational_backgroundID?: number;
    RoleID?: number;
    GenderID?: number;

    Role?: RolesInterface;
    Gender?: GendersInterface;
    Educational_background?: Educational_backgroundInterface

}