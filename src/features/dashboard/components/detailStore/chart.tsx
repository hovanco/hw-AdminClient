import { LoadingOutlined } from '@ant-design/icons';
import { Col, Divider, Row, Skeleton, Space } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { get, map } from 'lodash';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import storeApi from '../../../../api/store-api';
import { EFilterType } from '../../../../constants';

interface Props {
    filterType: EFilterType;
    storeId: string;
}

interface Idata {
    date: string;
    customerCount: number;
    orderCount: number;
}

const Chart: FC<Props> = ({ filterType, storeId }) => {
    const [data, setData] = useState<Idata[]>([]);
    const [totalCustomer, setTotalCustomer] = useState<number>(0);
    const [totalOrder, setTotalOrder] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getFigures() {
            try {
                if (!storeId) {
                    setLoading(false);
                    return;
                }
                setLoading(true);

                const startTime: string = moment().startOf(filterType).valueOf().toString();
                const endTime: string = moment().endOf(filterType).valueOf().toString();
    
                const data = await storeApi.getFigures({
                    storeId,
                    startTime,
                    endTime,
                });
    
                const totalCustomer = get(data, 'totalCustomer', 0);
                setTotalCustomer(totalCustomer);
    
                const totalOrder = get(data, 'totalOrder', 0);
                setTotalOrder(totalOrder);
    
                const dataChart = get(data, 'data', []);
                setData(dataChart);
            } catch (err) {

            } finally {
                setLoading(false);
            }
        }
        getFigures();
    }, [filterType, storeId]);

    const names = [
        'Số lượng khách hàng',
        'Số đơn hàng',
    ];

    const colors = [
        '#6c6fbf',
        '#F67B68',
    ]

    const options = (
        data: Idata[],
        names: string[],
        colors: string[]
    ): Highcharts.Options => ({
        title: { text: '' },
        subtitle: { text: '' },
        xAxis: {
            categories:
                filterType === EFilterType.WEEK
                    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    : map(data, (item) => item.date.split('/')[0]),
        },
        yAxis: { title: { text: '' } },
        series: [
            {
                showInLegend: false,
                name: names[0],
                type: 'column',
                data: map(data, (item) => item.customerCount),
            },
            {
                showInLegend: false,
                name: names[1],
                type: 'column',
                data: map(data, (item) => item.orderCount),
            },
        ],
        chart: {
            height: 250,
        },
        colors: colors,
        plotOptions: {
            column: {
                borderRadius: 5,
                pointWidth: filterType === EFilterType.WEEK ? 20 : undefined,
            },
        },
    });

    return (
        <Row style={{ paddingLeft: 5 }}>
            <Col span={5}>
                <div className="channel-content">
                    <Space size={5} direction="vertical">
                        <div className="channel-content-title">Số lượng khách hàng</div>
                        <div className="channel-content-number">
                            <span className="dot" style={{ backgroundColor: '#6c6fbf' }}></span>
                            {loading ? <LoadingOutlined /> : totalCustomer}
                        </div>
                    </Space>
                </div>
                <Divider />
                <div className="channel-content">
                    <Space size={5} direction="vertical">
                        <div className="channel-content-title">Số đơn hàng</div>
                        <div className="channel-content-number">
                            <span className="dot" style={{ backgroundColor: '#F67B68' }}></span>
                            {loading ? <LoadingOutlined /> : totalOrder}
                        </div>
                    </Space>
                </div>
            </Col>
            <Col span={19}>
                <Space size={30} direction="vertical" style={{ width: '100%' }}>
                    {loading ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options(data, names, colors)}
                        />
                    }
                </Space>
            </Col>
        </Row>
    )
}

Chart.defaultProps = {
    filterType: EFilterType.MONTH,
}

export default Chart;