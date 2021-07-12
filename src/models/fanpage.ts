export interface IFanPage {
    _id: string;
    createdAt: string;
    link: string;
    name: string;
    active: boolean;
}

export const CStatus = {
    active: {
        label: 'Đang hoạt động',
        color: '#f0564a',
    },
    inactive: {
        label: 'Ngừng hoạt động',
        color: '#c2c5cb',
    },
};
