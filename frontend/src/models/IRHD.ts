import { DevicesInterface } from "./IDevice";

export interface RHDsInterface {

    ID?: number,
    
    UserID?: number,
    DeviceID?: number,
    Device?: DevicesInterface;
    RoomID?: number,
    StatusID?: number,
}