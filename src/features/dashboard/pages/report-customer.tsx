import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, message, Row, Space, Table, Typography, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DashboardApi from '../../../api/dashboard-api';
import iconProduct from '../../../assets/images/ic-layout-left-menu.svg';
import icReport from '../../../assets/images/ic-report.svg';
import PageTopWrapper from '../../../components/page-top-wrapper';
import { EFilterType } from '../../../constants';
import TimeFilter from '../components/time-filter';
import './dashboard-home.less';

interface Props {}
interface IDashboardReport {
    data: Array<{ date: string; value: number }>;
    total: number;
}
const ReportCustomer: FC<Props> = () => {
    const [user, setUser] = useState<IDashboardReport>({ data: [], total: 0 });
    const page = useSelector((state: any) => state.store.page);

    /**
     * filter by week or month
     * select the start of week/month and end of week/month to send to server
     * api has supported
     */
    const [filterType, setFilterType] = useState<EFilterType>(EFilterType.WEEK);

    const options = (
        data: Array<{ date: string; value: number }>,
        name: string,
        color: string,
    ): Highcharts.Options => ({
        title: { text: '' },
        subtitle: { text: '' },
        xAxis: {
            categories:
                filterType === EFilterType.WEEK
                    ? ['M', 'T', 'W', 'T', 'F', 'S', 'S']
                    : data.map((e) => e.date.split('/')[0]),
        },
        yAxis: { title: { text: '' } },
        series: [
            {
                name,
                type: 'column',
                data: data.map((e) => e.value),
            },
        ],
        chart: {
            height: 250,
        },
        colors: [color],
        plotOptions: {
            column: {
                borderRadius: 5,
                pointWidth: filterType === EFilterType.WEEK ? 20 : undefined,
            },
        },
    });
    const requestOrder = async () => {
        const startTime = moment().startOf(filterType).valueOf().toString();
        const endTime = moment().endOf(filterType).valueOf().toString();

        Promise.all([
            DashboardApi.loadReport({
                type: 'new-users',
                startTime,
                endTime,
            }).then((resUser) => setUser(resUser)),
        ]).catch((e) => message.error(e.message || 'Something went wrong'));
    };

    const dataSource = (user.data || []).map((store: any, index: number) => ({
        ...store,
        index: (page - 1) * 10 + index + 1,
    }));

    const columns: ColumnsType<[]> = [
        { title: 'STT', dataIndex: 'index', key: 'index', align: 'center' },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },

        {
            title: 'Số lượng khách hàng',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    useEffect(() => {
        requestOrder();
    }, [filterType]);

    return (
        <div>
            <PageTopWrapper
                leftContent={<Typography.Title level={3}>Báo cáo khách hàng</Typography.Title>}
                rightContent={
                    <>
                        <TimeFilter filterType={filterType} setFilterType={setFilterType} />
                        <Upload>
                            <Button style={{ marginLeft: '5px' }}>
                                <UploadOutlined />
                                Nhập file
                            </Button>
                        </Upload>
                    </>
                }
            />
            <Row gutter={[30, 22]} style={{ padding: 20 }}>
                <Col span={24}>
                    <Card
                        className='dashboard-card-chart'
                        title={
                            <Space>
                                <img src={icReport} alt='' />

                                <Typography.Text>Thống kê bằng biểu đồ</Typography.Text>
                            </Space>
                        }
                    >
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options(user.data, 'Số lượng người dùng mới', '#28c8d3')}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card
                        className='dashboard-card-chart'
                        title={
                            <Space>
                                <img src={iconProduct} alt='' />

                                <Typography.Text>Thống kê theo bảng</Typography.Text>
                            </Space>
                        }
                    >
                        <Table dataSource={dataSource} columns={columns} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ReportCustomer;
