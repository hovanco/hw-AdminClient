import { ReloadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageTopWrapper from '../../../../components/page-top-wrapper';
import SelectPackage from '../../../../components/select-package';
import { loadBillings, resetBlillings, searchBilling, updateType } from '../../state/billingSlide';
import BillingTable from '../billing-table';

interface Props {}

const { Search } = Input;

const Billing: FC<Props> = () => {
    const dispatch = useDispatch();

    const page = useSelector((state: any) => state.billing.page);
    const limit = useSelector((state: any) => state.billing.limit);
    const sort = useSelector((state: any) => state.billing.sort);
    const direction = useSelector((state: any) => state.billing.direction);
    const search = useSelector((state: any) => state.billing.search);
    const reset = useSelector((state: any) => state.billing.reset);
    const type = useSelector((state: any) => state.billing.type);

    const [text, setText] = useState('');

    const onSearch = (value: string) => {
        dispatch(searchBilling(value));
    };

    const onSelectType = (type: number) => {
        dispatch(updateType(type));
    }

    const onChangeText = (e: any) => {
        setText(e.target.value);
    };

    const resetSearch = () => {
        dispatch(resetBlillings(null));
        setText('');
    };
    useEffect(() => {
        dispatch(loadBillings());
    }, [dispatch, page, limit, sort, direction, search, reset, type]);

    return (
        <>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>BILLINGS</Typography.Title>}
                rightContent={<div />}
            />
            <div style={{ padding: 20 }}>
                <Row gutter={15} style={{ marginBottom: 15 }} align='middle'>
                    <Col>Tìm kiếm</Col>
                    <Col>
                        <Search
                            value={text}
                            onChange={onChangeText}
                            onSearch={onSearch}
                            placeholder='Tìm kiếm'
                        />
                    </Col>
                    <SelectPackage
                        type={type}
                        onSelectType={onSelectType}
                    />
                    <Col>
                        <Button icon={<ReloadOutlined />} onClick={resetSearch}></Button>
                    </Col>
                </Row>
                <BillingTable />
            </div>
        </>
    );
};

export default Billing;
