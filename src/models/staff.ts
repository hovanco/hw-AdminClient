export enum EUserRole {
    owner,
    manager,
    staff,
}

export interface IStaff {
    _id: string;
    name: string;
    email: string;
    role: EUserRole;
    picture?: string;
    phoneNo?: string;
}

interface IItemStaff {
    role: EUserRole;
    title: string;
    color: string;
}

export const IStaffs: IItemStaff[] = [
    {
        role: EUserRole.owner,
        title: 'Chủ shop',
        color: '#f50',
    },
    {
        role: EUserRole.manager,
        title: 'Quản lý',
        color: '#2db7f5',
    },
    {
        role: EUserRole.staff,
        title: 'Nhân viên',
        color: '#87d068',
    },
];
