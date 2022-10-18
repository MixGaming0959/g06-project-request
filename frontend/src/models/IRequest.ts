import { UsersInterface } from "./IUser";
import { JobTypesInterface } from "./IJobType";
import { RHDsInterface } from "./IRHD";

export interface RequestsInterface {

    ID?: number;
    Date_Start: Date | null;
    Explan: string;
    
    UserID?: number;
    User?: UsersInterface;

    JobTypeID?: number;
    JobType?: JobTypesInterface;

    RHD_ID?: number;
    RHD?: RHDsInterface;
   
}