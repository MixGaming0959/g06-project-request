import { GendersInterface } from "./IGender";
import { HistorysInterface } from "./IHistory";
import { PositionsInterface } from "./IPosition";
import { RolesInterface } from "./IRole";

export interface UsersInterface {

    ID?: number,
    Name?: string;
    Email?: string;
    Phonenumber?: string;
    Password?: string;

    PositionID?: number;
    RoleID?: number;
    GenderID?: number;

    Role?: RolesInterface;
    Gender?: GendersInterface;
    Position?: PositionsInterface

    // History?:HistorysInterface;
}