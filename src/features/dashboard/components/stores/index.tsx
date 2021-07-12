import { Typography } from 'antd';
import React, { FC } from 'react';
import PageTopWrapper from '../../../../components/page-top-wrapper';
import StoreTable from '../store-table';

interface Props {}

const Stores: FC<Props> = () => {
    return (
        <>
            <PageTopWrapper
                leftContent={
                    <Typography.Title level={3}>CỬA HÀNG</Typography.Title>
                }
                rightContent={<div />}
            />
            <div style={{ padding: 20 }}>
                <StoreTable />
            </div>
        </>
    );
};

export default Stores;
