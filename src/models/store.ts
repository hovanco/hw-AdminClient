import { IBilling } from './billing';

export enum EBusinessType {
    Others = 0,
    Fashion = 1,
    MomAndBaby = 2,
    Accessories = 3,
    Furniture = 4,
    Food = 5,
    Cosmetic = 6,
    Services = 7,
}

export interface IStore {
    _id: string;
    name: string;
    ownerId: string;
    createdAt: string;
    phoneNo?: string;
    ward: string;
    district: string;
    province: string;
    address: string;
    wardName: string;
    districtName: string;
    provinceName: string;
    logoUrl?: string;
    businessType?: EBusinessType;
    owner?: IUser;
    members?: IUser[];
    packages?: IBilling[];
}

export interface IUser {
    userId: string;
    name: string;
    role: number;
    email?: string;
    picture?: string;
    createdAt: string;
    phoneNo?: string;
}
