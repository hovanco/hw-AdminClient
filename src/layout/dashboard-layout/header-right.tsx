import { CaretDownFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, message, Space, Typography } from 'antd';
import { get } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/state/authSlide';
import './header-right.less';

const HeaderRight = () => {
    const dispatch = useDispatch();

    const user = useSelector(({ auth }: { auth: any }) => auth.user);

    const menuOnClick = async (value: any) => {
        switch (value.key) {
            case 'info':
                message.info('Tính năng chưa phát triển');
                break;

            case 'profile': {
                message.info('Tính năng chưa phát triển');
                break;
            }

            case 'logout': {
                dispatch(logout());
                break;
            }

            default:
                break;
        }
    };

    const menu = (
        <Menu onClick={menuOnClick} className="user-menu">
            <Menu.Item key="info">
                <strong>{get(user, 'name')}</strong>
                <span className="user-info">{get(user, 'email')}</span>
            </Menu.Item>
            <Menu.Item key="profile">
                Cài đặt tài khoản
                    </Menu.Item>
            <Menu.Item key="logout">
                Đăng xuất
                    </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <div className="user-dropdown">
                <Space>
                    <Typography.Text>{get(user, ['name'])}</Typography.Text>
                    <CaretDownFilled style={{ fontSize: 12 }} />
                    <Avatar icon={<UserOutlined />} size={40} src={user.picture} />
                </Space>
            </div>
        </Dropdown>
    );
};

export default HeaderRight;
