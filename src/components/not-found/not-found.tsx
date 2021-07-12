import React, { FC } from 'react';
import { Result, Button } from 'antd';
import HeaderPage from '../../features/auth/pages/header-page';
import ImageNotFound from '../../assets/images/404.png';
import './style.less';

interface Props {
    showHeader?: boolean;
}

const NotFound: FC<Props> = ({showHeader = true}) => {
    return (
        <div>
            {showHeader && <HeaderPage />}
            <Result
                className="not-found"
                icon={<img src={ImageNotFound} className="not-found-image" alt="" />}
                extra={<Button type='primary' href="/">Trở về trang chủ</Button>}
            />
        </div>
    );
};

export { NotFound };
