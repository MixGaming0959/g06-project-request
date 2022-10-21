import { UsersInterface } from "./IUser";
import { EstimateInterface } from "./IEstimate";
import {RequestsInterface } from "./IRequest";

export interface CartsInterface {

    ID?: number;
    Work_Date: Date | null;
    
    UserID?: number;
    User?: UsersInterface;

    EstimateID?: number;
    Estimate?: EstimateInterface;

    RequestID?: number;
    Request?: RequestsInterface;
   
}