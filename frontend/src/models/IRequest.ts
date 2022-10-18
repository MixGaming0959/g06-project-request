import { UsersInterface } from "./IUser";
import { UrgencysInterface } from "./IUrgency";
import { RHDsInterface } from "./IRHD";

export interface RequestsInterface {

    ID?: number;
    Date_Start: Date | null;
    Explan: string;
    
    UserID?: number;
    User?: UsersInterface;

    UrgencyID?: number;
    Urgency?: UrgencysInterface;

    RHD_ID?: number;
    RHD?: RHDsInterface;
   
}