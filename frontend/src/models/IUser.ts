import { RolesInterface } from "./IRole";

export interface UsersInterface {

    ID?: number,
    Name?: string;
    Email?: string;
    Phone_number?: string;
    Password?: string;

    PositionID?: string;
    RoleID?: string;
    Role?: RolesInterface;
    GenderID?: string;
}