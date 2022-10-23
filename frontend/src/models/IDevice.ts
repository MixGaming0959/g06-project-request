import { BrandsInterface } from "./IBrand";
import { DistributorsInterface } from "./IDistributor";
import { TypesInterface } from "./IType";

export interface DevicesInterface {

    ID?: number,
    Name?: string;
    
    DistributorID?: number;
	TypeID ?      : number;
	BrandID?      : number;

    Distributor?: DistributorsInterface
    Type?: TypesInterface
    Brand?: BrandsInterface;
}