import { UsersInterface } from "./IUser";
import { JobTypesInterface } from "./IJobType";
import { RHDsInterface } from "./IRHD";
import { CartsInterface } from "./ICart";
import { HistorysInterface } from "./IHistory";

export interface RequestsInterface {

    ID?: number;
    Date_Start?: Date | null;
    Explain?: string;
    
    UserID?: number;
    User?: UsersInterface;

    JobTypeID?: number;
    JobType?: JobTypesInterface;

    Room_has_Device_ID?: number;
    Room_has_Device?: RHDsInterface;

    Cart?: CartsInterface;
    // History?: HistorysInterface;

   
}