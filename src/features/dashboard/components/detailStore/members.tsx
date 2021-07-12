import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { find, get } from 'lodash';
import moment from 'moment';
import React, { FC } from 'react';
import { IStaffs } from '../../../../models/staff';
import { IUser } from '../../../../models/store';
import InsaTable from '../../components/table-insa';
import './members.less';

interface Props {
    members?: IUser[];
}

const Members: FC<Props> = ({ members }) => {

    const renderAvatar = (src: string) => {
        if (src) {
            return <Avatar src={src} size={24} />
        }
        return <Avatar icon={<UserOutlined />} size={24} />
    }

    const columns: ColumnType<IUser>[] = [
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            key: 'role',
            render: (role: number) => {
                const data = find(IStaffs, { role });
                return <span style={{ color: `${get(data, 'color')}` }}>{get(data, 'title')}</span>
            },
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, user: IUser) => {
                return <span>{renderAvatar(get(user, 'picture', ''))} {name}</span>
            }
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: any) => moment(createdAt).format('DD/MM/YYYY'),
        },
    ];

    return (
        <InsaTable
            columns={columns}
            dataSource={members}
            className='order-tbl hover'
            hasDefaultColumn={false}
            rowKey='userId'
        />
    );
};

export default Members;
