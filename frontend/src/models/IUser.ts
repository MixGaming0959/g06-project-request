import { GendersInterface } from "./IGender";
import { HistorysInterface } from "./IHistory";
import { PositionsInterface } from "./IPosition";
import { RolesInterface } from "./IRole";

export interface UsersInterface {

    ID?: number,
    Name?: string;
    Email?: string;
    Phone_number?: string;
    Password?: string;

    PositionID?: string;
    RoleID?: string;
    GenderID?: string;

    Role?: RolesInterface;
    Gender?: GendersInterface;
    Position?: PositionsInterface

    // History?:HistorysInterface;
}