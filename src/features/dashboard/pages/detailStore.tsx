import { Card, Col, Row, Tabs, Typography } from 'antd';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading, NotFound } from '../../../components';
import BackLink from '../../../components/back-link';
import PageTopWrapper from '../../../components/page-top-wrapper';
import { EFilterType } from '../../../constants';
import { BaseLayout } from '../../../layout';
import { IStore } from '../../../models/store';
import { DetailStore } from '../components/detailStore';
import Chart from '../components/detailStore/chart';
import FanPages from '../components/detailStore/fanpages';
import Members from '../components/detailStore/members';
import Packages from '../components/detailStore/packages';
import TimeFilter from '../components/time-filter';
import './detailStore.less';
import StoreApi from '../../../api/store-api';

interface IParam {
    id: string;
}

const StoreDetail = () => {
    const { id: storeId } = useParams<IParam>();
    const [store, setStore] = useState<IStore | null>(null);
    const [filterType, setFilterType] = useState<EFilterType>(EFilterType.MONTH);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getStore() {
            try {
                setLoading(true);

                const res = await StoreApi.loadStore({ storeId });
                setStore(res);
            } catch (err) {

            } finally {
                setLoading(false);
            }
        }
        if (storeId) {
            getStore();
        }
    }, [storeId]);

    if (loading) {
        return <Loading full />;
    }

    if (!store) {
        return <NotFound showHeader={false} />;
    }

    const { members } = store;

    return (
        <BaseLayout title={store.name}>
            <PageTopWrapper
                leftContent={
                    <>
                        <BackLink isGoBack to={`/dashboard/shops`} text='Danh sách cửa hàng' />
                        <Typography.Title level={3}>{store.name}</Typography.Title>
                    </>
                }
            />
            <Row style={{ paddingTop: 20 }}>
                <Col
                    span={16}
                    style={{ paddingLeft: 16, paddingRight: 8 }}
                >
                    <Card
                        title={
                            <Typography.Text>Chi tiết cửa hàng</Typography.Text>
                        }
                        type='inner'
                        bodyStyle={{ padding: 0 }}
                        className='card-custom'
                    >
                        <DetailStore store={store} />
                    </Card>
                </Col>
                <Col
                    span={8}
                    style={{ paddingLeft: 8, paddingRight: 16 }}>
                    <Card
                        title={
                            <Typography.Text>Gói đã đăng ký</Typography.Text>
                        }
                        type='inner'
                        bodyStyle={{ padding: 20 }}
                        className='card-custom'
                    >
                        <Packages packages={get(store, 'packages', [])} />
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col
                    span={24}
                    style={{ padding: 16 }}
                >
                    <Card
                        title={
                            <Typography.Text>Biểu đồ thống kê</Typography.Text>
                        }
                        type='inner'
                        bodyStyle={{ padding: 16 }}
                        className='card-custom chart-card'
                        extra={
                            <TimeFilter
                                filterType={filterType}
                                setFilterType={setFilterType} />
                        }
                    >
                        <Chart
                            filterType={filterType}
                            storeId={store._id}
                        />
                    </Card>
                </Col>
            </Row>

            <Row
                style={{ marginBottom: 60 }}
            >
                <Tabs
                    defaultActiveKey='members'
                    className='tabs card-custom'
                    tabBarStyle={{ paddingRight: 16, paddingLeft: 16 }}
                >
                    <Tabs.TabPane
                        tab='Danh sách thành viên'
                        key='members'
                    >
                        <Col
                            span={24}
                        >
                            <Members members={members} />
                        </Col>
                    </Tabs.TabPane>

                    <Tabs.TabPane
                        tab='Danh sách Fanpage'
                        key='fanpages'
                    >
                        <Col
                            span={24}
                        >
                            <FanPages storeId={store._id} />
                        </Col>
                    </Tabs.TabPane>
                </Tabs>
            </Row>
        </BaseLayout>
    );
};

export default StoreDetail;
